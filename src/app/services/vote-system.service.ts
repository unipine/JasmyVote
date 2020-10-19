import EthereumServiceInstance, {EthereumService} from './ethereum.service';
import VoteSystem from '../ethereum/abis/VoteSystem.json';
import {VoteSystemServiceState} from '../models/vote-system-service.state';

export class VoteSystemService {
    state: VoteSystemServiceState = new VoteSystemServiceState();

    constructor(private ethereumService: EthereumService) {
    }

    public async setup(): Promise<void> {
        this.state.isInitialized = false;
        const network = VoteSystem.networks[this.ethereumService.state.networkId];
        if (this.ethereumService.state.isInitialized && network) {
            this.state.contractAbi = VoteSystem.abi;
            this.state.contractAddress = network.address;
            this.state.contract = new this.ethereumService.state.web3.eth.Contract(this.state.contractAbi, this.state.contractAddress);
            this.state.isOwner = await this.isOwnerOfContract();
            this.state.isIssuer = await this.isIssuer();
            this.state.isCandidate = await this.isCandidate();
            this.state.isInitialized = true;
        }
    }

    public async isOwnerOfContract(): Promise<boolean> {
        return this.state.contract.methods.isOwner().call();
    }

    public async isIssuer(): Promise<boolean> {
        return this.state.contract.methods.isIssuer(this.ethereumService.account).call();
    }

    public async isCandidate(): Promise<boolean> {
        return this.state.contract.methods.isCandidate(this.ethereumService.account).call();
    }

    public async addIssuer(issuerAddress: string): Promise<void> {
        return this.state.contract.methods.addIssuer(issuerAddress).send({from: this.ethereumService.account});
    }

    public async getIssuers(): Promise<string> {
        return this.state.contract.methods.getIssuers().call();
    }

    public async addCandidate(candidateAddress: string): Promise<void> {
        return this.state.contract.methods.addCandidate(candidateAddress).send({from: this.ethereumService.account});
    }

    public async getCandidates(): Promise<string> {
        return this.state.contract.methods.getCandidates().call();
    }

    public async issueVote(recipientAddress: string): Promise<void> {
        if (!this.state.isIssuer) {
            console.error('This account is not recognized as an Issuer');
            return;
        }
        return this.state.contract.methods.issueVote(recipientAddress).send({from: this.ethereumService.account});
    }

    public async vote(candidateAddress: string, voteId: string): Promise<void> {
        if (this.state.isCandidate) {
            console.error('This account is unable to vote as a candidate!');
            return;
        }
        return this.state.contract.methods.transferFrom(this.ethereumService.account, candidateAddress, voteId).send({from: this.ethereumService.account});
    }
}

const VoteSystemServiceInstance = new VoteSystemService(EthereumServiceInstance);
export default VoteSystemServiceInstance;

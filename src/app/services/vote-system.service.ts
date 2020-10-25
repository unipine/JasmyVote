import EthereumServiceInstance, {EthereumService} from './ethereum.service';
import VoteSystem from '../ethereum/abis/VoteSystem.json';
import {VoteSystemServiceState} from '../models/vote-system-service.state';
import {VoteModel} from '../models/vote.model';

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
            const isOwner = await this.isOwnerOfContract();
            const isIssuer = await this.isIssuer();
            const isCandidate = await this.isCandidate();
            this.state.identity = {isOwner, isIssuer, isCandidate, address: this.ethereumService.account};
            this.state.isInitialized = true;
        }
    }

    public get account(): string {
        return this.ethereumService.account;
    }

    public async isOwnerOfContract(): Promise<boolean> {
        return this.state.contract.methods.isOwner().call({from: this.account});
    }

    public async isIssuer(): Promise<boolean> {
        return this.state.contract.methods.isIssuer(this.ethereumService.account).call({from: this.account});
    }

    public async isCandidate(): Promise<boolean> {
        return this.state.contract.methods.isCandidate(this.ethereumService.account).call({from: this.account});
    }

    public async addIssuer(issuerAddress: string): Promise<void> {
        return this.state.contract.methods.addIssuer(issuerAddress).send({from: this.account});
    }

    public async getIssuers(): Promise<string[]> {
        return this.state.contract.methods.getIssuers().call({from: this.account});
    }

    public async getVoteCount(targetAddress: string): Promise<number> {
        return this.state.contract.methods.ownerVotes(targetAddress).call({from: this.account});
    }

    public async addCandidate(candidateAddress: string): Promise<void> {
        return this.state.contract.methods.addCandidate(candidateAddress).send({from: this.account});
    }

    public async getCandidates(): Promise<string[]> {
        return this.state.contract.methods.getCandidates().call({from: this.account});
    }

    public async getMyVotes(): Promise<VoteModel[]> {
        return this.state.contract.methods.getVotesByOwner().call({from: this.account});
    }

    public async issueVote(recipientAddress: string): Promise<void> {
        if (!this.state.identity.isIssuer) {
            console.error('This account is not recognized as an Issuer');
            return;
        }
        return this.state.contract.methods.issueVote(recipientAddress).send({from: this.account});
    }

    public async vote(candidateAddress: string, voteId: string): Promise<void> {
        if (this.state.identity.isCandidate) {
            console.error('This account is unable to vote as a candidate!');
            return;
        }
        return this.state.contract.methods.transferFrom(this.account, candidateAddress, voteId).send({from: this.account});
    }
}

const VoteSystemServiceInstance = new VoteSystemService(EthereumServiceInstance);
export default VoteSystemServiceInstance;

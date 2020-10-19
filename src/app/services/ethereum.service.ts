import Web3 from 'web3';
import {EthereumServiceState} from '../models/ethereum-service.state';

export class EthereumService {
    state: EthereumServiceState = new EthereumServiceState();

    public async setupData(): Promise<void> {
        this.state.isInitialized = false;

        await this.loadWeb3();
        this.state.networkId = await this.state.web3.eth.net.getId();

        this.state.accounts = await this.state.web3.eth.getAccounts();
        if (!this.state.accounts || this.state.accounts.length === 0) {
            console.error('No accounts are available');
            return;
        } else {
            this.switchAccount(0);
        }
        this.state.isInitialized = true;
    }

    private async loadWeb3(): Promise<void> {
        const appWindow: any = window;
        if (appWindow.ethereum) {
            appWindow.web3 = new Web3(appWindow.ethereum);
            try {
                await appWindow.ethereum.enable();
            } catch (error) {
                console.error('Access denied to Metamask!');
                return;
            }
        } else {
            if (appWindow.web3) {
                appWindow.web3 = new Web3(appWindow.web3.currentProvider);
            } else {
                console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
                return;
            }
        }
        this.state.web3 = appWindow.web3;
    }

    public get account(): string {
        return this.state.mainAccount;
    }

    public switchAccount(index: number): void {
        if (index >= this.state.accounts.length) {
            console.error('The selected account is unavailable');
            return;
        }
        this.state.mainAccount = this.state.accounts[index];
    }
}

const EthereumServiceInstance = new EthereumService();
export default EthereumServiceInstance;

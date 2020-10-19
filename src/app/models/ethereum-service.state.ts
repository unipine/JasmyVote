import Web3 from 'web3';

export class EthereumServiceState {
    web3: Web3;
    isInitialized: boolean;
    accounts: string[];
    mainAccount: string;
    networkId: number;
}

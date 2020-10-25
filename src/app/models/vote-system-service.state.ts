import {MyIdentityModel} from './my-identity.model';

export class VoteSystemServiceState {
    isInitialized: boolean;
    identity: MyIdentityModel;
    contractAbi: any;
    contractAddress: string;
    contract: any;
}

import {IssuerModel} from '../models/issuer.model';
import VoteSystemServiceInstance from '../services/vote-system.service';

export class IssuerPageHelper {
    static async getModelIssuers(): Promise<IssuerModel[]> {
        const issuerAddresses: string[] = await VoteSystemServiceInstance.getIssuers();
        return Promise.all(issuerAddresses.map(async (issuerAddress) => {
            const voteCount = await VoteSystemServiceInstance.getVoteCount(issuerAddress);
            return {address: issuerAddress, votesNotIssued: voteCount} as IssuerModel
        }));
    }
}

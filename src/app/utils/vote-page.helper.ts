import VoteSystemServiceInstance from '../services/vote-system.service';
import {CandidateModel} from '../models/candidate.model';
import {VoteModel} from '../models/vote.model';

export class VotePageHelper {
    static async getMyVotes(): Promise<VoteModel[]> {
        return VoteSystemServiceInstance.getMyVotes();
    }

    static async getCandidates(): Promise<CandidateModel[]> {
        const candidatesAddreses: string[] = await VoteSystemServiceInstance.getCandidates();
        return Promise.all(candidatesAddreses.map(async (candidateAddress) => {
            const voteCount = await VoteSystemServiceInstance.getVoteCount(candidateAddress);
            return {candidateAddress: candidateAddress, voteCount: voteCount} as CandidateModel
        }));
    }
}

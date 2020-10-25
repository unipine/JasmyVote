import React from 'react';
import {Grid} from '@material-ui/core';
import CandidateListItem from './candidate-list-item.component';
import {CandidateModel} from '../../models/candidate.model';

export interface CandidateListConfig {
    candidates: CandidateModel[];
    canVote: boolean;
    onVote: (address: string) => void;
}

const CandidateList = ({candidates, canVote, onVote}: CandidateListConfig) => {
    return <Grid container spacing={3}>
        {candidates.map(candidate =>
            <Grid item key={candidate.candidateAddress} xs={3}>
                <CandidateListItem candidate={candidate} canVote={canVote}
                                   onVote={onVote}/>
            </Grid>)}
    </Grid>
};
export default CandidateList;

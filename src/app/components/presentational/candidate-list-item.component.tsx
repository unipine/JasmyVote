import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from '@material-ui/core';
import {CandidateModel} from '../../models/candidate.model';

export interface CandidateListItemConfig {
    candidate: CandidateModel;
    canVote: boolean;
    onVote?: (address: string) => void;
}

const CandidateListItem = ({candidate, canVote, onVote}: CandidateListItemConfig) => {
    return <Card>
        <CardContent>
            <Typography color="textPrimary" gutterBottom>
                {candidate.candidateAddress}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                Vote Count: {candidate.voteCount}
            </Typography>
        </CardContent>
        <CardActions>
            <Button variant="contained" size="small" color="primary" disabled={!canVote}
                    onClick={() => onVote(candidate.candidateAddress)}>Vote</Button>
        </CardActions>
    </Card>
};
export default CandidateListItem;

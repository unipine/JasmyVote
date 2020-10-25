import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import {VotePageHelper} from '../../utils/vote-page.helper';
import {makeStyles} from '@material-ui/core/styles';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import CandidateList from '../presentational/candidate-list.component';
import {CandidateModel} from '../../models/candidate.model';
import VoteSystemServiceInstance from '../../services/vote-system.service';
import {VoteModel} from '../../models/vote.model';
import {MyIdentityModel} from '../../models/my-identity.model';

const useStyles = makeStyles({
    voteContainer: {
        textAlign: 'center'
    },
});

export default function VotingPageComponent() {
    const [votes, setVotes] = useState<VoteModel[]>([]);
    const [candidates, setCandidates] = useState<CandidateModel[]>([]);
    const [identity, setIdentity] = useState<MyIdentityModel>(null);
    const classes = useStyles();

    const vote = (candidateAddress: string) => {
        if (!votes || votes.length === 0) {
            return;
        }
        VoteSystemServiceInstance.vote(candidateAddress, votes[0].index.toString()).catch(console.log);
    };

    useEffect(() => {
        VotePageHelper.getMyVotes().then(votes => setVotes(votes));
        VotePageHelper.getCandidates().then(candidates => setCandidates(candidates));
        setIdentity(VoteSystemServiceInstance.state.identity);
    }, []);

    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <Paper className={classes.voteContainer}>
                <Typography variant="h5">Available Votes</Typography>
                <Typography variant="h5">{votes.length} <HowToVoteIcon/></Typography>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <CandidateList canVote={votes.length > 0 && !identity?.isCandidate} candidates={candidates} onVote={vote}/>
        </Grid>
    </Grid>;
}

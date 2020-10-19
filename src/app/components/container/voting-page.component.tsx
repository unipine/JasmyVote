import React, {useEffect} from 'react';
import {Paper} from '@material-ui/core';
import VoteSystemServiceInstance from '../../services/vote-system.service';

export default function VotingPageComponent() {
    useEffect(() => {
        VoteSystemServiceInstance.setup().then(() => {
        });
    }, []);

    return <Paper elevation={3}>
        Hello World
    </Paper>;
}

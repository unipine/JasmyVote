import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, InputAdornment, TextField} from '@material-ui/core';
import IssuersListComponent from '../presentational/issuers-list.component';
import {IssuerPageHelper} from '../../utils/issuer-page.helper';
import {makeStyles} from '@material-ui/core/styles';
import {AccountCircle} from '@material-ui/icons';
import VoteSystemServiceInstance from '../../services/vote-system.service';
import {MyIdentityModel} from '../../models/my-identity.model';
import {IssuerModel} from '../../models/issuer.model';

const useStyles = makeStyles({
    form: {
        marginTop: 24
    },
    formButton: {
        marginRight: 24,
        float: 'right'
    },
    formInput: {
        marginRight: 24,
        float: 'right'
    }
});

export default function IssuersPageComponent() {
    const [issuers, setIssuers] = useState<IssuerModel[]>([]);
    const [identity, setIdentity] = useState<MyIdentityModel>(null);
    const [targetAddress, setTargetAddress] = useState('');
    const classes = useStyles();

    const addIssuer = () => {
        VoteSystemServiceInstance.addIssuer(targetAddress).catch(error => console.error(error));
    };

    const addCandidate = () => {
        VoteSystemServiceInstance.addCandidate(targetAddress).catch(error => console.error(error));
    };

    const issueVote = () => {
        VoteSystemServiceInstance.issueVote(targetAddress).catch(error => console.error(error));
    };


    useEffect(() => {
        IssuerPageHelper.getModelIssuers().then(result => setIssuers(result));
        setIdentity(VoteSystemServiceInstance.state.identity);
    }, []);

    return <Grid container spacing={2}>
        <Grid item xs={12} className={classes.form}>
            {
                identity?.isOwner &&
                <Box>
                    <Button variant="contained" color="primary" className={classes.formButton}
                            onClick={() => addIssuer()}>
                        Add Issuer
                    </Button>
                    <Button variant="contained" color="primary" className={classes.formButton}
                            onClick={() => addCandidate()}>
                        Add Candidate
                    </Button>
                </Box>
            }
            {
                identity?.isIssuer &&
                <Button variant="contained" color="primary" className={classes.formButton}
                        onClick={() => issueVote()}>
                    Issue Vote
                </Button>
            }
            <TextField required value={targetAddress} label="Target Address"
                       className={classes.formInput}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <AccountCircle/>
                               </InputAdornment>
                           ),
                       }}
                       onChange={(e) => setTargetAddress(e.target.value)}/>
        </Grid>
        <Grid item xs={12}>
            <IssuersListComponent issuers={issuers}/>
        </Grid>
    </Grid>;
}

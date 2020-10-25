import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import {MyIdentityModel} from '../../models/my-identity.model';

export interface NavigationBarComponentConfig {
    identity: MyIdentityModel;
}

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    pageTitle: {
        marginRight: theme.spacing(2),
        flexGrow: 1
    },
    link: {
        marginRight: theme.spacing(2)
    },
    linkText: {
        color: 'white',
        textDecoration: 'none',
        '&:hover, &:focus': {
            color: '#2540d9'
        }
    },
}));
const NavigationBarComponent = ({identity}: NavigationBarComponentConfig) => {
    const classes = useStyles();
    return <nav>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <HowToVoteIcon/>
                </IconButton>
                <Typography variant="h5" className={classes.pageTitle}>Decentralized Voting System
                </Typography>
                <Typography variant="h6" className={classes.link}>
                    <RouterLink to="/vote" className={classes.linkText}>Vote</RouterLink>
                </Typography>
                {(identity?.isOwner || identity?.isIssuer) && <Typography variant="h6" className={classes.link}>
                    <RouterLink to="/issuers" className={classes.linkText}>Issuers</RouterLink>
                </Typography>}
            </Toolbar>
        </AppBar>
    </nav>;
};
export default NavigationBarComponent;

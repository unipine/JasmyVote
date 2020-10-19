import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        marginRight: theme.spacing(2)
    },
    titleText: {
        color: 'white',
        '&:hover, &:focus': {
            color: '#2540d9'
        }
    },
}));
const NavigationBarComponent = () => {
    const classes = useStyles();
    return <nav>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h5" className={classes.title}>
                    <RouterLink to="/" className={classes.titleText}>Home</RouterLink>
                </Typography>
                <Typography variant="h5" className={classes.title}>
                    <RouterLink to="/vote" className={classes.titleText}>Vote</RouterLink>
                </Typography>
            </Toolbar>
        </AppBar>
    </nav>;
};
export default NavigationBarComponent;

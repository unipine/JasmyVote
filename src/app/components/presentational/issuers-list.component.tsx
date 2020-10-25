import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import IssuersListItemComponent from './issuers-list-item.component';
import {makeStyles} from '@material-ui/core/styles';
import {IssuerModel} from '../../models/issuer.model';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export interface IssuersListConfig {
    issuers: IssuerModel[]
}

const IssuersListComponent = ({issuers}: IssuersListConfig) => {
    const classes = useStyles();
    return <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Issuers Addresses</TableCell>
                    <TableCell>Votes not issued</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {issuers.map(i => <IssuersListItemComponent key={i.address} issuer={i}/>)}
            </TableBody>
        </Table>
    </TableContainer>
};
export default IssuersListComponent;

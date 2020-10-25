import React from 'react';
import {TableCell, TableRow} from '@material-ui/core';
import {IssuerModel} from '../../models/issuer.model';

export interface IssuersListItemConfig {
    issuer: IssuerModel
}

const IssuersListItemComponent = ({issuer}: IssuersListItemConfig) => (
    <TableRow>
        <TableCell component="th" scope="row">
            {issuer.address}
        </TableCell>
        <TableCell component="th" scope="row">
            {issuer.votesNotIssued}
        </TableCell>
    </TableRow>
);
export default IssuersListItemComponent;

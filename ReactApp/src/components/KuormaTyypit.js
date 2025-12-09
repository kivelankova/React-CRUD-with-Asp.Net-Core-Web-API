import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/KuormaTyyppi";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const KuormaTyypit = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    // const [x, setX] = useState(0);
    // setX(5);

    useEffect(() => {
        props.fetchAllKuormaTyypit()
    }, []) //componentDidMount


    //toast msg.
    // const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteKuormatyyppi(id)
    }


    return (
        <Paper className={classes.paper} elevation={3} >
            <Grid container>

                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Tyyppi</TableCell>
                                    <TableCell>Kuvaus</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.KuormaTyyppiList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.id}</TableCell>
                                            <TableCell>{record.tyyppi}</TableCell>
                                            <TableCell>{record.kuvaus}</TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
        ;
}

const mapStateToProps = state => ({
    KuormaTyyppiList: state.KuormaTyyppi.list2
});

const mapActionToProps = {
    fetchAllKuormaTyypit: actions.fetchAll2

}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(KuormaTyypit)); 
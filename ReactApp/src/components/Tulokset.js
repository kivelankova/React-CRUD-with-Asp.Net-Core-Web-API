import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/Tulos";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import TulosForm from "./TulosForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";



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

const Tulokset = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    // const [x, setX] = useState(0);
    // setX(5);

    useEffect(() => {
        props.fetchAllTulokset()
    }, []) //componentDidMount


    //toast msg.
    // const { addToast } = useToasts()
    const onEdit = (id) => {
        setCurrentId(id);
        console.log("id: ", id);
    }

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            props.deleteTulos(id)
            console.log("id: ", id);
        }

    }


    return (
        <Paper className={classes.paper} elevation={3} >
            <Grid container>
                <Grid item xs={2}>
                    <TulosForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={10}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Nimi</TableCell>
                                    <TableCell>L</TableCell>
                                    <TableCell>A</TableCell>
                                    <TableCell>B</TableCell>
                                    <TableCell>KuormaTV</TableCell>
                                    <TableCell>KuormaPK</TableCell>
                                    <TableCell>KuormaPM</TableCell>
                                    <TableCell>KuormaTyyppi</TableCell>
                                    <TableCell>Max M</TableCell>
                                    <TableCell>Max V</TableCell>
                                    <TableCell>dateOfJoining</TableCell>
                                    <TableCell>photoFileName</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.TulosList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.nimi}</TableCell>
                                            <TableCell>{record.pituusL}</TableCell>
                                            <TableCell>{record.pituusA}</TableCell>
                                            <TableCell>{record.pituusB}</TableCell>
                                            <TableCell>{record.kuormaTV}</TableCell>
                                            <TableCell>{record.kuormaPK}</TableCell>
                                            <TableCell>{record.kuormaPM}</TableCell>
                                            <TableCell>{record.forceType}</TableCell>
                                            <TableCell>{record.maxM}</TableCell>
                                            <TableCell>{record.maxV}</TableCell>
                                            <TableCell>{record.dateOfJoining}</TableCell>
                                            <TableCell>{record.photoFileName}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => onEdit(record.id)} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>


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
    TulosList: state.Tulos.list
});

const mapActionToProps = {
    fetchAllTulokset: actions.fetchAll,
    deleteTulos: actions.Delete
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Tulokset)); 
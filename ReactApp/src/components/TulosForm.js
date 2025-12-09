import React, { useState, useEffect } from 'react';
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button } from "@material-ui/core";
// import InputAdornment from '@mui/material/InputAdornment';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker
// } from '@material-ui/pickers';
// import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import { alpha } from '@material-ui/core/styles'
// import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Tulos";
import Moment from './Moment';
import ShearForce from './ShearForce';


const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})


const initialFieldValues = {
    nimi: '',
    pituusL: '0',
    pituusA: '0',
    pituusB: '0',
    kuormaTV: '0',
    kuormaPK: '0',
    kuormaPM: '0',
    barType: '',
    maxM: '',
    maxV: '',
    dateOfJoining: new Date(),
    photoFileName: ''
}

const TulosForm = ({ classes, ...props }) => {

    const [arvot, setArvot] = useState();
    const [maxMomentChange_backend, setMaxMomentChange_backend] = useState("");
    const [maxShearChange_backend, setMaxShearChange_backend] = useState("");
    const [hide, setHide] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [value, setValue] = useState(null);
    //toast msg.
    // const { addToast } = useToasts()
    /*
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
        console.log("values: ", values);
    }
    */
    //validate()
    //validate({fullName:'jenny'})
    // Syötettävien arvojen validointi
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nimi' in fieldValues)
            temp.nimi = fieldValues.nimi ? "" : "This field is required."
        if ('pituusL' in fieldValues)
            temp.pituusL = fieldValues.pituusL ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        console.log(values);
        // setValues({ ...values, maxM: maxMomentChange_backend });

        if (validate()) {
            const onSuccess = () => {
                resetForm()
                // addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createTulos(values, onSuccess)
            else
                props.updateTulos(props.currentId, values, onSuccess)
        }

    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.TulosList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    // Lisätään tähän muuttujat, joita tarvitaan maxM ja maxV laskentaan
    const calculateParameterForm = () => {
        setArvot({
            ...values
        })
        console.log("values: ", values);
        console.log("values.pituusL: ", values.pituusL);
    }
    /*
    // Fetch Tulokset
    useEffect(() => {
        setArvot({
            ...values
        })
        console.log("values: ", values);
        console.log("values.pituusL: ", values.pituusL);

    }, [values.forceType])
    */
    // haetaan maksimi momentin arvo Moment.js:stä
    const handleMaxMomentChange_backend = (newMoment) => {
        console.log("newMoment (handleMaxMomentChange):", JSON.stringify(newMoment));
        setMaxMomentChange_backend(JSON.stringify(newMoment));
        values.maxM = JSON.stringify(newMoment);
    }

    // haetaan maksimi momentin arvo Moment.js:stä
    const handleMaxShearChange_backend = (newShearForce) => {
        console.log("newShearForce (handleMaxShearChange):", JSON.stringify(newShearForce));
        setMaxShearChange_backend(JSON.stringify(newShearForce));
        values.maxV = JSON.stringify(newShearForce);
    }

    return (
        <div>
            <Moment
                arvot={arvot}
                maxMomentChange_backend={handleMaxMomentChange_backend}
                hide={hide}
            />
            <ShearForce
                arvot={arvot}
                maxShearChange_backend={handleMaxShearChange_backend}
                hide={hide}
            />

            <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit} >
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            name="nimi"
                            variant="outlined"
                            label="Nimi"
                            value={values.nimi}
                            onChange={handleInputChange}
                            {...(errors.nimi && { error: true, helperText: errors.nimi })}
                        />
                        <TextField
                            name="pituusL"
                            variant="outlined"
                            label="PituusL"
                            value={values.pituusL}
                            onChange={handleInputChange}
                            {...(errors.pituusL && { error: true, helperText: errors.pituusL })}
                        />
                        <TextField
                            name="pituusA"
                            variant="outlined"
                            label="pituusA"
                            value={values.pituusA}
                            onChange={handleInputChange}
                            {...(errors.pituusA && { error: true, helperText: errors.pituusA })}
                        />
                        <TextField
                            name="pituusB"
                            variant="outlined"
                            label="pituusB"
                            value={values.pituusB}
                            onChange={handleInputChange}
                            {...(errors.pituusB && { error: true, helperText: errors.pituusB })}
                        />
                        <TextField
                            name="kuormaTV"
                            variant="outlined"
                            label="kuormaTV"
                            value={values.kuormaTV}
                            onChange={handleInputChange}
                            {...(errors.kuormaTV && { error: true, helperText: errors.kuormaTV })}
                        />
                        <TextField
                            name="kuormaPK"
                            variant="outlined"
                            label="kuormaPK"
                            value={values.kuormaPK}
                            onChange={handleInputChange}
                            {...(errors.kuormaPK && { error: true, helperText: errors.kuormaPK })}
                        />
                        <TextField
                            name="kuormaPM"
                            variant="outlined"
                            label="kuormaPM"
                            value={values.kuormaPM}
                            onChange={handleInputChange}
                            {...(errors.kuormaPM && { error: true, helperText: errors.kuormaPM })}
                        />

                        <FormControl variant="outlined"
                            className={classes.formControl}
                            {...(errors.forceType && { error: true })}
                        >
                            <InputLabel >ForceType</InputLabel>
                            <Select
                                name="forceType"
                                defaultValue=""
                                value={values.forceType ?? ""}
                                onChange={handleInputChange}
                            >

                                {props.KuormaTyyppiList.map((record, index) => {
                                    return (
                                        <MenuItem key={index} value={record.tyyppi}>
                                            {record.tyyppi}
                                        </MenuItem>)
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            name="maxM"
                            variant="outlined"
                            label="maxM"
                            variant="filled"
                            inputProps={
                                { readOnly: true, }
                            }
                            value={values.maxM}
                            onChange={handleInputChange}
                            {...(errors.maxM && { error: true, helperText: errors.maxM })}
                        />
                        <TextField
                            name="maxV"
                            variant="outlined"
                            label="maxV"
                            variant="filled"
                            inputProps={
                                { readOnly: true, }
                            }
                            value={values.maxV}
                            onChange={handleInputChange}
                            {...(errors.maxV && { error: true, helperText: errors.maxV })}
                        />
                        {/*
                        <TextField
                            name="dateOfJoining"
                            variant="outlined"
                            label="dateOfJoining"
                            value={values.dateOfJoining}
                            onChange={handleInputChange}
                            {...(errors.dateOfJoining && { error: true, helperText: errors.dateOfJoining })}
                        />
                        */}

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Basic example"
                                inputFormat="dd.MM.yyyy"
                                value={values.dateOfJoining}
                                onChange={(newValue) => {
                                    setValues({ ...values, dateOfJoining: newValue });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>


                        {/*
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            <KeyboardDatePicker
                                label="Material Date Picker"
                                value={selectedDate}
                                onChange={handleInputChange}
                            />

                        </MuiPickersUtilsProvider>

                        */}



                        <TextField
                            name="photoFileName"
                            variant="outlined"
                            label="photoFileName"
                            value={values.photoFileName}
                            onChange={handleInputChange}
                            {...(errors.photoFileName && { error: true, helperText: errors.photoFileName })}
                        />
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.smMargin}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                className={classes.smMargin}
                                onClick={resetForm}
                            >
                                Reset
                            </Button>
                            <Button
                                variant="contained"
                                className={classes.smMargin}
                                onClick={calculateParameterForm}
                            >
                                Calculate maxM and maxV
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>

        </div>
    );
}

const mapStateToProps = state => ({
    TulosList: state.Tulos.list,
    KuormaTyyppiList: state.KuormaTyyppi.list2
})

const mapActionToProps = {
    createTulos: actions.create,
    updateTulos: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TulosForm));

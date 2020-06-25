import React from 'react';
import { connect } from 'react-redux';
import { Container, Select, MenuItem } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
    setDefaultSessionParamsTime,
    setDefaultSessionParamsRestRelat,
    setDefaultSessionParamsRestValue,
} from '../../../actions/admin';
import TextField from "@material-ui/core/TextField";

const mapDispatchToProps = dispatch => ({
    setDefaultSessionParamsTime:
        defaultSessionTime => dispatch(setDefaultSessionParamsTime(defaultSessionTime)),
    setDefaultSessionParamsRestRelat:
        defaultSessionRestRelat => dispatch(setDefaultSessionParamsRestRelat(defaultSessionRestRelat)),
    setDefaultSessionParamsRestValue:
        defaultSessionRestValue => dispatch(setDefaultSessionParamsRestValue(defaultSessionRestValue)),
});

const mapStateToProps = state => ({
    defaultSessionTime: state.forms.generalConfig.sessionTimeDefaultType,
});

const manualAlertFields = [];

const ManualAlertField = () => {
    const hour = [];
    const minute = [];
    for (let i = 0; i < 24; i += 1) hour.push(i);
    for (let j = 0; j < 60; j += 1) minute.push(j);

    return (
        <>
            Send alert
            <Select
                label="Hour"
                onChange={e => setDefaultSessionParamsTime({
                    type: 'hour',
                    value: e.target.value,
                })}
            >
                {hour.map(hourTime => (<MenuItem value={hourTime}>{hourTime}</MenuItem>))}
            </Select>
            &nbsp; : &nbsp;
            <Select
                label="Minute"
                onChange={e => setDefaultSessionParamsTime({
                    type: 'minute',
                    value: e.target.value,
                })}
            >
                {minute.map(hourTime => (<MenuItem value={hourTime}>{hourTime}</MenuItem>))}
            </Select>
            <Select
                onChange={e => setDefaultSessionParamsTime({
                    type: 'hour',
                    value: e.target.value,
                })}
            >
                <MenuItem>Before</MenuItem>
                <MenuItem>After</MenuItem>
            </Select>
            <Select
                onChange={e => setDefaultSessionParamsTime({
                    type: 'hour',
                    value: e.target.value,
                })}
            >
                <MenuItem>Guest Check-in</MenuItem>
                <MenuItem>Guest Check-out</MenuItem>
                <MenuItem>Shuttle time</MenuItem>
            </Select>
            <TextField
                multiline
                fullWidth
                name="alertMessage"
                label="Message"
            />
        </>
    );
};

export const AlertMessagesFunc = () => {
    const [alertFields, addAlertField] = React.useState([]);
    const hour = [];
    const minute = [];
    for (let i = 0; i < 24; i += 1) hour.push(i);
    for (let j = 0; j < 60; j += 1) minute.push(j);
    React.useEffect(() => {
        addAlertField([...alertFields, ManualAlertField]);
    }, []);

    return (
        <Container component="main" maxWidth="xl">
            Alert Messages:
            {alertFields.map(Field => (
                <>
                    <Field />
                    <Fab color="primary" aria-label="add" onClick={() => addAlertField([...alertFields, ManualAlertField])}>
                        <AddIcon />
                    </Fab>
                    <br />
                </>
            ))}
        </Container>
    );
};

export const AlertMessages = connect(mapStateToProps, mapDispatchToProps)(AlertMessagesFunc);

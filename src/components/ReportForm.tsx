import React from 'react';
import { Button, TextField, Paper, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setDate, setTime, setLocation } from '../redux/actions';

const ReportForm: React.FC = () => {
    const dispatch = useDispatch();

    const date = useSelector((state: any) => state.form.date);
    const time = useSelector((state: any) => state.form.time);
    const location = useSelector((state: any) => state.form.location);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDate(e.target.value));
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTime(e.target.value));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [latitude, longitude] = e.target.value.split(',').map(coord => parseFloat(coord.trim()));

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Date:", date);
        console.log("Time:", time);
        console.log("Location:", location);
    };

    return (
        <Paper elevation={3} style={{ padding: '16px' }} className="report-form">
            <Typography variant="h6" gutterBottom>Report a Car Break-In</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={3} sm={3}>
                        <TextField
                            label="Date"
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                            style = {{ width: '100%'}}
                            InputProps={{
                                style: { 
                                    padding: '0px 10px',
                                    fontSize: '0.8rem'
                                }  
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <TextField
                            label="Time"
                            type="time"
                            value={time}
                            onChange={handleTimeChange}
                            //fullWidth
                            InputProps={{
                                style: {
                                    padding: '0px 10px',
                                    fontSize: '0.8rem'
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <TextField
                            label="Location"
                            value={location}
                            onChange={handleLocationChange}
                            //fullWidth
                            InputProps={{
                                style: {
                                    padding: '0px 10px',
                                    width: '200px',
                                    fontSize: '0.8rem'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <Button variant="contained" color="primary" type="submit">
                            Report
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>

    );
}

export default ReportForm;

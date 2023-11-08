import React from 'react';
import { Button, TextField, Paper, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setDate, setTime, setLocation } from '../redux/actions';
import { ClassNames } from '@emotion/react';
import axios from 'axios'

const ReportForm: React.FC = () => {
    const dispatch = useDispatch();

    // Access state using useSelector
    const date = useSelector((state: any) => state.form.date);
    const time = useSelector((state: any) => state.form.time);
    const location = useSelector((state: any) => state.form.location);

    // Utility Functions to Dispatch Actions
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDate(e.target.value));
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTime(e.target.value));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [latitude, longitude] = e.target.value.split(',').map(coord => parseFloat(coord.trim()));

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Date:", typeof date);
        console.log("Time:", typeof time);
        console.log("Location:", typeof location);

        console.log("Date:", date);
        console.log("Time:", time);
        console.log("Location:", location);

        const reportData = {
            date: date,
            time: time,
            location: location,
        };
        
        try {
            const response = await axios.post('http://localhost:5038/todoappcollection', reportData);
            console.log(response.data);

            // Set state back to null

            dispatch(setDate(""));
            dispatch(setTime(""));
            dispatch(setLocation("Select Location"));

        } catch (error) {

        }

    };


    // Render Report Form
    return (
        //<Paper elevation={3} style={{ padding: '16px', borderRadius: '30px' }} className="report-form">
        <Paper elevation={3} className="report-form" style={{ borderRadius: '20px'}}>    
            {/* <Typography variant="h6" gutterBottom>Report a Car Break-In</Typography> */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} alignItems='center' justifyContent='center' >
                    <Grid item xs={12} sm={12} md={3} >
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
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <TextField
                            label="Time"
                            type="time"
                            value={time}
                            onChange={handleTimeChange}
                            fullWidth
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
                    <Grid item xs={12} sm={12} md={5}>
                        <TextField
                            label="Location"
                            value={location}
                            onChange={handleLocationChange}
                            fullWidth
                            InputProps={{
                                style: {
                                    padding: '0px 10px',
                                    //width: '200px',
                                    fontSize: '0.8rem'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} >
                        <Button variant="contained" color="primary" type="submit" 
                        >
                            Report
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>

    );
}

export default ReportForm;

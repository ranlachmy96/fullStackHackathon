import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Form = () => {
    const [formData, setFormData] = useState({
        location: '',
        temperature: '',
        humidity: '',
        date: '',
        time: '',
        status: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        console.log('Form submitted')
        e.preventDefault();
        const jsonFormData = JSON.stringify(formData);
        console.log(jsonFormData);
        // Add your form submission logic here
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '60%', display: 'flex', flexDirection: 'column'},
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField id="outlined-basic" label="Location" variant="outlined" onChange={handleChange} type='text' name='location' sx={{width:'100%'}}/>
            <Divider />
            <TextField id="outlined-basic" label="temperature" variant="outlined" onChange={handleChange} type='number' name='temperature' sx={{width:'100%'}}/>
            <Divider />
            <TextField id="outlined-basic" label="humidity" variant="outlined" onChange={handleChange} type='number' name='humidity' sx={{width:'100%'}}/>
            <Divider />
            <TextField id="outlined-basic"  variant="outlined" onChange={handleChange} type='date' name='date'/>
            <Divider />
            <TextField id="outlined-basic"  variant="outlined" onChange={handleChange} type='time' name='time' />
            <Divider />
            <RadioGroup aria-label="status" name="status" value={formData.status} onChange={handleChange}>
                <FormControlLabel value="sunny" control={<Radio />} label="Sunny" sx={{ marginLeft: '2px' }}/>
                <FormControlLabel value="rainy" control={<Radio />} label="Rainy" sx={{ marginLeft: '2px' }}/>
                <FormControlLabel value="cloudy" control={<Radio />} label="Cloudy" sx={{ marginLeft: '2px' }} />
            </RadioGroup>
            <br />
            <Button variant="contained" type='submit' sx={{marginLeft: '8px'}}>Submit</Button>
        </Box>
    );
};

export default Form;
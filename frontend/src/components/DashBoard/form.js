import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
            <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handleChange} type='name' name='name' sx={{width:'100%'}}/>
            <Divider />
            <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handleChange} type='email' name='email' sx={{width:'100%'}}/>

            <br />
            <Button variant="contained" type='submit' sx={{marginLeft: '8px'}}>Submit</Button>
        </Box>
    );
};

export default Form;
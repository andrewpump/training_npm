
import * as React from 'react';
import { useState } from 'react';
import { Card, Container, Stack, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

// create a react component called BasicToy that has a square and field image
function BasicToy() {


    return (
        <Stack flex sx={{width:"100%", height:"100%",  display: 'flex', alignContent: "center", justifyContent:"center"}}>
            <Box sx={{ flexGrow: 11, width:"100%", border: "2px solid grey", margin:"auto", borderRadius:"10px" }}>
                <Typography>testing</Typography>
            </Box>
        </Stack>
    );
}
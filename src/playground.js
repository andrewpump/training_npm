import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Card, Container, Stack, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function Playground({selectedToy, setSelectedToy, toys}) {

    const [age, setAge] = useState(null);

    return (
        <Stack flex sx={{width:"100%", height:"100%",  display: 'flex', alignContent: "center", justifyContent:"center"}}>
            <FormControl sx={{ flexGrow:1, width: "30%", margin:"auto" }}>
                <InputLabel id="demo-simple-select-label">Toy</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedToy}
                    label="Toy"
                    onChange={(v) => {setSelectedToy(v.target.value)}}
                >
                    {toys.map((toy) => {
                        return <MenuItem value={toy}>{toy}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Box sx={{ flexGrow: 11, width:"100%", border: "2px solid grey", margin:"auto", borderRadius:"10px" }}>
                <Typography>testing</Typography>
            </Box>
        </Stack>
    );
}

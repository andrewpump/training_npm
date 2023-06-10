import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Card, Container, Stack, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function Park({selectedPlayground, setSelectedPlayground, playgrounds}) {

    return (
        <Stack flex sx={{width:"100%", height:"100%",  display: 'flex', alignContent: "center", justifyContent:"center"}}>
            <FormControl sx={{ flexGrow:1, width: "30%", margin:"auto" }}>
                <InputLabel id="demo-simple-select-label">Playground</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedPlayground}
                    label="Playground"
                    onChange={(v) => {console.log("Val", v.target.value); setSelectedPlayground(v.target.value)}}
                >
                    {playgrounds.map((pg) => {
                        return <MenuItem value={pg}>{pg.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Box sx={{ flexGrow: 11, width:"100%", border: "2px solid grey", margin:"auto", borderRadius:"10px" }}>
                {selectedPlayground.playground}
            </Box>
        </Stack>
    );
}

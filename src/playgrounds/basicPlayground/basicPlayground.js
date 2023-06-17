
import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';


function Item({ sx, children }) {
    return (
        <Box m={1} sx={{
            backgroundColor: "#E0E0E0",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...sx,
        }}>
            {children}
        </Box>
    )
}

function BoxText({ boxNum, height }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant='h3'>
                Box {boxNum}
            </Typography>
            <Typography variant='body1'>
                Height: {height}
            </Typography>
        </Box>
    )
}


// create a react component called BasicToy that has a square and field image
export function BasicPlayground() {

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 16.666%)",
            gridTemplateRows: "repeat(6, 16.666%)",
            height: "100%",
        }}>
            <Item sx={{ gridArea: "1 / 1 / 4 / 4", backgroundColor: "primary.light" }}>
                <BoxText boxNum={1} height={"50%"} />
            </Item>
            <Item sx={{ gridArea: "1 / 4 / 3 / 7" }}>

            </Item>
            <Item sx={{ gridArea: "3 / 4 / 7 / 7" }} ></Item>
            <Item sx={{ gridArea: "4 / 1 / 7 / 4", backgroundColor: "secondary.light" }} ><BoxText boxNum={2} height={"50%"} /></Item>
        </Box>
    )
}
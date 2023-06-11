
import * as React from 'react';
import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Invokable } from '@buildwithlayer/sdk';
import { Typography } from '@material-ui/core';


// create a react component called BasicToy that has a square and field image
export function BasicPlayground() {

    const name = "Basic"

    const [color, setColor] = useState("purple");
    const [boxTextColor, setBoxTextColor] = useState("white");

    const testFunc = () => {
        console.log("testFunc");
        setColor("red");
        setBoxTextColor("black");
        return "success";
    }

    const tools = [
        testFunc,
        new Invokable({
            name: 'changeBoxColor',
            description: `a function that takes in a color and changes the color of the box. Returns "success" if the color was changed successfully, and "failure" if the color was not changed successfully`,
            func: async (color) => {
                setColor(color);
                return "success";
            },
        }),
    ]

    const pg = (
        <Box sx={{ height: "100%", width: "100%" }}>
            <Grid sx={{ height: "100%", width: "100%" }} container spacing={0}>
                <Grid xs={8}>
                    <Box sx={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                        margin: "10px",
                        color: boxTextColor,
                        backgroundColor: color,
                    }}>
                        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
                            Magic Box
                        </Typography>
                    </Box>
                </Grid>
                <Grid xs={4}>
                    <button onClick={() => { setColor("red") }}>Reset</button>
                </Grid>
                <Grid xs={4}>
                </Grid>
                <Grid xs={8}>
                </Grid>
            </Grid>
        </Box>
    )


    return {
        name: name,
        playground: pg,
        tools: tools,
    }
}
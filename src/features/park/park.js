import * as React from 'react';
import { Stack, Select, MenuItem, InputLabel, FormControl, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedPlayground, selectPlaygroundName } from './parkSlice'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { BasicPlayground } from '../../playgrounds/basicPlayground/basicPlayground';

function ParkView({ playgrounds }) {

    const dispatch = useDispatch()
    const activePlayground = useSelector(selectPlaygroundName)

    return (
        <Box container sx={{
            flexGrow: 6,
            display: "grid",
            gridTemplateColumns: "repeat(5, 20%)",
            gridTemplateRows: "repeat(10, 10%)",
        }} spacing={1} p={3}>
            <Box sx={{ gridArea: "1 / 1 / 2 / 5" }} xs={9} pr={1}>
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">Playground</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={activePlayground}
                        label="Playground"
                        onChange={(v) => { dispatch(setSelectedPlayground(v.target.value)) }}
                        sx={{ color: "background.contrastText", accentColor: "background.contrastText", borderColor: "background.contrastText" }}
                    >
                        {playgrounds.map((name) => {
                            return <MenuItem value={name}>{name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Box xs={3} sx={{ gridArea: "1 / 5 / 2 / 6" }}>
                <Button variant="contained" sx={{ height: "55px" }}>
                    Reset Playground
                </Button>
            </Box>

            <Box xs={12} sx={{ height: "100%", gridArea: "2 / 1 / 11 / 6", backgroundColor: "background.light", borderRadius: "8px" }}>
                <BasicPlayground />
            </Box>
        </Box>

    )
}

export default function Park({ playgrounds }) {


    return (
        <Stack flex direction="row" spacing={2} pt={2} sx={{ height: "100%" }}>


            <ParkView playgrounds={playgrounds} />
            <Box sx={{ flexGrow: 6, display: "flex", border: "2px solid blue" }}>
            </Box>

        </Stack>
    );
}

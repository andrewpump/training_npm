import * as React from 'react';
import { Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedPlayground, selectPlaygroundName } from './parkSlice'

export default function Park({ playgrounds }) {

    const dispatch = useDispatch()
    const activePlayground = useSelector(selectPlaygroundName)

    return (
        <Stack flex sx={{ width: "100%", height: "100%", display: 'flex', alignContent: "center", justifyContent: "center" }}>
            <FormControl sx={{ flexGrow: 1, width: "30%", margin: "auto" }}>
                <InputLabel id="demo-simple-select-label">Playground</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={activePlayground}
                    label="Playground"
                    onChange={(v) => { dispatch(setSelectedPlayground(v.target.value)) }}
                >
                    {playgrounds.map((name) => {
                        return <MenuItem value={name}>{name}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Stack>
    );
}

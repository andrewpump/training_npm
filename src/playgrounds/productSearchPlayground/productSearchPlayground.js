// ts-check
import React from 'react';
import './assets/productSearchPlayground.css';
import { List, ListItem, ListItemText, Box, Typography, Grid, Button } from '@mui/material';
import ReactJson from 'react-json-view';
import { selectTheme } from '../../features/global/globalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { generateTopRecs, selectTopRecs } from './productSearchPlaygroundSlice';

const jsonViewerTheme = {
    base00: '#333333', // Set your base background color
    base01: '#383838',
    base02: '#49483E',
    base03: '#75715E',
    base04: '#A59F85',
    base05: '#F8F8F2',
    base06: '#F5F4F1',
    base07: '#F9F8F5',
    base08: '#F92672',
    base09: '#FD971F',
    base0A: '#F4BF75',
    base0B: '#A6E22E',
    base0C: '#A1EFE4',
    base0D: '#66D9EF',
    base0E: '#AE81FF',
    base0F: '#CC6633',
};

export function ProductSearchPlayground() {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const listItems = useSelector(selectTopRecs);

    // function that runs on
    return (
        <>
            <Box
                sx={{
                    bgcolor: 'background.default',
                    color: 'background.contrastText',
                    borderRadius: 1,
                }}
                m={2}
            >
                <Box p={2}>
                    <Grid container justifyContent='space-between' alignItems='center'>
                        <Typography variant='h4' component='div' sx={{ flexGrow: 1 }}>
                            Top Reccomendations
                        </Typography>
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={() => {
                                dispatch(generateTopRecs());
                            }}
                        >
                            Regenerate
                        </Button>
                    </Grid>
                    <List>
                        {listItems.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`${index + 1}. ${item.description}`} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
            <Box
                sx={{
                    bgcolor: 'background.default',
                    color: 'background.contrastText',
                    borderRadius: 1,
                }}
                m={2}
            >
                <Box p={2}>
                    <Typography variant='h4' component='div' sx={{ flexGrow: 1 }}>
                        Selected Item
                    </Typography>
                    <ReactJson
                        src={listItems.length !== 0 ? listItems[0].raw : {}}
                        theme={theme === 'light' ? 'light' : jsonViewerTheme}
                    />
                </Box>
            </Box>
        </>
    );
}

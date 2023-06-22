import * as React from "react";
import {
    Stack,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    Button,
    AccordionDetails,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPlayground, selectPlaygroundName } from "./parkSlice";
import { RESET_PLAYGROUND } from "../global/globalSlice";
import { BasicPlayground } from "../../playgrounds/basicPlayground/basicPlayground";
import { LayerSelect } from "../../components/LayerSelect";
import { LayerAccordianPrimary, LayerAccordianSummaryPrimary, LayerAccordianSecondary, LayerAccordianSummarySecondary } from "../../components/LayerAccordians";

function ParkView({ playgrounds }) {
    const dispatch = useDispatch();
    const activePlayground = useSelector(selectPlaygroundName);

    return (
        <Box
            container
            sx={{
                flexGrow: 6,
                display: "grid",
                gridTemplateColumns: "repeat(5, 20%)",
                gridTemplateRows: "repeat(10, 10%)",
                borderRadius: "16px",
                borderColor: "#7b65ff",
                borderWidth: "5px",
                borderStyle: "dashed",
            }}
            spacing={1}
            p={3}
        >
            <Box sx={{ gridArea: "1 / 1 / 2 / 5" }} xs={9} pr={1}>
                <FormControl sx={{ width: "100%" }}>
                    <InputLabel sx={{
                        backgroundColor: "background.default",
                        color: "background.contrastText",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                        borderRadius: "4px"
                    }} id="playground-select-label">Playground</InputLabel>
                    <LayerSelect
                        labelId="playground-select-label"
                        id="playground-select"
                        value={activePlayground}
                        label="Playground"
                        onChange={(v) => {
                            dispatch(setSelectedPlayground(v.target.value));
                        }}
                    >
                        {playgrounds.map((name) => {
                            return <MenuItem value={name}>{name}</MenuItem>;
                        })}
                    </LayerSelect>
                </FormControl>
            </Box>
            <Box xs={3} sx={{ gridArea: "1 / 5 / 2 / 6" }}>
                <Button
                    variant="contained"
                    sx={{ height: "55px" }}
                    onClick={() => dispatch({ type: RESET_PLAYGROUND })}
                >
                    Reset Playground
                </Button>
            </Box>

            <Box
                xs={12}
                sx={{
                    height: "100%",
                    gridArea: "2 / 1 / 11 / 6",
                    backgroundColor: "background.light",
                    borderRadius: "8px",
                }}
            >
                {activePlayground === "Box Layout" && <BasicPlayground />}
            </Box>
        </Box>
    );
}

function ToysBar() {
    return (
        <Box sx={{ height: "100%", width: "100%", border: "solid purple 2px", borderRadius: "8px" }}>
            <LayerAccordianPrimary>
                <LayerAccordianSummaryPrimary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Accordion 1</Typography>
                </LayerAccordianSummaryPrimary>
                <AccordionDetails>
                    <LayerAccordianSecondary>
                        <LayerAccordianSummarySecondary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Accordion 1</Typography>
                        </LayerAccordianSummarySecondary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </LayerAccordianSecondary>
                </AccordionDetails>
            </LayerAccordianPrimary>
        </Box>
    );
}

export default function Park({ playgrounds }) {
    return (
        <Stack
            flex
            direction="row"
            spacing={2}
            pt={2}
            sx={{ height: "100%", }}
            mb={2}
        >
            <ParkView playgrounds={playgrounds} sx={{ width: "65%" }} />
            <Box sx={{ flexGrow: 6, display: "flex", width: "35%" }}>
                <ToysBar />
            </Box>
        </Stack>
    );
}

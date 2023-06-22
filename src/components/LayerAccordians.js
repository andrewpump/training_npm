import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import { AccordionSummary } from "@mui/material";


export const LayerAccordianPrimary = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.light : theme.palette.background.light,
    boxShadow: "none",
    "& .MuiTypography-root": {
        paddingTop: "5px",
        fontWeight: "700",
        paddingBottom: "5px",
    },
}));

export const LayerAccordianSummaryPrimary = styled(AccordionSummary)(({ theme }) => ({
    "& .MuiAccordionSummary-root": {
        backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.light : theme.palette.background.light,
    }
}));

export const LayerAccordianSecondary = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? theme.palette.background.light : theme.palette.background.contrastText,
    boxShadow: "none",
    borderRadius: "8px",
    color: theme.palette.mode === "light" ? theme.palette.background.contrastText : theme.palette.background.default,
    "& .MuiTypography-root": {
        paddingTop: "5px",
        fontWeight: "700",
        paddingBottom: "5px",
    },
}));

export const LayerAccordianSummarySecondary = styled(AccordionSummary)(({ theme }) => ({
    "& .MuiAccordionSummary-root": {
        backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.light : theme.palette.background.light,
    },
    "& MuiBox-root": {
        display: "none",
    }
}));

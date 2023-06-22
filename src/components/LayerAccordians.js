import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import { AccordionSummary } from "@mui/material";


export const LayerAccordianPrimary = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.light : theme.palette.background.light,
    boxShadow: "none",
    "& .MuiTypography-root": {
        paddingTop: "10px",
        paddingBottom: "10px",
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
    borderRadius: "4px",
    border: "none",
    
    color: theme.palette.mode === "light" ? theme.palette.background.contrastText : theme.palette.background.default,
    "& .MuiTypography-root": {
        paddingTop: "10px",
        paddingBottom: "10px",
    },
    '&:before': {
        display: 'none',
    }
}));

export const LayerAccordianSummarySecondary = styled(AccordionSummary)(({ theme }) => ({
    "& .MuiAccordionSummary-root": {
        backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.light : theme.palette.background.light,
        borderRadius: "8px",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
        color: theme.palette.mode === "light" ? theme.palette.background.contrastText : theme.palette.background.default,
    }
    
}));

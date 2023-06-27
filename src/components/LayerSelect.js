import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";


export const LayerSelect = styled(Select)(({ theme }) => ({
    color: theme.palette.background.contrastText,
    "& 	.MuiSelect-select": {
        borderColor: theme.palette.background.contrastText,
        borderWidth: "2px",
        borderStyle: "solid",
    },
    "& .MuiSelect-icon": {
        color: theme.palette.background.contrastText,
    },
}));

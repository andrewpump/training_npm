import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";


export const CustomSelect = styled(Select)(({ theme }) => ({
    color: theme.palette.background.contrastText,
    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
        borderColor: theme.palette.background.contrastText,
        borderWidth: "2px",
        borderStyle: "solid",
    },
    "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
        color: theme.palette.background.contrastText,
    },
}));

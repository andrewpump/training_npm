import { createTheme } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const sharedPalette = {
    primary: {
        main: "#7b65ff",
        dark: "#4e38d7",
        contrastText: "#f2f2f2",
        light: "#e9dfff",
    },
    secondary: {
        main: "#df85ff",
        dark: "#c243ee",
        contrastText: "#333333",
        light: "#eebeff",
    },
};

const componentThemes = {
    MuiAccordionSummary: {
        defaultProps: {
            expandIcon: <ExpandMoreIcon />,
        }
    },
    MuiAccordion: {
        defaultProps: {
            disableGutters: true,
        }
    }
}

const typeography = {
    htmlFontSize: 16,
    fontFamily: ["Manrope"],
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: { fontSize: "2.5rem" },
    h2: { fontSize: "1.5rem" },
    h3: { fontSize: "16px", fontWeight: 700 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.75rem" },
};

const lightTheme = createTheme({
    palette: {
        ...sharedPalette,
        mode: "light",
        background: {
            default: "#ffffff",
            light: "#f2f2f2",
            contrastText: "#333333",
        },
    },
    typography: typeography,
    components: componentThemes,
});

const darkTheme = createTheme({
    palette: {
        ...sharedPalette,
        mode: "dark",
        background: {
            default: "#333333",
            light: "#4f4f4f",
            contrastText: "#f2f2f2",
        },
    },
    typography: typeography,
    components: componentThemes,
});



export { lightTheme, darkTheme, typeography, componentThemes }
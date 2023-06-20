// @ts-check
import z from "zod";
import { Invokable, Widget } from "@buildwithlayer/sdk";
import * as React from "react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Box, Typography, LinearProgress, styled } from "@mui/material";
import { createApi } from "unsplash-js";

const transition = "all 0.5s ease";
const gap = 1;
const ContainerSx = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap,
};
const Image = styled("img")({
    height: "100%",
    width: "100%",
    objectFit: "cover",
});

const HeightBox = ({ heightPercentage, backgroundColor }) => {
    return (
        <Box
            sx={{
                height: "100%",
                borderRadius: 5,
                backgroundColor,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alightItems: "center",
                transition,
            }}
        >
            <Typography variant="h3" textAlign="center" mb={2}>
                Box 1
            </Typography>
            <Typography textAlign="center">{heightPercentage}%</Typography>
        </Box>
    );
};

const ProgressBox = ({ value }) => {
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 5,
                backgroundColor: "pink",
            }}
        >
            <Typography variant="h3" mb={2}>
                Progress Bar
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        value={value}
                        sx={{ height: 25, borderRadius: 5 }}
                    />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        textAlign="center"
                        color="text.secondary"
                    >{`${Math.round(value)}%`}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

const UnsplashBox = ({ response }) => {
    return (
        <Box
            sx={{
                height: "100%",
                borderRadius: 5,
                overflow: "hidden",
                backgroundColor: "pink",
            }}
        >
            <Box sx={{ p: 2, height: "calc(100% - 20%)" }}>
                <Typography variant="h3" mb={2}>
                    Unsplash Image
                </Typography>
                <Typography variant="body1" mb={2}>
                    {response?.alt_description}
                </Typography>
                <Image
                    src={
                        response?.urls?.regular ||
                        "https://marketplace.canva.com/EAFJd1mhO-c/1/0/900w/canva-colorful-watercolor-painting-phone-wallpaper-qq02VzvX2Nc.jpg"
                    }
                    alt={response?.alt_description}
                />
            </Box>
        </Box>
    );
};

// create a react component called BasicToy that has a square and field image
export function BasicPlayground() {
    const [heightPercentage, setHeightPercentage] = useState(50);
    const [box1BackgroundColor, setBox1BackgroundColor] =
        useState("primary.light");
    const [box2BackgroundColor, setBox2BackgroundColor] =
        useState("secondary.light");
    const [progressValue, setProgressValue] = useState(50);
    const [unsplashResponse, setUnsplashResponse] = useState();
    const box2Height = useMemo(
        () => (1 - heightPercentage / 100) * 100,
        [heightPercentage]
    );
    const unsplash = useMemo(
        () =>
            createApi({
                accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY || "",
            }),
        []
    );

    const getUnsplashImage = useCallback(
        async (query) => {
            try {
                const response = await unsplash.photos.getRandom({ query });
                setUnsplashResponse(response.response);
            } catch (ex) {
                console.error(ex);
            }
        },
        [unsplash]
    );

    useEffect(() => {
        getUnsplashImage("batman");
    }, []);

    return (
        <Widget
            openAiApiKey={process.env.REACT_APP_OPEN_AI_API_KEY || ""}
            invokables={[
                // Box 1 invokables
                new Invokable({
                    name: "changeBox1HeightPercentage",
                    description:
                        "Change the height percentage of Box1 also known as Box 1",
                    func: async ({ height }) => setHeightPercentage(height),
                    schema: z.object({ height: z.number().min(0).max(100) }),
                }),
                new Invokable({
                    name: "changeBox1BackgroundColor",
                    description:
                        "Change the background color of Box1 also known as Box 1",
                    func: async ({ color }) => setBox1BackgroundColor(color),
                    schema: z.object({ color: z.string() }),
                }),

                // Box 2 invokables
                new Invokable({
                    name: "changeBox2HeightPercentage",
                    description:
                        "Change the height percentage of Box2 also known as Box 2",
                    func: async ({ height }) =>
                        setHeightPercentage((1 - height / 100) * 100),
                    schema: z.object({ height: z.number().min(0).max(100) }),
                }),
                new Invokable({
                    name: "changeBox2BackgroundColor",
                    description:
                        "Change the background color of Box2 also known as Box 2",
                    func: async ({ color }) => setBox2BackgroundColor(color),
                    schema: z.object({ color: z.string() }),
                }),

                // Progress bar invokables
                new Invokable({
                    name: "changeProgressValue",
                    description: "Change the progress bar completion value",
                    func: async ({ value }) => setProgressValue(value),
                    schema: z.object({ value: z.number().min(0).max(100) }),
                }),

                // Unsplash invokables
                new Invokable({
                    name: "changeUnsplashQuery",
                    description: "Change the image on screen to similar to query, the input of the function is an unsplash query so convert user information to it",
                    func: async ({ query }) => getUnsplashImage(query),
                    schema: z.object({ query: z.string() }),
                }),
            ]}
            layerApiKey={""}
        >
            <Box
                sx={{
                    m: gap,
                    height: `calc(100% - ${gap * 8 * 2}px)`,
                }}
            >
                <Box sx={{ display: "flex", height: "100%", gap }}>
                    <Box sx={ContainerSx}>
                        <Box sx={{ height: `${heightPercentage}%`, transition }}>
                            <HeightBox
                                heightPercentage={heightPercentage}
                                backgroundColor={box1BackgroundColor}
                            />
                        </Box>
                        <Box sx={{ height: `${box2Height}%`, transition }}>
                            <HeightBox
                                heightPercentage={box2Height}
                                backgroundColor={box2BackgroundColor}
                            />
                        </Box>
                    </Box>
                    <Box sx={ContainerSx}>
                        <Box>
                            <ProgressBox value={progressValue} />
                        </Box>
                        <Box sx={{ height: "100%", overflow: "hidden" }}>
                            <UnsplashBox response={unsplashResponse} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Widget>
    );
}


{/*         <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 16.666%)",
            gridTemplateRows: "repeat(6, 16.666%)",
            height: "100%",
        }}>
            <Item sx={{ gridArea: "1 / 1 / 4 / 4", backgroundColor: "primary.light" }}>
                <BoxText boxNum={1} />
            </Item>
            <Item sx={{ gridArea: "1 / 4 / 2 / 7" }}>
                
            </Item>
            <Box m={1} sx={{
                gridArea: "2 / 4 / 7 / 7", 
                backgroundColor: "#E0E0E0",
                borderRadius: "8px",
            }} p={2}>
                <Stack spacing={2}>
                    <Typography variant='h3'>
                        Unsplash Image
                    </Typography>
                    <Typography variant='body1'>
                        Photo By: Todo
                    </Typography>
                </Stack>
            </Box>
            <Item sx={{ gridArea: "4 / 1 / 7 / 4", backgroundColor: "secondary.light" }} ><BoxText boxNum={2} height={"50%"} /></Item>
        </Box>
      </Box> */}
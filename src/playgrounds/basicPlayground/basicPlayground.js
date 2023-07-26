// @ts-check
import * as React from 'react';
import { Box, Typography, LinearProgress, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  selectBox1Height,
  selectBox2Height,
  selectBox1BackgroundColor,
  selectBox2BackgroundColor,
  selectProgressValue,
  selectUnsplashResponse,
} from './basicPlaygroundSlice';

const transition = 'all 0.5s ease';
const gap = 2;
const ContainerSx = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap,
};
const Image = styled('img')({
  height: '100%',
  width: '100%',
  objectFit: 'cover',
});
const BoxStyle = {
  height: '100%',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alightItems: 'center',
  transition,
};

const Box1 = () => {
  const heightPercentage = useSelector(selectBox1Height);
  const backgroundColor = useSelector(selectBox1BackgroundColor);

  return (
    <Box sx={{ height: `${heightPercentage}%`, transition }}>
      <Box sx={{ ...BoxStyle, backgroundColor }}>
        <Typography variant="h3" textAlign="center" mb={2}>
          Box 1
        </Typography>
        <Typography textAlign="center">{heightPercentage}%</Typography>
      </Box>
    </Box>
  );
};

const Box2 = () => {
  const heightPercentage = useSelector(selectBox2Height);
  const backgroundColor = useSelector(selectBox2BackgroundColor);

  return (
    <Box sx={{ height: `${heightPercentage}%`, transition }}>
      <Box sx={{ ...BoxStyle, backgroundColor }}>
        <Typography variant="h3" textAlign="center" mb={2}>
          Box 2
        </Typography>
        <Typography textAlign="center">{heightPercentage}%</Typography>
      </Box>
    </Box>
  );
};

const ProgressBox = () => {
  const progressValue = useSelector(selectProgressValue);

  return (
    <Box>
      <Box
        sx={{
          p: 2,
          borderRadius: '8px',
          backgroundColor: '#E0E0E0',
        }}
      >
        <Typography variant="h3" mb={2}>
          Progress Bar
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{ height: 25, borderRadius: '8px' }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography
              variant="body2"
              fontWeight="bold"
              textAlign="center"
              color="secondary.contrastText"
            >{`${Math.round(progressValue)}%`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const UnsplashBox = () => {
  const response = useSelector(selectUnsplashResponse);

  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          height: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#E0E0E0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            height: 'calc(100% - 20%)',
            alignSelf: 'stretch',
            flexGrow: '1',
          }}
        >
          <Typography variant="h3" mb={2} sx={{ marginBottom: '8px' }}>
            Unsplash Image
          </Typography>

          <Typography variant="body1" mb={2} sx={{ color: 'error.main' }}>
            {response?.error}
          </Typography>
          <Typography variant="body1" mb={2} sx={{ lineHeight: '1.2rem' }}>
            {response?.alt_description}
          </Typography>

          <Image
            sx={{ borderRadius: '4px', minHeight: '0', alignSelf: 'stretch' }}
            src={
              response?.urls?.regular ||
              'https://marketplace.canva.com/EAFJd1mhO-c/1/0/900w/canva-colorful-watercolor-painting-phone-wallpaper-qq02VzvX2Nc.jpg'
            }
            alt={response?.alt_description}
          />
        </Box>
      </Box>
    </Box>
  );
};

// create a react component called BasicToy that has a square and field image
export function BasicPlayground() {
  return (
    <Box
      sx={{
        m: gap,
        height: `calc(100% - ${gap * 8 * 2}px)`,
        maxHeight: '100%',
      }}
    >
      <Box sx={{ display: 'flex', height: '100%', gap }}>
        <Box sx={ContainerSx}>
          <Box1 />
          <Box2 />
        </Box>
        <Box sx={ContainerSx}>
          <ProgressBox />
          <UnsplashBox />
        </Box>
      </Box>
    </Box>
  );
}

/* eslint-disable no-unused-vars */
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import AllBooksWidget from '../../widgets/AllBooksWidget';

function BookPage() {

    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(max-width: 800px)");

    return (
        <Box>
            <Box p="1rem 6%" textAlign="center" backgroundColor={palette.background.alt}>
                <Typography fontFamily="serif" fontWeight="bold" fontSize={32} color="deepskyblue">
                    EduHub
                </Typography>
            </Box>

            <Box width={isNonMobile ? "auto" : "90%"} my="1rem" mx="5%" display="flex" justifyContent="center">
                <AllBooksWidget />
            </Box>
        </Box >
    )
}

export default BookPage;
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, Box, Button, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddtoCart } from '../global/State';

function BookWidget({ book }) {

    const dispatch = useDispatch();
    const books = useSelector((state) => state.books);
    const isNonMobile = useMediaQuery("(max-width: 800px)");
    console.log(books);

    return (
        <Box display='flex' flexDirection="column" justifyContent="space-evenly" width={isNonMobile ? "100%" : "30%"} p={isNonMobile ? "1rem" : "0.8rem"} border="1px solid" borderRadius="10px" >
            <Avatar src='' />
            <Box>
                <Typography>{book.title}</Typography>
                <Typography>{book.body}</Typography>
            </Box>
            <Box>
                <Button variant='outlined' onClick={() => dispatch(setAddtoCart({ cart: book }))}>Add to Cart</Button>
            </Box>
        </Box>
    )
}

export default BookWidget
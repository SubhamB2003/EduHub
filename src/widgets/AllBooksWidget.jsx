/* eslint-disable no-unused-vars */
import { Box, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookWidget from './BookWidget';

function AllBooksWidget() {

    const [books, setBooks] = useState([]);
    const isNonMobile = useMediaQuery("(max-width: 800px)");
    const getAllBooks = async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setBooks(res.data);
        // console.log(res.data);
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <Box width="100%" display="flex" flexWrap="wrap" justifyContent="space-around" rowGap="2rem">
            {books.map((book, i) =>
                <BookWidget key={i} book={book} />
            )}
        </Box>
    )
}

export default AllBooksWidget
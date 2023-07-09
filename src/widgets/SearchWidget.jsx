/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserImage from '../components/UserImage';


function SearchWidget({ query }) {

    const theme = useTheme();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const token = useSelector((state) => state.token);

    // const main = theme.palette.neutral.main;
    // const medium = theme.palette.neutral.medium;
    // const neutralLight = theme.palette.neutral.light;

    const handleSearch = async () => {
        if (query !== "") {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(res.data);
        } else {
            setUsers([]);
        }
    }

    useEffect(() => {
        handleSearch();
    }, [query]);

    return (
        <Box sx={{ width: "20vw", overflowY: "scroll" }} borderRadius="16px" maxHeight="40vh">
            {query !== "" && users.filter((user) => user.userName.toLowerCase().includes(query.toLowerCase())).map((user) => (
                <Box display="flex" gap="1rem" padding={2} sx={{ cursor: "pointer" }} key={user._id}>
                    <UserImage image={user?.picturePath} size={50} />
                    <Box onClick={() => {
                        navigate(`/profile/${user._id}`);
                        navigate(0);
                    }}>
                        <Typography fontFamily="serif" variant="h4">{user.userName}</Typography>
                        <Typography fontFamily="serif" fontSize="0.85rem">{user.profession}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default SearchWidget;
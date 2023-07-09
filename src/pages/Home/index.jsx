/* eslint-disable no-unused-vars */
import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import LeftBar from '../../components/LeftBar';
import NavBar from '../../components/NavBar';
import RightBar from '../../components/RightBar';
import CreatePostWidget from '../../widgets/CreatePostWidget';
import PostsWidget from "../../widgets/PostsWidget";



function Home() {

    // const user = useSelector((state) => state.user);
    // const userId = user._id;
    const isNonMobile = useMediaQuery("(min-width: 1100px)");


    return (
        <Box>
            <NavBar />
            <Box width="100%" height="100%" padding="2rem 6%"
                display={isNonMobile ? "flex" : "block"}
                justifyContent="space-between">
                <Box flexBasis={isNonMobile && "28%"}>
                    <LeftBar />
                </Box>
                <Box flexBasis={isNonMobile && "40%"}
                    mt={!isNonMobile && "2rem"}>
                    <CreatePostWidget />
                    <Box m="2rem 0" />
                    <PostsWidget />
                </Box>
                {isNonMobile && (
                    <Box flexBasis={isNonMobile && "28%"}>
                        <RightBar />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default Home;
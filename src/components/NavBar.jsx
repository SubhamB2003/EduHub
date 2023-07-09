/* eslint-disable no-unused-vars */
import SearchIcon from "@mui/icons-material/Search";
import {
    AppBar,
    Avatar,
    Box,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    styled
} from "@mui/material";
import { useState } from "react";
// import logo from "../assets/logo1.png";


const MyAppBar = styled(AppBar)({
    position: "sticky",
    boxShadow: "none"
});

// const logoStyle = styled("div")({
//   height: "30px", 
//   width: "30px"
// }));

const MyToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "primary",
});

const Search = styled("div")({
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    width: "50%",
    gap: "10px",
    borderRadius: "20px",
    border: "2px solid #ebf2f7",
    padding: "0 10px",
});

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        display: "flex",
    },
}));

const Userbox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "10px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

function NavBar() {

    const [open, setOpen] = useState(false);

    return (
        <MyAppBar>
            <MyToolbar>
                <Typography sx={{ display: { xs: "none", sm: "block" } }} variant="h6">
                    Edulearn
                </Typography>
                <Avatar
                    src=""
                    sx={{ display: { xs: "block", sm: "none" }, height: '50px', width: '50px' }}
                    alt=""
                />
                <Search>
                    <SearchIcon color="disabled" />
                    <InputBase fullWidth={true} placeholder="Search..." />
                </Search>

                <Icons>
                    <Typography>ASK QUESTION</Typography>
                    <Avatar
                        sx={{ height: "30px", width: "30px" }}
                        alt="Remy Sharp"
                        src="https://icon-library.com/images/male-avatar-icon/male-avatar-icon-15.jpg"
                        onClick={(e) => setOpen(true)}
                    />
                </Icons>
                <Userbox onClick={(e) => setOpen(true)}>
                    <Avatar
                        sx={{ height: "30px", width: "30px" }}
                        alt="Remy Sharp"
                        src="https://icon-library.com/images/male-avatar-icon/male-avatar-icon-15.jpg"
                    />
                </Userbox>
                <Menu
                    id="demo-positioned-menu"
                    sx={{ top: "50px !important" }}
                    aria-labelledby="demo-positioned-button"
                    // anchorEl={anchorEl}
                    open={open}
                    onClose={(e) => setOpen(false)}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <MenuItem>View Profile</MenuItem>
                    <MenuItem>Edit My account</MenuItem>
                    <MenuItem>Logout</MenuItem>
                </Menu>
            </MyToolbar>
        </MyAppBar>
    );
}

export default NavBar;
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ReorderIcon from '@mui/icons-material/Reorder';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";

function BottomNav() {

    // const [value, setValue] = React.useState(0);

    return (
        <Box>
            <Paper sx={{ position: 'fixed', display: { xs: "block", sm: "none" }, bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation sx={{ position: "sticky", }}
                >
                    <BottomNavigationAction label="Notification" icon={<NotificationsIcon />} />
                    <BottomNavigationAction label="Favorites" icon={<MenuBookIcon />} />
                    <BottomNavigationAction label="Nearby" icon={<ReorderIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

export default BottomNav;
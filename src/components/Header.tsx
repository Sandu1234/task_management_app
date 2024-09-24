import { AppBar, Toolbar, InputBase, IconButton, Box, Typography } from '@mui/material';
import { Search, Menu } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="static" elevation={0} className="bg-white text-black shadow-md">
      <Toolbar className="flex justify-between">
        {/* Left Section: Logo */}
        <Box className="flex items-center">
          <img
            src="../src/assets/logo.png" // Replace with your logo path
            alt="Code94 Labs Logo"
            className="h-8 w-auto mr-2"
          />
          <Typography variant="h6" component="div" className="font-semibold">
            Code94 Labs
          </Typography>
        </Box>

        {/* Center Section: Search Bar */}
        <Box className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
          <Search className="text-gray-500 mr-2" />
          <InputBase
            placeholder="Search tasks"
            className="w-72" // Adjust width as needed
            inputProps={{ 'aria-label': 'search tasks' }}
          />
        </Box>

        {/* Right Section: Profile Icon or Menu */}
        <Box className="flex items-center">
          <IconButton edge="end" className="text-black">
            <Menu />
          </IconButton>
          <IconButton edge="end">
            <img
              src="../src/assets/logo.png" // Replace with profile image path
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

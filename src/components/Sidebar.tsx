import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Home, Task, Assessment, Insights, Notifications, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box className="w-64 h-screen bg-gray-100 p-4">
      <List>
        {/* Home */}
        <ListItem
          component={Link}  // Correctly pass the Link component
          to="/home"
          className="mb-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <ListItemIcon><Home className="text-gray-500" /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {/* Tasks */}
        <ListItem
          component={Link}  // Correctly pass the Link component
          to="/tasks"
          className="mb-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white"
        >
          <ListItemIcon><Task className="text-white" /></ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>

        {/* Report */}
        <ListItem
          component={Link}
          to="/report"
          className="mb-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <ListItemIcon><Assessment className="text-gray-500" /></ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>

        {/* Insights */}
        <ListItem
          component={Link}
          to="/insights"
          className="mb-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <ListItemIcon><Insights className="text-gray-500" /></ListItemIcon>
          <ListItemText primary="Insights" />
        </ListItem>

        {/* Inbox */}
        <ListItem
          component={Link}
          to="/inbox"
          className="mb-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <ListItemIcon><Notifications className="text-gray-500" /></ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>

        {/* Settings */}
        <ListItem
          component={Link}
          to="/settings"
          className="mb-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          <ListItemIcon><Settings className="text-gray-500" /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;

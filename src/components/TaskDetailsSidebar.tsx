import React, { useState } from 'react';
import {
  Box, Typography, IconButton, Divider, MenuItem, TextField, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, Button,
} from '@mui/material';
import { Close, DeleteOutline, CheckCircleOutline } from '@mui/icons-material';

// Define the Task type (you can import this from the main component if needed)
interface Task {
  taskName: string;
  dueDate: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Completed';
  description?: string;
}

interface TaskDetailsSidebarProps {
  task: Task | null;
  onClose: () => void;  // Function to close the sidebar
  onDelete: () => void; // Function to delete the task
  onComplete: () => void; // Function to mark task as complete
  onEdit: (field: keyof Task, value: string) => void; // Function to edit the task
}

const TaskDetailsSidebar: React.FC<TaskDetailsSidebarProps> = ({
  task, onClose, onDelete, onComplete, onEdit,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for controlling delete confirmation dialog

  if (!task) return null; // If no task is selected, don't render the sidebar

  // Handle opening and closing of the delete confirmation dialog
  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  return (
    <Box className="w-96 h-screen p-4 bg-white fixed right-0 top-0 shadow-lg overflow-y-auto">
      {/* Close Button */}
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h6">{task.taskName}</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {/* Task Status */}
      <Box className="flex items-center mb-4">
        <Typography variant="body1" className="mr-2">Status:</Typography>
        <TextField
          select
          value={task.status}
          onChange={(e) => onEdit('status', e.target.value)}
          className="flex-1"
          size="small"
          variant="outlined"
        >
          <MenuItem value="Todo">Todo</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
      </Box>

      {/* Due Date */}
      <Box className="flex items-center mb-4">
        <Typography variant="body1" className="mr-2">Due Date:</Typography>
        <TextField
          type="date"
          value={task.dueDate}
          onChange={(e) => onEdit('dueDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
          variant="outlined"
        />
      </Box>

      {/* Assignee */}
      <Box className="flex items-center mb-4">
        <Typography variant="body1" className="mr-2">Assignee:</Typography>
        <TextField
          select
          value={task.assignee}
          onChange={(e) => onEdit('assignee', e.target.value)}
          className="flex-1"
          size="small"
          variant="outlined"
        >
          <MenuItem value="John Taylor">John Taylor</MenuItem>
          <MenuItem value="Jane Doe">Jane Doe</MenuItem>
        </TextField>
      </Box>

      {/* Priority */}
      <Box className="flex items-center mb-4">
        <Typography variant="body1" className="mr-2">Priority:</Typography>
        <TextField
          select
          value={task.priority}
          onChange={(e) => onEdit('priority', e.target.value)}
          className="flex-1"
          size="small"
          variant="outlined"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
      </Box>

      {/* Task Description */}
      <Box className="mb-4">
        <Typography variant="body1" className="mb-2">Description:</Typography>
        <TextField
          multiline
          fullWidth
          variant="outlined"
          value={task.description || ''}
          onChange={(e) => onEdit('description', e.target.value)}
        />
      </Box>

      <Divider className="my-4" />

      {/* Action Buttons */}
      <Box className="flex justify-between">
        <IconButton color="primary" onClick={onComplete}>
          <CheckCircleOutline />
        </IconButton>
        <IconButton color="error" onClick={handleOpenDeleteDialog}>
          <DeleteOutline />
        </IconButton>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-task-dialog-title"
        aria-describedby="delete-task-dialog-description"
      >
        <DialogTitle id="delete-task-dialog-title">Are you sure you want to delete the selected task?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-task-dialog-description">
            This will permanently delete the selected task. This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete(); // Trigger task deletion
              handleCloseDeleteDialog(); // Close the dialog after deletion
            }}
            variant="contained"
            color="error"
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskDetailsSidebar;

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { useFormik } from 'formik';

const priorities = ['Low', 'Medium', 'High'];

const TaskModal = ({ open, handleClose, handleSubmit }: any) => {
  const formik = useFormik({
    initialValues: {
      taskName: '',
      dueDate: '',
      assignee: '',
      priority: 'Medium',
    },
    onSubmit: (values) => {
      handleSubmit(values);
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Task Name"
            name="taskName"
            fullWidth
            required
            className="mb-4"
            value={formik.values.taskName}
            onChange={formik.handleChange}
          />

          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            fullWidth
            className="mb-4"
            InputLabelProps={{ shrink: true }}
            value={formik.values.dueDate}
            onChange={formik.handleChange}
          />

          <TextField
            label="Assignee"
            name="assignee"
            fullWidth
            className="mb-4"
            value={formik.values.assignee}
            onChange={formik.handleChange}
            select
          >
            {/* Sample assignees */}
            <MenuItem value="John Taylor">John Taylor</MenuItem>
            <MenuItem value="Jane Doe">Jane Doe</MenuItem>
          </TextField>

          <TextField
            label="Priority"
            name="priority"
            fullWidth
            className="mb-4"
            value={formik.values.priority}
            onChange={formik.handleChange}
            select
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </TextField>

          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add Task
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;

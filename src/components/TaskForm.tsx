import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Dialog, DialogTitle, DialogContent, Button, TextField, MenuItem } from '@mui/material';

const TaskForm: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ taskName: '', assignee: '', priority: 'Medium', dueDate: '', status: 'Todo' }}
          onSubmit={(values) => {
            console.log(values); // Will handle form submission here
            onClose();
          }}
        >
          {({  }) => (
            <Form>
              <Field
                as={TextField}
                label="Task Name"
                name="taskName"
                fullWidth
                required
                className="mb-4"
              />
              <Field
                as={TextField}
                label="Assignee"
                name="assignee"
                select
                fullWidth
                className="mb-4"
              >
                {/* Sample assignee list */}
                <MenuItem value="John Doe">John Doe</MenuItem>
                <MenuItem value="Jane Smith">Jane Smith</MenuItem>
              </Field>
              <Field
                as={TextField}
                label="Priority"
                name="priority"
                select
                fullWidth
                className="mb-4"
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Field>
              <Field
                as={TextField}
                label="Due Date"
                name="dueDate"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                className="mb-4"
              />
              <Button type="submit" variant="contained" fullWidth>
                Add Task
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;

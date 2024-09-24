import React, { useState } from 'react';
import { Box, Typography, IconButton, TextField, MenuItem, Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import Header from './Header';
import Sidebar from './Sidebar';
import TaskDetailsSidebar from './TaskDetailsSidebar';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// Define the Task type
interface Task {
  id: string;
  taskName: string;
  dueDate: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Completed';
  description?: string;
}

// Helper function to generate a unique ID for tasks
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Handle task selection for sidebar
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  // Close the sidebar
  const handleCloseSidebar = () => setSelectedTask(null);

  // Create a new task card to be filled
  const handleAddTaskCard = (status: Task['status']) => {
    const emptyTask: Task = {
      id: generateId(),
      taskName: '',
      dueDate: '',
      assignee: '',
      priority: 'Low',
      status,
      description: '',
    };
    setNewTask(emptyTask);
  };

  // Handle input change for the new task
  const handleTaskDetailChange = (field: keyof Task, value: string) => {
    if (newTask) {
      setNewTask({ ...newTask, [field]: value });
    }
  };

  // Save the new task and add it to the task list
  const handleSaveTask = () => {
    if (newTask && newTask.taskName && newTask.dueDate && newTask.assignee) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask(null); // Clear the new task after saving
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Handle drag and drop end event
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside the droppable area, return
    if (!destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1); // Remove from source index
    movedTask.status = destination.droppableId as Task['status']; // Update task status
    updatedTasks.splice(destination.index, 0, movedTask); // Insert at the destination index

    setTasks(updatedTasks);
  };

  return (
    <Box className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      <Box className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Task Columns */}
        <Box className="flex-1 flex flex-col p-6 bg-gray-100">
          <DragDropContext onDragEnd={onDragEnd}>
            <Box className="grid grid-cols-3 gap-4">
              {['Todo', 'In Progress', 'Completed'].map((status, index) => (
                <Droppable key={index} droppableId={status}>
                  {(provided) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-white rounded-lg shadow p-4 min-h-[300px]"
                    >
                      <Box className="flex justify-between items-center mb-4">
                        <Typography variant="h6" className="font-semibold">{status}</Typography>
                        <Typography variant="body2" className="text-gray-500">
                          {tasks.filter((task) => task.status === status).length}
                        </Typography>
                        <IconButton
                          className="text-blue-500"
                          onClick={() => handleAddTaskCard(status as Task['status'])}
                        >
                          <AddCircleOutline />
                        </IconButton>
                      </Box>

                      {/* Render tasks in this column */}
                      {tasks
                        .filter((task) => task.status === status)
                        .map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <Box
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className="bg-gray-100 p-4 mb-2 rounded shadow cursor-pointer"
                                onClick={() => handleTaskClick(task)} // Set task when clicked
                              >
                                <Typography variant="body1">{task.taskName}</Typography>
                                <Typography variant="body2" className="text-gray-500">
                                  Due: {task.dueDate}
                                </Typography>
                                <Typography variant="caption">Priority: {task.priority}</Typography>
                              </Box>
                            )}
                          </Draggable>
                        ))}

                      {/* Droppable placeholder */}
                      {provided.placeholder}

                      {/* New Task Form */}
                      {newTask && newTask.status === status && (
                        <Box className="bg-gray-50 p-4 mb-2 rounded-lg shadow border">
                          <TextField
                            placeholder="Write a task name"
                            fullWidth
                            variant="outlined"
                            value={newTask.taskName}
                            onChange={(e) => handleTaskDetailChange('taskName', e.target.value)}
                            className="mb-2"
                          />
                          <Box className="flex justify-between mb-2">
                            <TextField
                              label="Assignee"
                              select
                              value={newTask.assignee}
                              onChange={(e) => handleTaskDetailChange('assignee', e.target.value)}
                              className="mr-2"
                              fullWidth
                            >
                              <MenuItem value="John Taylor">John Taylor</MenuItem>
                              <MenuItem value="Jane Doe">Jane Doe</MenuItem>
                            </TextField>

                            <TextField
                              label="Due Date"
                              type="date"
                              value={newTask.dueDate}
                              onChange={(e) => handleTaskDetailChange('dueDate', e.target.value)}
                              InputLabelProps={{ shrink: true }}
                              fullWidth
                            />
                          </Box>

                          <Box className="mb-2">
                            <TextField
                              label="Priority"
                              select
                              value={newTask.priority}
                              onChange={(e) => handleTaskDetailChange('priority', e.target.value)}
                              fullWidth
                            >
                              <MenuItem value="Low">Low</MenuItem>
                              <MenuItem value="Medium">Medium</MenuItem>
                              <MenuItem value="High">High</MenuItem>
                            </TextField>
                          </Box>

                          <Button variant="contained" color="primary" onClick={handleSaveTask}>
                            Save Task
                          </Button>
                        </Box>
                      )}
                    </Box>
                  )}
                </Droppable>
              ))}
            </Box>
          </DragDropContext>
        </Box>

        {/* Task Details Sidebar */}
        {selectedTask && (
          <TaskDetailsSidebar
            task={selectedTask}
            onClose={handleCloseSidebar}
            onDelete={() => {}}
            onComplete={() => {}}
            onEdit={() => {}}
          />
        )}
      </Box>
    </Box>
  );
};

export default TaskBoard;

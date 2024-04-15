import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompleted } from "../redux/action";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Checkbox,
} from "@mui/material";

const TaskList = () => {
  // Redux dispatch function
  const dispatch = useDispatch();
  // State to store selected task IDs
  const [selectedTasks, setSelectedTasks] = useState([]);
  // State to store completed task IDs
  const [completedTasks, setCompletedTasks] = useState([]);

  // Retrieve tasks from local storage or initialize empty array
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
  const initialTasks = tasksFromLocalStorage ? tasksFromLocalStorage : [];
  // Select tasks from Redux store or use initial tasks from local storage
  const tasks = useSelector((state) => state.tasks || initialTasks);

  useEffect(() => {
    // Set completed tasks based on tasks stored in local storage
    if (tasksFromLocalStorage) {
      const completedTaskIds = tasksFromLocalStorage
        .filter((task) => task.completed)
        .map((task) => task.id);
      setCompletedTasks(completedTaskIds);
    }
  }, [tasksFromLocalStorage]);

  // Event handler to delete selected tasks
  const handleDelete = () => {
    selectedTasks.forEach((taskId) => {
      dispatch(deleteTask(taskId));
    });
    setSelectedTasks([]);
  };

  // Event handler to toggle selection of a task
  const handleCheckboxChange = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  // Event handler to toggle completion of a task
  const handleToggleCompleted = (taskId) => {
    dispatch(toggleTaskCompleted(taskId));
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  return (
    <Box>
      {/* Buttons for marking selected tasks as completed and deleting selected tasks */}
      <Box display="flex" justifyContent="space-between" marginBottom="10px">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            selectedTasks.forEach((taskId) => {
              handleToggleCompleted(taskId);
            });
            setSelectedTasks([]);
          }}
        >
          Mark as Completed
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Selected
        </Button>
      </Box>
      {/* List of tasks */}
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              backgroundColor: completedTasks.includes(task.id)
                ? "#b9f6ca" // Green background for completed tasks
                : "inherit", // Use default background for incomplete tasks
            }}
          >
            {/* Checkbox for selecting a task */}
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={selectedTasks.includes(task.id)}
                onChange={() => handleCheckboxChange(task.id)}
              />
              {/* Task text */}
              <ListItemText primary={task.text} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;

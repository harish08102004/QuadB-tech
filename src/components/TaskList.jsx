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
  const dispatch = useDispatch();
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));
  const initialTasks = tasksFromLocalStorage ? tasksFromLocalStorage : [];
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

  const handleDelete = () => {
    selectedTasks.forEach((taskId) => {
      dispatch(deleteTask(taskId));
    });
    setSelectedTasks([]);
  };

  const handleCheckboxChange = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

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
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              backgroundColor: completedTasks.includes(task.id)
                ? "#b9f6ca"
                : "inherit",
            }}
          >
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={selectedTasks.includes(task.id)}
                onChange={() => handleCheckboxChange(task.id)}
              />
              <ListItemText primary={task.text} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;

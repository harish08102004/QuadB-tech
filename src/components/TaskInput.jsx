import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/action";
import { TextField, Button, Box } from "@mui/material";

const TaskInput = () => {
  // State to store the text of the new task
  const [taskText, setTaskText] = useState("");
  // Redux dispatch function
  const dispatch = useDispatch();

  // Event handler to update task text as user types
  const handleChange = (e) => {
    setTaskText(e.target.value);
  };

  // Event handler to add a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the task text is empty
    if (!taskText.trim()) return;

    // Dispatch action to add task to Redux store
    dispatch(addTask(taskText));

    // Retrieve existing tasks from local storage or initialize an empty array
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // Generate a random ID for the new task
    const newTask = {
      id: Math.floor(Math.random() * 10000),
      text: taskText,
      completed: false, // Assuming task is not completed initially
    };
    // Update the tasks array with the new task
    const updatedTasks = [...existingTasks, newTask];
    // Save the updated tasks array to local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Clear the input field after adding the task
    setTaskText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for task text */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TextField
          label="Task"
          variant="outlined"
          value={taskText}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        {/* Button to submit the new task */}
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </Box>
    </form>
  );
};

export default TaskInput;

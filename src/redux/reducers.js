import { ADD_TASK, DELETE_TASK, TOGGLE_TASK_COMPLETED } from "./action";

// Initial state, tasks are retrieved from local storage or initialized as an empty array
const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

// Reducer function to handle state updates based on dispatched actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      // Add a new task to the tasks array
      const newTask = {
        id: new Date().getTime(), // Generate a unique ID
        text: action.payload.text, // Task text from action payload
        completed: false, // Initial completed status is false
      };
      // Update tasks array with new task
      const updatedTasks = [...state.tasks, newTask];
      // Update local storage with updated tasks array
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      // Return updated state with new tasks array
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case DELETE_TASK: {
      // Filter out the deleted task from tasks array
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      // Update local storage with updated tasks array
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      // Return updated state with filtered tasks array
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case TOGGLE_TASK_COMPLETED: {
      // Toggle completed status of the specified task
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          // If task ID matches, toggle completed status
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
      // Update local storage with updated tasks array
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      // Return updated state with toggled tasks array
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    default:
      // If action type does not match any case, return current state
      return state;
  }
};

export default reducer;

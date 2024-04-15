import { ADD_TASK, DELETE_TASK, TOGGLE_TASK_COMPLETED } from "./action";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      const newTask = {
        id: new Date().getTime(),
        text: action.payload.text,
        completed: false,
      };
      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case DELETE_TASK: {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case TOGGLE_TASK_COMPLETED: {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    default:
      return state;
  }
};

export default reducer;

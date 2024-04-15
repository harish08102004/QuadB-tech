export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_TASK_COMPLETED = "TOGGLE_TASK_COMPLETED";

export const addTask = (text, saveToLocalStorage = true) => ({
  type: ADD_TASK,
  payload: {
    text,
  },
  saveToLocalStorage,
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: {
    id,
  },
});

export const toggleTaskCompleted = (id) => ({
  type: TOGGLE_TASK_COMPLETED,
  payload: {
    id,
  },
});

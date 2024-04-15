// Action types
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_TASK_COMPLETED = "TOGGLE_TASK_COMPLETED";

// Action creators

/**
 * Action creator for adding a new task.
 * @param {string} text - The text content of the task.
 * @param {boolean} saveToLocalStorage - Whether to save the task to local storage.
 * @returns {object} An action object with type and payload.
 */
export const addTask = (text, saveToLocalStorage = true) => ({
  type: ADD_TASK,
  payload: {
    text,
  },
  saveToLocalStorage, // Indicates whether to save the task to local storage
});

/**
 * Action creator for deleting a task.
 * @param {number} id - The ID of the task to delete.
 * @returns {object} An action object with type and payload.
 */
export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: {
    id,
  },
});

/**
 * Action creator for toggling the completed status of a task.
 * @param {number} id - The ID of the task to toggle.
 * @returns {object} An action object with type and payload.
 */
export const toggleTaskCompleted = (id) => ({
  type: TOGGLE_TASK_COMPLETED,
  payload: {
    id,
  },
});

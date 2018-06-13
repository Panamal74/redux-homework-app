// Instruments
import { types } from "./types";

export const tasksActions = Object.freeze({
    // fetch
    fetchTasks: (tasks) => ({
        type:    types.FETCH_TASKS,
        payload: tasks,
    }),
    // create
    createTask: (task) => ({
        type:    types.CREATE_TASK,
        payload: task,
    }),
    // remove
    removeTask: (id) => ({
        type:    types.REMOVE_TASK,
        payload: id,
    }),
    // change
    changeTask: (task) => ({
        type:    types.CHANGE_TASK,
        payload: task,
    }),
    // completed
    completedAll: (tasks) => ({
        type:    types.COMPLETED_ALL,
        payload: tasks,
    }),
});

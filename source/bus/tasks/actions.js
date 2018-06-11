// Instruments
import { types } from "./types";

// debugger;
//
export const tasksActions = Object.freeze({
    fetchTasks: () => ({
        type: types.FETCH_TASKS,
    }),
    fetchTasksSuccess: (tasks) => ({
        type:    types.FETCH_TASKS_SUCCESS,
        payload: tasks,
    }),
    fetchTasksFail: (error) => ({
        type:    types.FETCH_TASKS_FAIL,
        payload: error,
        error:   true,
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
    // like
    likeTask: (id) => ({
        type:    types.LIKE_TASK,
        payload: id,
    }),
    unlikeTask: (id) => ({
        type:    types.UNLIKE_TASK,
        payload: id,
    }),
    // complete
    completeTask: (id) => ({
        type:    types.COMPLETE_TASK,
        payload: id,
    }),
    uncompleteTask: (id) => ({
        type:    types.UNCOMPLETE_TASK,
        payload: id,
    }),
});

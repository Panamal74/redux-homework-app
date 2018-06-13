import { asyncTypes } from "./asyncTypes";

export const tasksActionsAsync = Object.freeze({
    fetchTaskAsync: () => ({
        type: asyncTypes.FETCH_TASKS_ASYNC,
    }),
    createTaskAsync: (message) => ({
        type:    asyncTypes.CREATE_TASK_ASYNC,
        payload: message,
    }),
    removeTaskAsync: (id) => ({
        type:    asyncTypes.REMOVE_TASK_ASYNC,
        payload: id,
    }),
    changeTaskAsync: (task) => ({
        type:    asyncTypes.CHANGE_TASK_ASYNC,
        payload: task,
    }),
    completedAllAsync: (tasks) => ({
        type:    asyncTypes.COMPLETED_ALL_ASYNC,
        payload: tasks,
    }),
});

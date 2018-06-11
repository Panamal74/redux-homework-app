import { asyncTypes } from "./asyncTypes";

export const tasksActionsAsync = Object.freeze({
    createTaskAsync: (message) => ({
        type:    asyncTypes.CREATE_TASK_ASYNC,
        payload: message,
    }),
    removeTaskAsync: (id) => ({
        type:    asyncTypes.REMOVE_TASK_ASYNC,
        payload: id,
    }),
    likeTaskAsync: (id) => ({
        type:    asyncTypes.LIKE_TASK_ASYNC,
        payload: id,
    }),
    unlikeTaskAsync: (id) => ({
        type:    asyncTypes.UNLIKE_TASK_ASYNC,
        payload: id,
    }),
    completeTaskAsync: (id) => ({
        type:    asyncTypes.COMPLETE_TASK_ASYNC,
        payload: id,
    }),
    uncompleteTaskAsync: (id) => ({
        type:    asyncTypes.UNCOMPLETE_TASK_ASYNC,
        payload: id,
    }),
});

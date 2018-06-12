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
    // likeTaskAsync: (id) => ({
    //     type:    asyncTypes.LIKE_TASK_ASYNC,
    //     payload: id,
    // }),
    // unlikeTaskAsync: (id) => ({
    //     type:    asyncTypes.UNLIKE_TASK_ASYNC,
    //     payload: id,
    // }),
    // completeTaskAsync: (id) => ({
    //     type:    asyncTypes.COMPLETE_TASK_ASYNC,
    //     payload: id,
    // }),
    // uncompleteTaskAsync: (id) => ({
    //     type:    asyncTypes.UNCOMPLETE_TASK_ASYNC,
    //     payload: id,
    // }),
});

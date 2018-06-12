import { combineReducers } from 'redux';
//import { routerReducer as router } from 'react-router-redux';

import { tasksReducer as tasks } from "../bus/tasks/reducer";

export const rootReducer = combineReducers({
    //router,
    tasks,
});
// export const rootReducer = combineReducers({
//     router,
//     tasks,
// });

import { combineReducers } from 'redux';

import { tasksReducer as tasks } from "../bus/tasks/reducer";
import { uiReducer as ui } from "../bus/ui/reducer";
import { formsReducer as forms } from "../bus/forms/reducer";

export const rootReducer = combineReducers({
    tasks,
    ui,
    forms,
});

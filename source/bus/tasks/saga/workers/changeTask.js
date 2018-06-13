import { call, put } from 'redux-saga/effects';

import { url, token } from '../../../../config/api';
import { uiActions } from "../../../ui/actions";
import { tasksActions } from '../../../../bus/tasks/actions';

export function* callChangeTaskWorker ({ payload: changeTask }) {

    try {
        yield put(uiActions.setTasksFetchingState(true));

        const response = yield call(fetch, url, {
            method:  'PUT',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([changeTask]),
        });

        const { data: task, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.changeTask(task));
    } catch (error) {
        yield put(uiActions.emitError(error, 'changeTaskWorker'));
    } finally {
        yield put(uiActions.setTasksFetchingState(false));
    }
}

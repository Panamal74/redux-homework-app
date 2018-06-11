// import { call, put, select } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';

import { url, token } from '../../../../config/api';
import { uiActions } from "../../../ui/actions";
import { tasksActions } from '../../../../bus/tasks/actions';

export function* callCreateTaskWorker ({ payload: taskMessage }) {

    try {
        yield put(uiActions.setTasksFetchingState(true));

        // const token = yield select((state) => state.profile.get('token'));

        const response = yield call(fetch, url, {
            method:  'POST',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskMessage }),
        });

        const { data: task, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.createTask(task));
    } catch (error) {
        yield put(uiActions.emitError(error, 'createTaskWorker'));
    } finally {
        yield put(uiActions.setTasksFetchingState(false));
    }
}

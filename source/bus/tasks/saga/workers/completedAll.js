import { call, put } from 'redux-saga/effects';

import { url, token } from '../../../../config/api';
import { uiActions } from '../../../ui/actions';
import { tasksActions } from '../../../../bus/tasks/actions';

export function* callCompletedAllWorker ({ payload: allTasks }) {
    try {
        yield put(uiActions.setTasksFetchingState(true));

        const response = yield call(fetch, url, {
            method:  'PUT',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(allTasks.toJS().map((value) => {
                value.completed = true;

                return value;
            })),
        });

        const { data: tasks, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.completedAll(tasks));
    } catch (error) {
        yield put(uiActions.emitError(error, 'completedAllWorker'));
    } finally {
        yield put(uiActions.setTasksFetchingState(false));
    }
}

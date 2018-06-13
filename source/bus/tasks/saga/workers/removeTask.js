import { call, put } from 'redux-saga/effects';

import { url, token } from '../../../../config/api';
import { uiActions } from "../../../ui/actions";
import { tasksActions } from '../../../../bus/tasks/actions';

export function* callRemoveTaskWorker ({ payload: id }) {

    try {
        yield put(uiActions.setTasksFetchingState(true));

        const response = yield call(fetch, `${url}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: token,
            },
        });

        if (response.status !== 204) {
            const { message } = yield call([response, response.json]);

            throw new Error(message);
        }

        yield put(tasksActions.removeTask(id));
    } catch (error) {
        yield put(uiActions.emitError(error, 'removeTaskWorker'));
    } finally {
        yield put(uiActions.setTasksFetchingState(false));
    }
}

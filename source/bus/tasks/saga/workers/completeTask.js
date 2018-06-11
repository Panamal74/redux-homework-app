import { call, put } from 'redux-saga/effects';

import { url, token } from '../../../../config/api';
import { uiActions } from "../../../ui/actions";
import { tasksActions } from '../../../../bus/tasks/actions';

export function* callCompleteTaskWorker ({ payload: id }) {

    try {
        yield put(uiActions.setTasksFetchingState(true));

        // const token = yield select((state) => state.profile.get('token'));

        const response = yield call(fetch, url, {
            method:  'PUT',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json',
            },
            // body!!!!!!!!!!!!
        });

        if (response.status !== 200) {
            const { message } = yield call([response, response.json]);

            throw new Error(message);
        }

        yield put(tasksActions.completeTask(id));
    } catch (error) {
        yield put(uiActions.emitError(error, 'completeTaskWorker'));
    } finally {
        yield put(uiActions.setTasksFetchingState(false));
    }
}

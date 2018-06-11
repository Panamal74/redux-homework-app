import { put } from 'redux-saga/effects';

import { authActions } from '../../../../bus/authentication/actions';
import { uiActions } from "../../../ui/actions";

export function* callInitialiseWorker () {
    const token = yield localStorage.getItem('token');

    if (token) {
        yield put(authActions.authenticate(token));

        return null;
    }

    yield put(uiActions.initialiseSuccess());
}

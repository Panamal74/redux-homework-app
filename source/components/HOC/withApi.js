import React, { Component } from 'react';

import { url, token } from "../../config/api";

// Instruments
import {
    checkFieldLength,
    getFilterTasks,
    getFavoriteTasks,
    getCompletedFavoriteTasks,
    getCompletedOtherTasks,
    getOtherTasks
} from "../../instruments/helpers";


export const withApi = (Enchanced) =>
    class WithApi extends Component {

        constructor () {
            super();
            this.doCreateTask = this._createTask.bind(this);
            this.doRemoveTask = this._removeTask.bind(this);
            this.doChangeTask = this._changeTask.bind(this);
            this.doCompleteAll = this._completeAll.bind(this);
        }

        state = {
            isTasksFetching: false,
            tasks:           [],
        };

        _setTasksFetchingState = (state) => {
            this.setState(() => ({
                isTasksFetching: state,
            }));
        };

        async _createTask (message) {
            this._setTasksFetchingState(true);
            try {
                const response = await fetch(url, {
                    method:  'POST',
                    headers: {
                        Authorization:  token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });

                if (response.status !== 200) {
                    throw new Error('Fetch task failed');
                }

                const { data } = await response.json();

                this.setState(({ tasks }) => ({
                    tasks: [data, ...tasks],
                }));
            } catch (error) {
                console.error(error);
            } finally {
                localStorage.setItem('tasksSchedulerDefaultValue', JSON.stringify(this.state.tasks));
                this._setTasksFetchingState(false);
            }
        }

        async _removeTask (id) {
            this._setTasksFetchingState(true);
            try {
                const response = await fetch(`${url}/${id}`, {
                    method:  'DELETE',
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.status !== 204) {
                    throw new Error('Delete task failed');
                }

                this.setState(({ tasks }) => ({
                    tasks: tasks.filter((message) => message.id !== id),
                }));
            } catch (error) {
                console.error(error);
            } finally {
                localStorage.setItem('tasksSchedulerDefaultValue', JSON.stringify(this.state.tasks));
                this._setTasksFetchingState(false);
            }
        }

        async _changeTask (task) {
            this._setTasksFetchingState(true);
            try {
                const response = await fetch(url, {
                    method:  'PUT',
                    headers: {
                        Authorization:  token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify([task]),
                });

                if (response.status !== 200) {
                    throw new Error('Change task failed');
                }

                const { data } = await response.json();

                if (data.length > 0) {
                    this.setState(({ tasks }) => ({
                        tasks: tasks.map((value) => value.id === data[0].id ? data[0] : value),
                    }));
                }

            } catch (error) {
                console.error(error);
            } finally {
                localStorage.setItem('tasksSchedulerDefaultValue', JSON.stringify(this.state.tasks));
                this._setTasksFetchingState(false);
            }
        }

        async _completeAll () {
            const { tasks } = this.state;

            this._setTasksFetchingState(true);

            try {
                const response = await fetch(url, {
                    method:  'PUT',
                    headers: {
                        Authorization:  token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(tasks.map((value) => {
                        value.completed = true;

                        return value;
                    })),
                });

                if (response.status !== 200) {
                    throw new Error('Change task failed');
                }

                const { data } = await response.json();

                this.setState({
                    tasks: data.reverse(),
                });
            } catch (error) {
                console.error(error);
            } finally {
                localStorage.setItem('tasksSchedulerDefaultValue', JSON.stringify(this.state.tasks));
                this._setTasksFetchingState(false);
            }
        }

        render () {
            return (
                <Enchanced
                    { ...this.state }
                    { ...this.props }
                    checkFieldLength = { checkFieldLength }
                    doChangeTask = { this.doChangeTask }
                    doCompleteAll = { this.doCompleteAll }
                    doCreateTask = { this.doCreateTask }
                    doRemoveTask = { this.doRemoveTask }
                    getCompletedFavoriteTasks = { getCompletedFavoriteTasks }
                    getCompletedOtherTasks = { getCompletedOtherTasks }
                    getFavoriteTasks = { getFavoriteTasks }
                    getFilterTasks = { getFilterTasks }
                    getOtherTasks = { getOtherTasks }
                />
            );
        }
    };

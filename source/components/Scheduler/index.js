// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Transition } from 'react-transition-group';
import { Form, Errors, actions as formActions } from 'react-redux-form';

// Instruments
import { tasksActionsAsync } from "../../bus/tasks/saga/asyncActions";
import { uiActions } from "../../bus/ui/actions";
import Animation from './animation';
import {
    validateLength,
    getFilterTasks,
    getFavoriteTasks,
    getCompletedFavoriteTasks,
    getCompletedOtherTasks,
    getOtherTasks
} from "../../instruments/helpers";
import FlipMove from 'react-flip-move';

// Style
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Task from '../../components/Task';
import Spinner from '../../components/Spinner';
import Input from '../Input';
import UpIcon from './image/arrow_upward.png';

const mapStateToProps = (state) => {
    return {
        isTasksFetching: state.ui.get('isTasksFetching'),
        searchValue:     state.ui.get('searchValue'),
        compareMethod:   state.ui.get('compareMethod'),
        duration:        state.ui.get('animationDuration'),
        taskEdit:        state.ui.get('taskEdit'),
        tasks:           state.tasks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                fetchTasksAsync:   tasksActionsAsync.fetchTaskAsync,
                createTaskAsync:   tasksActionsAsync.createTaskAsync,
                removeTaskAsync:   tasksActionsAsync.removeTaskAsync,
                changeTaskAsync:   tasksActionsAsync.changeTaskAsync,
                completedAllAsync: tasksActionsAsync.completedAllAsync,
                changeSearchValue: uiActions.setTasksSearch,
                editButtonClick:   uiActions.setTaskEdit,
                changeCompare:     uiActions.setCompareMethod,
                resetForm:         formActions.reset,
            },
            dispatch,
        ),
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Scheduler extends Component {
    constructor () {
        super();
        this.handleChangeSearchValue = this._handleChangeSearchValue.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleCompletedAllTasks = this._handleCompletedAllTasks.bind(this);
        this.getRenderTasks = this._getRenderTasks.bind(this);
        this.handleCompare = this._handleCompare.bind(this);
    }

    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }


    _handleChangeSearchValue (event) {
        const { actions } = this.props;

        if (validateLength(event.target.value, 50)) {
            actions.changeSearchValue(event.target.value);
        }
    }

    _handleSubmit (inputValue) {
        const { actions } = this.props;

        if (inputValue.newTaskValue.trim()) {
            actions.createTaskAsync(inputValue.newTaskValue);
            actions.resetForm('forms.newTask');
        }
    }

    _handleCompletedAllTasks () {
        const { actions, tasks } = this.props;

        actions.completedAllAsync(tasks);
    }

    _handleTaskOpen = (task) => {
        const { duration } = this.props;

        Animation.open(task, duration);
    };

    _handleTaskClose = (task) => {
        const { duration } = this.props;

        Animation.close(task, duration);
    };

    _getRenderTasks (showTasks) {
        const { actions, duration, taskEdit } = this.props;

        return showTasks.map((value) => {
            return (
                <Transition
                    appear
                    key = { value.get('id') }
                    timeout = { {
                        enter: duration * 1000,
                        exit:  duration * 1000,
                    } }
                    onEnter = { this._handleTaskOpen }
                    onExit = { this._handleTaskClose }>
                    <Task
                        doChangeTask = { actions.changeTaskAsync }
                        doEditTask = { actions.editButtonClick }
                        doRemoveTask = { actions.removeTaskAsync }
                        task = { value }
                        taskEdit = { taskEdit }
                        validateLength = { validateLength }
                    />
                </Transition>
            );
        });
    }

    _handleCompare () {
        const { compareMethod, actions } = this.props;

        actions.changeCompare(!compareMethod);
    }

    render () {
        const {
            tasks,
            isTasksFetching,
            searchValue,
            compareMethod,
        } = this.props;

        const completeAll = tasks.every((value) => {
            return value.get('completed') === true;
        });

        const showTasks = getFilterTasks(searchValue, tasks);

        const showAll = this.getRenderTasks(
            getFavoriteTasks(showTasks, compareMethod).concat(
                getOtherTasks(showTasks, compareMethod),
                getCompletedFavoriteTasks(showTasks, compareMethod),
                getCompletedOtherTasks(showTasks, compareMethod)
            )
        );

        return (
            <div>
                <Spinner spin = { isTasksFetching } />
                <section className = { Styles.scheduler }>
                    <main>
                        <header>
                            <h1>Планировщик задач</h1>
                            <div>
                                <input
                                    name = 'searchValue'
                                    placeholder = 'Поиск'
                                    type = 'text'
                                    value = { searchValue }
                                    onChange = { this.handleChangeSearchValue }
                                />
                                <button
                                    id = 'sortButton'
                                    title = { compareMethod ? 'От поздних к ранним' : 'От ранних к поздним' }
                                    onClick = { this.handleCompare }>
                                    <img
                                        alt = 'sort'
                                        className = { compareMethod ? Styles.sortInStart : Styles.sortInEnd }
                                        src = { UpIcon }
                                    />
                                </button>
                            </div>
                        </header>
                        <section>
                            <Form
                                className = { Styles.Form }
                                model = 'forms.newTask'
                                onSubmit = { this.handleSubmit }>
                                <Errors
                                    messages = { {
                                        valid: () =>
                                            `Описание новой задачи должно быть длинной не более 50 символов`,
                                    } }
                                    model = 'forms.newTask.newTaskValue'
                                    show = { ({ submitFailed, touched, errors }) =>
                                        submitFailed || touched && errors.valid
                                    }
                                />
                                <Input
                                    errors = { {
                                        valid: (newTaskValue) => !validateLength(newTaskValue, 50),
                                    } }
                                    errorstyle = { Styles.error }
                                    id = 'forms.newTask.newTaskValue'
                                    model = 'forms.newTask.newTaskValue'
                                    placeholder = 'Описание моей новой задачи'
                                    type = 'text'
                                />
                                <button type = 'submit'>
                                    Добавить задачу
                                </button>
                            </Form>
                            <div className = { Styles.overlay }>
                                <FlipMove
                                    duration = { 300 }
                                    easing = 'ease-out'
                                    typeName = 'ul'>
                                    { showAll }
                                </FlipMove>
                            </div>
                        </section>
                        <footer>
                            <Checkbox
                                inlineBlock
                                checked = { completeAll }
                                color1 = '#000'
                                color2 = '#FFF'
                                onClick = {
                                    !completeAll
                                        ? this.handleCompletedAllTasks
                                        : null
                                }
                            />
                            <span className = { Styles.completeAllTasks }>
                                { completeAll
                                    ? `Jin says: "All your tasks are fulfilled, sir!"`
                                    : `Выполнить все задачи`
                                }
                            </span>
                        </footer>
                    </main>
                </section>
            </div>
        );
    }
}

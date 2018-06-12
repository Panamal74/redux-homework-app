// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Transition } from 'react-transition-group';
import FlipMove from 'react-flip-move';

// Instruments
import { withApi } from "../../components/HOC/withApi";
import { tasksActionsAsync } from "../../bus/tasks/saga/asyncActions";
// import { tasksActions } from "../../bus/tasks/actions";
import Animation from './animation';

// Style
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Task from '../../components/Task';
import Spinner from '../../components/Spinner';
import UpIcon from './image/arrow_upward.svg';


const mapStateToProps = (state) => {
    return {
        //isTasksFetching: state.ui.get('isTasksFetching'),
        tasks: state.tasks,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                fetchTasksAsync: tasksActionsAsync.fetchTaskAsync,
                createTaskAsync: tasksActionsAsync.createTaskAsync,
                removeTaskAsync: tasksActionsAsync.removeTaskAsync,
                changeTaskAsync: tasksActionsAsync.changeTaskAsync,
                // likeTaskAsync:       tasksActionsAsync.likeTaskAsync,
                // unlikeTaskAsync:     tasksActionsAsync.unlikeTaskAsync,
                // completeTaskAsync:   tasksActionsAsync.completeTaskAsync,
                // uncompleteTaskAsync: tasksActionsAsync.uncompleteTaskAsync,
            },
            dispatch,
        ),
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class Scheduler extends Component {
    constructor () {
        super();
        this.handleChangeInputValue = this._handleChangeInputValue.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleInputKeyDown = this._handleInputKeyDown.bind(this);
        this.getRenderTasks = this._getRenderTasks.bind(this);
        this.handleCompare = this._handleCompare.bind(this);
    }
    state = {
        inputValue:    '',
        searchValue:   '',
        duration:      0.3,
        compareMethod: true,
    };

    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }


    _handleChangeInputValue (event) {
        const { checkFieldLength } = this.props;

        this.setState({
            [event.target.name]: checkFieldLength(event.target.value),
        });
    }

    _handleInputKeyDown (event) {
        if (event.keyCode === 13) {
            this.handleSubmit(event);
        }
    }

    _handleSubmit (event) {
        const { actions } = this.props;
        const { inputValue } = this.state;

        event.preventDefault();

        if (inputValue.trim()) {
            actions.createTaskAsync(inputValue);
        }
        this.setState({ inputValue: '' });
    }

    _handleTaskOpen = (task) => {
        const { duration } = this.state;

        Animation.open(task, duration);
    };

    _handleTaskClose = (task) => {
        const { duration } = this.state;

        Animation.close(task, duration);
    };

    _getRenderTasks (showTasks) {
        const { actions, checkFieldLength } = this.props;
        const { duration } = this.state;

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
                        checkFieldLength = { checkFieldLength }
                        doChangeTask = { actions.changeTaskAsync }
                        doRemoveTask = { actions.removeTaskAsync }
                        task = { value }
                    />
                </Transition>
            );
        });
    }

    _handleCompare () {
        const { compareMethod } = this.state;

        this.setState({ compareMethod: !compareMethod });
    }

    render () {
        const {
            tasks,
            isTasksFetching,
            doCompleteAll,
            getFilterTasks,
            getFavoriteTasks,
            getCompletedFavoriteTasks,
            getCompletedOtherTasks,
            getOtherTasks,
        } = this.props;
        const {
            inputValue,
            searchValue,
            compareMethod,
        } = this.state;

        const completeAll = tasks.every((value) => {
            return value.completed === true;
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
                <Spinner isSpinning = { isTasksFetching } />
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
                                    onChange = { this.handleChangeInputValue }
                                />
                                <button
                                    id = 'sortButton'
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
                            <form>
                                <input
                                    name = 'inputValue'
                                    placeholder = 'Описание моей новой задачи'
                                    type = 'text'
                                    value = { inputValue }
                                    onChange = { this.handleChangeInputValue }
                                    onKeyDown = { this.handleInputKeyDown }
                                />
                                <button onClick = { this.handleSubmit }>
                                    Добавить задачу
                                </button>
                            </form>
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
                                        ? doCompleteAll
                                        : null
                                }
                            />
                            <span className = { Styles.completeAllTasks }>
                                { completeAll
                                    ? `Павел Анатольевич, все Ваши задачи выполнены!!!`
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


export default withApi(Scheduler);

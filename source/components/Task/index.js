// Core
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Star from '../../theme/assets/Star';

// Style
import Styles from './styles.m.css';

const mapStateToProps = (state) => {
    return {
        taskEdit: state.ui.get('taskEdit'),
    };
};

@connect(mapStateToProps)
export default class Task extends Component {
    constructor () {
        super();
        this.textInput = React.createRef();
        this.editButtonClick = this._editTask.bind(this);
        this.removeButtonClick = this._removeTask.bind(this);
        this.completeCheckboxClick = this._completeTask.bind(this);
        this.favoriteButtonClick = this._favoriteTask.bind(this);
        this.inputKeyDown = this._inputKeyDown.bind(this);
        this.inputOnBlur = this._inputOnBlur.bind(this);
    }

    componentDidUpdate () {
        const { task, taskEdit } = this.props;
        const id = task.get('id');

        if (id === taskEdit) {
            this.textInput.current.focus();
        }
    }

    _editTask () {
        const { task, doEditTask, taskEdit } = this.props;
        const id = task.get('id');

        id === taskEdit ? doEditTask('') : doEditTask(id);
    }

    _inputOnBlur (event) {
        const { task } = this.props;
        const message = task.get('message');

        if (event.target.value.trim() === '' || event.target.value !== message) {
            event.target.value = message;
        }
        event.target.focus();
    }

    _inputKeyDown (event) {
        const { task, doChangeTask, doEditTask } = this.props;
        const id = task.get('id');
        const message = task.get('message');
        const completed = task.get('completed');
        const favorite = task.get('favorite');

        if (event.keyCode === 13) {
            if (event.target.value !== message) {
                if (event.target.value.trim().length > 0) {
                    doChangeTask({
                        id,
                        "message": event.target.value,
                        completed,
                        favorite,
                    });
                    doEditTask('');
                } else {
                    event.target.value = '';
                }
            } else {
                doEditTask('');
            }
        } else if (event.keyCode === 27) {
            event.target.value = message;
            doEditTask('');
        }
    }

    _removeTask () {
        const { task, doRemoveTask, doEditTask } = this.props;

        doRemoveTask(task.get('id'));
        doEditTask('');
    }

    _completeTask () {
        const { task, doChangeTask } = this.props;
        const id = task.get('id');
        const message = task.get('message');
        const completed = !task.get('completed');
        const favorite = task.get('favorite');

        doChangeTask({
            id,
            message,
            completed,
            favorite,
        });
    }

    _favoriteTask () {
        const { task, doChangeTask } = this.props;
        const id = task.get('id');
        const message = task.get('message');
        const completed = task.get('completed');
        const favorite = !task.get('favorite');

        doChangeTask({
            id,
            message,
            completed,
            favorite,
        });
    }

    render () {
        const { task, taskEdit } = this.props;

        const id = task.get('id');
        const message = task.get('message');
        const completed = task.get('completed');
        const favorite = task.get('favorite');
        const created = task.get('created');
        const modified = task.get('modified');
        const taskStyle = classNames(Styles.task, { [Styles.completed]: completed });
        const disabled = id === taskEdit;
        const dataTimeValue = modified ? modified : created;

        return (
            <li
                className = { taskStyle }
                id = { id }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.complete }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this.completeCheckboxClick }
                    />
                    <div>
                        <input
                            defaultValue = { message }
                            disabled = { !disabled }
                            ref = { this.textInput }
                            type = 'text'
                            onBlur = { this.inputOnBlur }
                            onKeyDown = { this.inputKeyDown }
                        />
                        <span style = { { fontSize: 10 } }>Created / modified: { dataTimeValue }</span>
                    </div>
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        className = { Styles.setPriority }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.favoriteButtonClick }
                    />
                    <Edit
                        checked = { disabled }
                        className = { Styles.edit }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.editButtonClick }
                    />
                    <Remove
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.removeButtonClick }
                    />
                </div>
            </li>
        );
    }
}

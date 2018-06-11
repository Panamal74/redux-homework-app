// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Instruments

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Star from '../../theme/assets/Star';

// Style
import Styles from './styles.m.css';

export default class Task extends Component {
    static propTypes = {
        completed: PropTypes.bool.isRequired,
        favorite:  PropTypes.bool.isRequired,
        id:        PropTypes.string.isRequired,
        message:   PropTypes.string.isRequired,
    };
    constructor () {
        super();
        this.textInput = React.createRef();
        this.editButtonClick = this._editTask.bind(this);
        this.removeButtonClick = this._removeTask.bind(this);
        this.completeCheckboxClick = this._completeTask.bind(this);
        this.favoriteButtonClick = this._favoriteTask.bind(this);
        this.handleChangeInputValue = this._handleChangeInput.bind(this);
        this.inputKeyDown = this._inputKeyDown.bind(this);
    }
    state = {
        disabled: true,
    };

    componentDidUpdate () {
        const { disabled } = this.state;

        if (!disabled) {
            this.textInput.current.focus();
        }
    }

    _editTask () {
        const { disabled } = this.state;
        const { message } = this.props;

        if (!disabled) {
            this.textInput.current.value = message;
        }
        this.setState({ disabled: !disabled });
    }

    _handleChangeInput (event) {
        const { checkFieldLength } = this.props;

        event.target.value = checkFieldLength(event.target.value);
    }

    _inputKeyDown (event) {
        const {
            completed,
            doChangeTask,
            favorite,
            id,
            message,
        } = this.props;

        if (event.keyCode === 13) {
            if (event.target.value !== message) {
                if (event.target.value.trim().length > 0) {
                    doChangeTask({
                        id,
                        "message": event.target.value,
                        completed,
                        favorite,
                    });
                    this.setState({ disabled: true });
                } else {
                    event.target.value = '';
                }
            } else {
                this.setState({ disabled: true });
            }
        } else if (event.keyCode === 27) {
            event.target.value = message;
            this.setState({ disabled: true });
        }
    }

    _removeTask () {
        const { id, doRemoveTask } = this.props;

        doRemoveTask(id);
    }

    _completeTask () {
        const {
            completed,
            doChangeTask,
            favorite,
            id,
            message,
        } = this.props;

        doChangeTask({
            id,
            message,
            "completed": !completed,
            favorite,
        });
    }

    _favoriteTask () {
        const {
            completed,
            doChangeTask,
            favorite,
            id,
            message,
        } = this.props;

        doChangeTask({
            id,
            message,
            completed,
            "favorite": !favorite,
        });
    }

    render () {
        const {
            message,
            completed,
            favorite,
            id,
            created,
            modified,
        } = this.props;
        const {
            disabled,
        } = this.state;

        const taskStyle = classNames(Styles.task, { [Styles.completed]: completed });

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
                            disabled = { disabled }
                            ref = { this.textInput }
                            type = 'text'
                            onChange = { this.handleChangeInputValue }
                            onKeyDown = { this.inputKeyDown }
                        />
                        <span style = { { fontSize: 10 } }>Created / modified: { modified ? modified : created }</span>
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
                        checked = { !disabled }
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

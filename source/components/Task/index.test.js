import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fromJS } from 'immutable';

import Task from './';
import tasksMook from './tasks.json';

configure({ adapter: new Adapter() });

const taskMook = fromJS(tasksMook[0]);

const props = {
    doChangeTask:   () => jest.fn(),
    doEditTask:     () => jest.fn(),
    doRemoveTask:   () => jest.fn(),
    taskEdit:       '',
    validateLength: true,
    task:           taskMook,
};

const result = shallow(
    <Task
        doChangeTask = { props.doChangeTask }
        doEditTask = { props.doEditTask }
        doRemoveTask = { props.doRemoveTask }
        task = { props.task }
        taskEdit = { props.taskEdit }
        validateLength = { props.validateLength }
    />
);

describe('Task component', () => {
    test('Должен содержать 1 li элемент', () => {
        expect(result.find('li')).toHaveLength(1);
    });

    test('Должен содержать 1 Checkbox элемент', () => {
        expect(result.find('withSvg(Checkbox)')).toHaveLength(1);
    });

    test('Должен содержать 1 Star элемент', () => {
        expect(result.find('withSvg(Star)')).toHaveLength(1);
    });

    test('Должен содержать 1 Edit элемент', () => {
        expect(result.find('withSvg(Edit)')).toHaveLength(1);
    });

    test('Должен содержать 1 Remove элемент', () => {
        expect(result.find('withSvg(Remove)')).toHaveLength(1);
    });

    test('Должен содержать 3 div элемент', () => {
        expect(result.find('div')).toHaveLength(3);
    });

    test('Должен содержать 1 input элемент', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('input должен изначально иметь значение message', () => {
        expect(result.find('input').props().defaultValue).toBe(taskMook.get('message'));
    });

    test('Checkbox должен изначально иметь значение completed', () => {
        expect(result.find('withSvg(Checkbox)').props().checked).toBe(taskMook.get('completed'));
    });

    test('Star должен изначально иметь значение favorite', () => {
        expect(result.find('withSvg(Star)').props().checked).toBe(taskMook.get('favorite'));
    });
});

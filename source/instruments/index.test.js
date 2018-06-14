import { List, Map, isImmutable } from 'immutable';

import {
    getDisplayName,
    getFilterTasks,
    getFavoriteTasks,
    getCompletedFavoriteTasks,
    getCompletedOtherTasks,
    getOtherTasks
} from './helpers';

const defaultTasks = List([
    Map({
        id:        '11111',
        message:   'Успешно пройти Redux-интенсив компании Lectrum',
        completed: true,
        favorite:  true,
        created:   '2018-02-01T15:44:34.624Z',
        modified:  '2018-02-01T16:44:34.624Z',

    }),
    Map({
        id:        '22222',
        message:   'Взять автограф у Джареда Лето',
        completed: false,
        favorite:  true,
        created:   '2018-02-02T15:44:34.624Z',
        modified:  '2018-02-02T16:44:34.624Z',

    }),
    Map({
        id:        '33333',
        message:   'Зарегестрировать бабушку в Твиче',
        completed: false,
        favorite:  false,
        created:   '2018-02-03T15:44:34.624Z',
        modified:  '2018-02-03T16:44:34.624Z',

    }),
    Map({
        id:        '44444',
        message:   'Записать собаку на груминг',
        completed: true,
        favorite:  false,
        created:   '2018-02-04T15:44:34.624Z',
        modified:  '2018-02-04T16:44:34.624Z',

    }),
    Map({
        id:        '55555',
        message:   'Научиться играть на барабанах',
        completed: false,
        favorite:  true,
        created:   '2018-02-05T15:44:34.624Z',
        modified:  '2018-02-05T16:44:34.624Z',

    })
]);

describe('Тест функции getDisplayName', () => {
    test('Функция getDisplayName должна возвращать строку', () => {
        expect(typeof getDisplayName({})).toBe('string');
    });

    test('Функция getDisplayName должна возвращать `name`', () => {
        expect(getDisplayName({ displayName: 'name' })).toBe('name');
    });

    test('Функция getDisplayName должна возвращать `name`', () => {
        expect(getDisplayName({ name: 'name' })).toBe('name');
    });

    test('Функция getDisplayName должна возвращать компонент', () => {
        expect(getDisplayName({})).toBe('Component');
    });

    test('Функция getDisplayName не должна возвращать undefined', () => {
        expect(getDisplayName({ displayName: 'name' })).not.toBeUndefined();
    });

    test('Функция getDisplayName не должна возвращать undefined', () => {
        expect(getDisplayName({ name: 'name' })).not.toBeUndefined();
    });

    test('Функция getDisplayName не должна возвращать undefined', () => {
        expect(getDisplayName({})).not.toBeUndefined();
    });
});

describe('Тест функции getFilterTasks', () => {
    test('Первый аргумент функции checkFieldLength должен иметь тип string', () => {
        expect(() => getFilterTasks(1, List())).toThrow('Первый аргумент функции должен иметь тип string');
    });

    test('Второй аргумент функции getFilterTasks должен быть Immutable', () => {
        expect(() => getFilterTasks('str', [])).toThrow('Второй аргумент функции должен быть Immutable');
    });

    test('Функция getFilterTasks не должна возвращать undefined', () => {
        expect(getFilterTasks()).not.toBeUndefined();
    });

    test('Функция getFilterTasks должна возвращать Immutable', () => {
        expect(isImmutable(getFilterTasks())).toBe(true);
    });

    test('Функция getFilterTasks должна возвращать массив объектов', () => {
        expect(typeof getFilterTasks('', defaultTasks)).toBe('object');
    });

    test('Функция getFilterTasks должна возвращать не пустой массив', () => {
        expect(getFilterTasks('', defaultTasks).toJS().length).not.toBe(0);
    });

    test('Функция getFilterTasks должна возвращать массив из трёх элементов', () => {
        expect(getFilterTasks('ба', defaultTasks).toJS().length).toBe(3);
    });
});

describe('Тест функции getFavoriteTasks', () => {
    test('Аргумент функции getFavoriteTasks должен быть Immutable', () => {
        expect(() => getFavoriteTasks('str')).toThrow('Аргумент функции должен быть Immutable');
    });

    test('Функция getFavoriteTasks не должна возвращать undefined', () => {
        expect(getFavoriteTasks()).not.toBeUndefined();
    });

    test('Функция getFavoriteTasks должна возвращать Immutable', () => {
        expect(isImmutable(getFavoriteTasks())).toBe(true);
    });

    test('Функция getFavoriteTasks должна возвращать массив объектов', () => {
        expect(typeof getFavoriteTasks(defaultTasks)).toBe('object');
    });

    test('Функция getFavoriteTasks не должна возвращать пустой массив', () => {
        expect(getFavoriteTasks(defaultTasks).toJS().length).not.toBe(0);
    });

    test('Функция getFavoriteTasks должна возвращать массив из двух элементов', () => {
        expect(getFavoriteTasks(defaultTasks).toJS().length).toBe(2);
    });
});

describe('Тест функции getCompletedFavoriteTasks', () => {
    test('Аргумент функции getCompletedFavoriteTasks должен быть Immutable', () => {
        expect(() => getCompletedFavoriteTasks('str')).toThrow('Аргумент функции должен быть Immutable');
    });

    test('Функция getCompletedFavoriteTasks не должна возвращать undefined', () => {
        expect(getCompletedFavoriteTasks()).not.toBeUndefined();
    });

    test('Функция getCompletedFavoriteTasks должна возвращать Immutable', () => {
        expect(isImmutable(getCompletedFavoriteTasks())).toBe(true);
    });

    test('Функция getCompletedFavoriteTasks должна возвращать массив объектов', () => {
        expect(typeof getCompletedFavoriteTasks(defaultTasks)).toBe('object');
    });

    test('Функция getCompletedFavoriteTasks не должна возвращать пустой массив', () => {
        expect(getCompletedFavoriteTasks(defaultTasks).toJS().length).not.toBe(0);
    });

    test('Функция getCompletedFavoriteTasks должна возвращать массив из одного элемента', () => {
        expect(getCompletedFavoriteTasks(defaultTasks).toJS().length).toBe(1);
    });
});

describe('Тест функции getCompletedOtherTasks', () => {
    test('Аргумент функции getCompletedOtherTasks должен быть Immutable', () => {
        expect(() => getCompletedOtherTasks('str')).toThrow('Аргумент функции должен быть Immutable');
    });

    test('Функция getCompletedOtherTasks не должна возвращать undefined', () => {
        expect(getCompletedOtherTasks()).not.toBeUndefined();
    });

    test('Функция getCompletedOtherTasks должна возвращать Immutable', () => {
        expect(isImmutable(getCompletedOtherTasks())).toBe(true);
    });

    test('Функция getCompletedOtherTasks должна возвращать массив объектов', () => {
        expect(typeof getCompletedOtherTasks(defaultTasks)).toBe('object');
    });

    test('Функция getCompletedOtherTasks не должна возвращать пустой массив', () => {
        expect(getCompletedOtherTasks(defaultTasks).toJS().length).not.toBe(0);
    });

    test('Функция getCompletedOtherTasks должна возвращать массив из одного элемента', () => {
        expect(getCompletedOtherTasks(defaultTasks).toJS().length).toBe(1);
    });
});

describe('Тест функции getOtherTasks', () => {
    test('Аргумент функции getOtherTasks должен быть Immutable', () => {
        expect(() => getOtherTasks('str')).toThrow('Аргумент функции должен быть Immutable');
    });

    test('Функция getOtherTasks не должна возвращать undefined', () => {
        expect(getOtherTasks()).not.toBeUndefined();
    });

    test('Функция getOtherTasks должна возвращать Immutable', () => {
        expect(isImmutable(getOtherTasks())).toBe(true);
    });

    test('Функция getOtherTasks должна возвращать массив объектов', () => {
        expect(typeof getOtherTasks(defaultTasks)).toBe('object');
    });

    test('Функция getOtherTasks не должна возвращать пустой массив', () => {
        expect(getOtherTasks(defaultTasks).toJS().length).not.toBe(0);
    });

    test('Функция getOtherTasks должна возвращать массив из одного элемента', () => {
        expect(getOtherTasks(defaultTasks).toJS().length).toBe(1);
    });
});

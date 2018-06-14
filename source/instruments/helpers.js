import { List, isImmutable } from 'immutable';

export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function compareItemsByDateASC (a, b) {
    const firstCompareElement = a.get('modified') ? Date.parse(a.get('modified')) : Date.parse(a.get('created'));
    const secondCompareElement = b.get('modified') ? Date.parse(b.get('modified')) : Date.parse(b.get('created'));

    return secondCompareElement - firstCompareElement;
}

function compareItemsByDateDESC (a, b) {
    const firstCompareElement = a.get('modified') ? Date.parse(a.get('modified')) : Date.parse(a.get('created'));
    const secondCompareElement = b.get('modified') ? Date.parse(b.get('modified')) : Date.parse(b.get('created'));

    return firstCompareElement - secondCompareElement;
}

export function getFilterTasks (searchValue = '', tasks = List()) {
    if (typeof searchValue !== "string") {
        throw new Error("Первый аргумент функции должен иметь тип string");
    } else if (!isImmutable(tasks)) {
        throw new Error("Второй аргумент функции должен быть Immutable");
    }

    let returnValue = [];

    if (searchValue) {
        returnValue = tasks.filter((value) =>
            value.get('message').toUpperCase().indexOf(searchValue.toUpperCase()) !== -1
        );
    } else {
        returnValue = tasks;
    }

    return returnValue;
}

export function getFavoriteTasks (filterTasks = List(), method = true) {
    if (!isImmutable(filterTasks)) {
        throw new Error("Аргумент функции должен быть Immutable");
    }

    return filterTasks.filter((value) =>
        value.get('favorite') === true && value.get('completed') === false
    ).sort(method ? compareItemsByDateASC : compareItemsByDateDESC);
}

export function getCompletedFavoriteTasks (filterTasks = List(), method = true) {
    if (!isImmutable(filterTasks)) {
        throw new Error("Аргумент функции должен быть Immutable");
    }

    return filterTasks.filter((value) =>
        value.get('completed') === true && value.get('favorite') === true
    ).sort(method ? compareItemsByDateASC : compareItemsByDateDESC);
}

export function getCompletedOtherTasks (filterTasks = List(), method = true) {
    if (!isImmutable(filterTasks)) {
        throw new Error("Аргумент функции должен быть Immutable");
    }

    return filterTasks.filter((value) =>
        value.get('completed') === true && value.get('favorite') === false
    ).sort(method ? compareItemsByDateASC : compareItemsByDateDESC);
}

export function getOtherTasks (filterTasks = List(), method = true) {
    if (!isImmutable(filterTasks)) {
        throw new Error("Аргумент функции должен быть Immutable");
    }

    return filterTasks.filter((value) =>
        value.get('completed') === false && value.get('favorite') === false
    ).sort(method ? compareItemsByDateASC : compareItemsByDateDESC);
}

export const validateLength = (text = '', maxLength = 50) =>
    text.length <= maxLength;

export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function compareItemsByDateASC (a, b) {
    const firstCompareElement = a.modified ? Date.parse(a.modified) : Date.parse(a.created);
    const secondCompareElement = b.modified ? Date.parse(b.modified) : Date.parse(b.created);

    return secondCompareElement - firstCompareElement;
}

function compareItemsByDateDESC (a, b) {
    const firstCompareElement = a.modified ? Date.parse(a.modified) : Date.parse(a.created);
    const secondCompareElement = b.modified ? Date.parse(b.modified) : Date.parse(b.created);

    return firstCompareElement - secondCompareElement;
}

export function getFilterTasks (searchValue = '', tasks = []) {
    // if (typeof searchValue !== "string") {
    //     throw new Error("Первый аргумент функции должен иметь тип string");
    // } else if (!Array.isArray(tasks)) {
    //     throw new Error("Второй аргумент функции должен иметь тип array");
    // }

    let returnValue = [];

    if (searchValue) {
        returnValue = tasks.filter((value) =>
            value.message.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1
        );
    } else {
        returnValue = tasks;
    }

    return returnValue;
}

export function getFavoriteTasks (filterTasks = [], method = true) {
    // if (!Array.isArray(filterTasks)) {
    //     throw new Error("Аргумент функции должен иметь тип array");
    // }

    return filterTasks.filter((value) =>
        value.favorite === true && value.completed === false
    ).sort(method ? compareItemsByDateASC : compareItemsByDateDESC);
}

export function getCompletedFavoriteTasks (filterTasks = [], method = true) {
    // if (!Array.isArray(filterTasks)) {
    //     throw new Error("Аргумент функции должен иметь тип array");
    // }

    return filterTasks.filter((value) =>
        value.completed === true && value.favorite === true
    ).sort(method ? compareItemsByDateASC : compareItemsByDateDESC);
}

export function getCompletedOtherTasks (filterTasks = [], method = true) {
    // if (!Array.isArray(filterTasks)) {
    //     throw new Error("Аргумент функции должен иметь тип array");
    // }

    return filterTasks.filter((value) =>
        value.completed === true && value.favorite === false
    ).sort(method ? compareItemsByDateASC : compareItemsByDateDESC);
}

export function getOtherTasks (filterTasks = [], method = true) {
    // if (!Array.isArray(filterTasks)) {
    //     throw new Error("Аргумент функции должен иметь тип array");
    // }

    return filterTasks.filter((value) =>
        value.get('completed') === false && value.get('favorite') === false
    ).sort(method ? compareItemsByDateASC : compareItemsByDateDESC);
}

export function checkFieldLength (value = '', maxLength = 50) {
    // if (typeof value !== "string") {
    //     throw new Error("Первый аргумент функции должен иметь тип string");
    // } else if (typeof maxLength !== "number") {
    //     throw new Error("Второй аргумент функции должен иметь тип number");
    // }

    return value.length > maxLength
        ? value.slice(0, maxLength)
        : value;
}

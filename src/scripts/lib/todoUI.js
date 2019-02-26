const todoUI = (function () {

    let newToDo = {
        title: null,
        category: null
    }
    let todoHolder = null;
    let todoCounter = null;
    let todoAddButton = null;

    const setup = function ({ titleClass, categoryClass, todoHolderClass, todoCounterClass, todoAddClass }) {

        newToDo.title = document.querySelector(titleClass);
        newToDo.category = document.querySelector(categoryClass);
        todoHolder = document.querySelector(todoHolderClass);
        todoCounter = document.querySelector(todoCounterClass);
        todoAddButton = document.querySelector(todoAddClass);

        if (!(todoHolder && todoCounter && newToDo.title && newToDo.category && todoAddButton))
            throw new Error("holders zijn niet goed aangemaakt");

        return true

    }
    const handleNewTodo = function (callback) {
        todoAddButton.addEventListener('click', function () {
            callback(newToDo.title.value, newToDo.category.value);
        });


    }

    const appendTodo = function (DOMNode) {
        console.log(DOMNode);
        todoHolder.append(DOMNode);
    }

    const updateCounter = function (total) {
        todoCounter.innerHTML = total
    }
    return {
        setup: setup,
        handleNewTodo: handleNewTodo,
        appendTodo: appendTodo,
        updateCounter: updateCounter
    }
})();


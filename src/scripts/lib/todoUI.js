const todoUI = (function () {

    let newToDo = {
        title: null,
        category: null
    }
    let todoHolder = null;
    let todoCounter = null;
    let todoAddButton = null;
    let nameHolder = null;

    const setup = function ({ titleClass, categoryClass, todoHolderClass, todoCounterClass, todoAddClass, nameClass }) {

        newToDo.title = document.querySelector(titleClass);
        newToDo.category = document.querySelector(categoryClass);
        todoHolder = document.querySelector(todoHolderClass);
        todoCounter = document.querySelector(todoCounterClass);
        todoAddButton = document.querySelector(todoAddClass);
        nameHolder = document.querySelector(nameClass);

        if (!(todoHolder && todoCounter && newToDo.title && newToDo.category && todoAddButton && nameHolder))
            throw new Error("holders zijn niet goed aangemaakt");

        return true

    }
    const handleNewTodo = function (callback) {
        todoAddButton.addEventListener('click', function () {
            callback(newToDo.title.value, newToDo.category.value);
        });
    }

    const handleNewName = function (callback) {
        nameHolder.addEventListener('focusout', function () {
            callback(this.innerText);
        })
        nameHolder.addEventListener('keypress', function (e) {
            if (e.which === 13)
                e.preventDefault();
        })
    }

    const showUserName = function (userName) {
        nameHolder.innerText = userName;
    }
    const appendTodo = function (DOMNode) {
        todoHolder.append(DOMNode);
    }

    const updateCounter = function (total) {
        todoCounter.innerHTML = total
    }
    return {
        setup: setup,
        handleNewTodo: handleNewTodo,
        appendTodo: appendTodo,
        updateCounter: updateCounter,
        handleNewName: handleNewName,
        showUserName: showUserName
    }
})();


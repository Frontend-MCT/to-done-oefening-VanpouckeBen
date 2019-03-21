///revealing module pattern

//module with self-evocing function 
const dataAccess = (function () {
    let todoList = []
    let id = 0;
    let userName = "Marty";
    const todoListName = "todoList"
    const user = "user";

    const newUserName = function (newUserName) {
        //set local variable
        userName = newUserName;
        //voeg toe aan local storage
        localStorage.setItem(user, JSON.stringify(userName));
    }

    const retrieveUserName = function () {
        //haal user variabele op uit local storage
        userName = JSON.parse(localStorage.getItem(user));

        //indien null of lege string -> default en stop in local storage
        if (!userName || userName == "") {
            userName = "Marty";
            localStorage.setItem(user, JSON.stringify(userName));
        }

        //geef user name terug 
        return userName;
    }

    const createTodo = function (todo) {
        //todo id opvullen id
        todo.id = id++;

        //update list
        todoList.push(todo);

        //voeg toe aan local storage
        localStorage.setItem(todoListName, JSON.stringify(todoList));

        //pas counter aan
        todoUI.updateCounter(todoList.length);

        //return
        return todo

    }
    const retrieveTodo = function (params) {
        todoList = JSON.parse(localStorage.getItem(todoListName));
        todoList = todoList ? todoList : [];
        id = todoList != null ? todoList.length + 1 : 0
        counter = todoList != null ? todoUI.updateCounter(todoList.length) : 0;
        return todoList;
    }

    const updateTodo = function (id) {
        //wijzig object in lijst      
        let todo = todoList.find(t => t.id === id);

        //wijsig status
        todo.status = !todo.status

        //wijzig local storage
        localStorage.setItem(todoListName, JSON.stringify(todoList));

        //notification

    }
    const deleteTodo = function (todo) {
        //remove object from list
        todoList = todoList.filter(t => t.id !== todo.id);

        //wijzig local storage
        localStorage.setItem(todoListName, JSON.stringify(todoList));

        //pas counter aan
        todoUI.updateCounter(todoList.length);

        //notfications

    }
    return {
        createTodo: createTodo,
        retrieveTodo: retrieveTodo,
        updateTodo: updateTodo,
        deleteTodo: deleteTodo,
        newUserName: newUserName,
        retrieveUserName: retrieveUserName
    }



})();
///revealing module pattern

//module with self-evocing function 
const dataAccess = (function () {
    let todoList = []
    let id = 0;
    const todoListName = "todoList"


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

    }
    const updateTodo = function (id) {
        //wijzig object in lijst
        todo = todoList.find(t => t.id === id);

        //wijsig status
        todo.status = !todo.status

        //wijzig local storage
        localStorage.setItem(todoListName, JSON.stringify(todoList));

        //notification

    }
    const deleteTodo = function (params) {
        //remove object from list

        //wijzig local storage

        //pas counter aan

        //notfications

    }
    return {
        createTodo: createTodo,
        retrieveTodo: retrieveTodo,
        updateTodo: updateTodo,
        deleteTodo: deleteTodo
    }



})();
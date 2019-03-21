const todoModule = (function () {
    const addToDo = function (title, category) {

        if (!title)
            return


        //todo aan maken
        let todo = new Todo({
            title: title,
            category: category,
            status: false
        });

        //toevoegen aan local storage
        todo = dataAccess.createTodo(todo);

        //toevoegen aan dom
        todoUI.appendTodo(todo.generateDOMNode());
    }

    const retrieveTodos = function () {

        let todos = dataAccess.retrieveTodo();
        if (!todos)
            return

        if (todos.length > 0) {
            for (const todo of todos) {
                let tempTodo = new Todo({
                    title: todo.title, category: todo.category,
                    status: todo.status, id: todo.id
                })
                todoUI.appendTodo(tempTodo.generateDOMNode())
            }
        }

    }

    const updateUserName = function (userName) {
        dataAccess.newUserName(userName);
    }

    const retrieveUserName = function () {
        userName = dataAccess.retrieveUserName();
        todoUI.showUserName(userName);
    }
    return {
        addToDo: addToDo,
        retrieveTodos: retrieveTodos,
        updateUserName: updateUserName,
        retrieveUserName: retrieveUserName
    }
})();
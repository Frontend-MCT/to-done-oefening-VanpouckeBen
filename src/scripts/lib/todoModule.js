const todoModule = (function () {
    const addToDo = function (title, category) {
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
    return {
        addToDo: addToDo
    }
})();
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
class Todo {
    constructor({ title, category, status, id }) {
        Object.assign(this, { title, category, status, id })

        //make html to html string
        Todo.prototype.generateDOMNode = function () {

            //aanmaken card
            let card = document.createElement("div");
            card.className = "c-card";

            //aanmaken list
            let list = document.createElement('ul');
            list.className = "o-list c-option-list";

            //aanmaken listitem
            let listItem = document.createElement("li");
            listItem.className = "c-form-field c-form-field--option c-option-list__item"

            //aanmaken checkbox
            let checkboxInput = document.createElement("input");
            checkboxInput.className = "o-hide c-input-option c-custom-input-option-hidden";
            checkboxInput.type = "checkbox";
            checkboxInput.id = "checkbox-" + this.id;
            checkboxInput.checked = this.status;

            //update todo
            const updateTodo = () => {
                dataAccess.updateTodo(this.id);

            }
            checkboxInput.addEventListener('change', updateTodo)



            let checkboxLabel = document.createElement("label")
            checkboxLabel.className = "c-label c-custom-input-option-label";
            checkboxLabel.setAttribute("for", `checkbox-${this.id}`)



            checkboxLabel.innerHTML = `
            <span class="c-custom-input-option c-custom-input-option--checkbox">
                <svg class="c-custom-input-option__symbol" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 9 6.75">
                    <path
                        d="M4.75,9.5a1,1,0,0,1-.707-.293l-2.25-2.25A1,1,0,1,1,3.207,5.543L4.75,7.086,8.793,3.043a1,1,0,0,1,1.414,1.414l-4.75,4.75A1,1,0,0,1,4.75,9.5"
                        transform="translate(-1.5 -2.75)" />
                </svg>
            </span>
            <div class="c-card-info">
                <div class="c-card-info__title">
                    ${title}
                </div>
                <div class="c-card-info__category">
                    ${category}
                </div>

            </div>`
            //list item vullen.
            listItem.append(checkboxInput);
            listItem.append(checkboxLabel);

            //list item in list stoppen
            list.append(listItem);
            //list in card stoppen
            card.append(list);

            //return card
            return card;



        }
    }
}
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


(async function () {
    console.log("Welcome 🤡");

    document.addEventListener('DOMContentLoaded', function () {
        if (todoUI.setup({
            titleClass: '.js-new-title',
            categoryClass: '.js-new-category',
            todoHolderClass: '.js-todoHolder',
            todoCounterClass: '.js-total-todo',
            todoAddClass: '.js-button-add',
            nameClass: '.js-username'
        })) {
            //haal op uit local storage
            todoModule.retrieveTodos();
            todoModule.retrieveUserName();

            //handle new to do and new user name
            todoUI.handleNewTodo(function (title, category) {
                //te veel werk voor ons; moet in het model komen en ook nog in sync zijn met onze soort van 'backend' : localstorage.
                todoModule.addToDo(title, category);
            })

            todoUI.handleNewName(function (userName) {
                todoModule.updateUserName(userName);
            });
        }
    })

})();
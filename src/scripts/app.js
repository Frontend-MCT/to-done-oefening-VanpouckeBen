(async function () {
    console.log("Welcome 🤡");

    document.addEventListener('DOMContentLoaded', function () {
        if (todoUI.setup({
            titleClass: '.js-new-title',
            categoryClass: '.js-new-category',
            todoHolderClass: '.js-todoHolder',
            todoCounterClass: '.js-total-todo',
            todoAddClass: '.js-button-add'
        })) {
            todoModule.retrieveTodos();
            todoUI.handleNewTodo(function (title, category) {
                //te veel werk voor ons; moet in het model komen en ook nog in sync zijn met onze soort van 'backend' : localstorage.
                todoModule.addToDo(title, category);
            })
        }
    })

})();
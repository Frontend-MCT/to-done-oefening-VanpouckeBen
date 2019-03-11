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
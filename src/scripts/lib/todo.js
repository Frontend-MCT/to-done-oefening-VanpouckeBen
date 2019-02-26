class Todo {
    constructor({ title, category, status, id }) {
        Object.assign(this, { title, category, status, id })

        //make html to html string
        Todo.prototype.generateDOMNode = function () {

            let card = document.createElement("div");
            card.className = "c-card";
            card.innerHTML = `
            
            <ul class="o-list c-option-list">
                <li class="c-form-field c-form-field--option c-option-list__item">
                    <input class="o-hide c-input-option c-custom-input-option-hidden" type="checkbox" id="checkbox-${this.id}"
                        ${this.status ? 'checked' : ''}>
                    <label class="c-label c-custom-input-option-label" for="checkbox-${this.id}">
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

                        </div>
                    </label>
                </li>
            </ul>


            `
            return card;
        }
    }
}
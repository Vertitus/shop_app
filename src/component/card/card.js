import { DivInint } from "../../common/div_init.js";
import "./card.css"

export class Card extends DivInint {

    constructor(card) {
        super();
        this.card = card;
    }

    search() {
        const value = this.el.querySelector('.input').value;
        this.state.searchQuery = value;
    }

    render() {
        this.el.classList.add('card');
        this.el.innerHTML = `
            <img src="${this.card.images[0]}" class = "card__image"/>
            <div>
                <div class ="card__title">${this.card.title}</div>
                <div class ="card__brand">${this.card.brand}</div>
                <div class ="card__description">${this.card.description}</div>
                <div class ="card__price">${this.card.price}</div>
            </div>
        `

        return this.el;
    }

}
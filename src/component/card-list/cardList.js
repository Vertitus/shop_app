import { DivInint } from "../../common/div_init.js";
import { Card } from "../card/card.js";
import "./cardList.css"

export class CardList extends DivInint {

    constructor(state) {
        super();
        this.state = state;
    }

    search() {
        const value = this.el.querySelector('.input').value;
        this.state.searchQuery = value;
    }

    render() {
        this.el.classList.add('card_list');
        const cardList = document.createElement('div');
        cardList.classList.add('card_grid')
        this.el.append(cardList)
        for (const product of this.state.list) {
            cardList.append(new Card(product).render())
        }
        return this.el;
    }

}
import { DivInint } from "../../common/div_init.js";
import { Card } from "../card/card.js";
import "./cardList.css"

export class CardList extends DivInint {

    constructor(state, appState) {
        super();
        this.state = state;
        this.appState = appState;
    }


    render() {
        if (this.state.loading) {
            this.el.innerHTML = `<div class = card_list__loader></div>`;
            return this.el;
        }
        this.el.classList.add('card_list');
        const cardList = document.createElement('div');
        cardList.classList.add('card_grid')
        this.el.append(cardList)
        for (const product of this.state.list) {
            cardList.append(new Card(product, this.appState).render())
        }
        return this.el;
    }

}
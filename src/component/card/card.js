import { DivInint } from "../../common/div_init.js";
import "./card.css"

export class Card extends DivInint {

    constructor(card, appState) {
        super();
        this.card = card;
        this.appState = appState;
    }

    #addToShopBucket() {
        this.appState.shopBucket.push(this.card)
    }

    #deleteFromShopBucket() {
        this.appState.shopBucket = this.appState.shopBucket.filter(b => b.id !== this.card.id)
    }


    render() {

        const existInFavorites = this.appState.shopBucket.find(b => b.id === this.card.id);

        this.el.classList.add('card');
        this.el.innerHTML = `
            <img src="${this.card.images[0]}" class = "card__image"/>
            <div class ="card__full_description">
                <div class ="card__title">${this.card.title}</div>
                <div class ="card__brand">${this.card.brand}</div>
                <div class ="card__description">${this.card.description}</div>
                <div class ="card__price">${this.card.price}</div>

                <div class ="card__event">
                    <button class ="card__favorite">
                        <img src="./static/favorite-white.svg">
                    </button>
                    <button class ="card__buy">
                        Buy now
                    </button>
                </div>
            </div>
        `

        if (existInFavorites) {
            this.el.querySelector('.card__favorite').addEventListener('click', this.#deleteFromShopBucket.bind(this))
            const button = this.el.querySelector('.card__favorite');
            button.classList.toggle('card__favorite_active');
        } else {
            this.el.querySelector('.card__favorite').addEventListener('click', this.#addToShopBucket.bind(this));
            const button = this.el.querySelector('.card__favorite');
        }

        return this.el;
    }

}
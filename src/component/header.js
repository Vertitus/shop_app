import { DivInint } from "../common/div_init.js";
import "./header.css"

export class Header extends DivInint {

    constructor(appState) {
        super();
        this.appState = appState;
    }

    render() {
        this.el.classList.add('header');
        this.el.innerHTML = `
            <div class ="header__wrapper">
                <img src = "./static/logo.svg" alt = "logo">
                <div class ="header__menu">
                    <a href ="#" class="header__search">
                        <img src ="./static/search.svg" alt = "search">
                        Поиск
                    </a>
                    <a href ="#shop-bucket" class = "shop_bucket">
                        <img src ="./static/favorites.svg" alt = "search">
                        Корзина
                        <div class = "counter">${this.appState.shopBucket.length}</div>
                    </a>
                </div>
            </div>
        `
        return this.el;
    }

}
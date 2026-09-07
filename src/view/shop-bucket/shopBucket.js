import { AbstractView } from "../../common/abstract_view.js";
import { Header } from "../../component/header.js";
import { CardList } from "../../component/card-list/cardList.js";
import onChange from "on-change";

export class ShopBucketView extends AbstractView {
    

    constructor(appState) {
        super();
        this.appState = appState;
        console.log('MainView получил appState:', this.appState);
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle('Главная страница');;
    }


    appStateHook(path) {
        if(path === 'shopBucket') {
            this.render();
        }
    }


    render() {
        const main = document.createElement('div');
        this.app.innerHTML = '';
        main.innerHTML = `
            <h1>Корзина</h1>
        `
        main.append(new CardList({list: this.appState.shopBucket}, this.appState).render())
        
        
        
        this.app.append(main)
        this.renderHeader();
    }
   
    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }


}


import { AbstractView } from "../../common/abstract_view.js";
import { Header } from "../../component/header.js";
import { CardList } from "../../component/card-list/cardList.js";
import { ProductMain } from "../../component/productMain/productMain.js";
import onChange from "on-change";

export class ProductView extends AbstractView {
    

    state = {
        list: [],
    }

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
        main.append(new ProductMain().render())
        this.app.append(main)
        this.renderHeader();
    }
   
    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }


}


import { AbstractView } from "../common/abstract_view.js";
import { CardList } from "../component/card-list/cardList.js";
import { Header } from "../component/header.js";
import { Search } from "../component/search/search.js";
import onChange from "on-change";

export class MainView extends AbstractView {
    

    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        offset: 0
    }

    constructor(appState) {
        super();
        this.appState = appState;
        console.log('MainView получил appState:', this.appState);
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle('Главная страница');;
    }


    appStateHook(path) {
        if(path === 'shopBucket') {
            this.render();
        }
    }

    async stateHook(path) {
        if (path === 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery);
            this.state.list = data.products;
            this.state.loading = false;
            console.log(data)
            
        } 
        if (path === 'list' || path === 'loading') {
            this.render();
        }
    }


    async loadList(q) {
        try {
            const url = q 
                ? `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`
                : `https://dummyjson.com/products`;
            const res = await fetch(url);
            return res.json();
        } catch (error) {
            return new Error(error);
            return null;
        }
    }

    render() {
        const main = document.createElement('div');
        this.app.innerHTML = '';
        main.append(new Search(this.state).render());
        main.append(new CardList(this.state, this.appState).render())
        this.app.append(main)
        this.renderHeader();
    }
   
    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }


}


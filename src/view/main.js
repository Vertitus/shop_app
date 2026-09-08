import { AbstractView } from "../common/abstract_view.js";
import { CardList } from "../component/card-list/cardList.js";
import { Header } from "../component/header.js";
import { Search } from "../component/search/search.js";
import onChange from "on-change";
import { TagList } from "../component/tagList/tagList.js";

export class MainView extends AbstractView {
    

    state = {
        list: [],
        loading: false,
        searchQuery: undefined,
        currentTag: undefined,
        offset: 0,
        category: []
    }

    constructor(appState) {
        super();
        this.appState = appState;
        console.log('MainView получил appState:', this.appState);
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle('Главная страница');

        this.loadTags();
    }


    async loadTags() {
        try {
            const res = await fetch('https://dummyjson.com/products/category-list');
            if (!res.ok) {
                throw new Error(`Ошибка сервера: ${res.status}`);
            }
            const categories = await res.json(); 
            this.state.category = categories;
            console.log('Категории успешно загружены:', this.state.category);
        } catch (error) {
            console.error('Ошибка загрузки категорий:', error);
        }
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
        } 

        if (path === 'currentTag') {
            this.state.loading = true;
            let data;
            if (this.state.currentTag) {
                data = await this.loadListByTag(this.state.currentTag);
            } else {
                data = await this.loadList(); 
            }
            if (data && data.products) {
                this.state.list = data.products;
            }
            this.state.loading = false;
        }

        if (path === 'list' || path === 'loading' || path === 'category') {
            this.render();
        }
    }


    async loadListByTag(category) {
        if (!category) return null;
        try {
            const url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Ошибка сервера: ${res.status}`);
            }

            return res.json();
        } catch (error) {
            console.error(error);
            return null;
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
        main.append(new TagList(this.state, this.appState).render())
        main.append(new CardList(this.state, this.appState).render())
        this.app.append(main)
        this.renderHeader();
    }
   
    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }


}


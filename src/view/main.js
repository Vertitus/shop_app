import { AbstractView } from "../common/abstract_view.js";
import { CardList } from "../component/card-list/cardList.js";
import { Header } from "../component/header.js";
import { Search } from "../component/search/search.js";
import onChange from "on-change";
import { TagList } from "../component/tagList/tagList.js";
import { Pagination } from "../component/pagination/pagination.js";

export class MainView extends AbstractView {
    

    state = {
        list: [],
        total: 0,
        loading: false,
        searchQuery: undefined,
        currentTag: undefined,
        limit: 9,
        skip: 0,
        page: 0,
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
            const data = await this.loadList(this.state.searchQuery, this.state.limit, this.state.skip);
            this.state.list = data.products;
            this.state.total = data.total;
            console.log(this.state.list)
            this.state.loading = false;    
        } 

        if (path === 'currentTag') {
            this.state.loading = true;
            let data;
            if (this.state.currentTag) {
                data = await this.loadListByTag(this.state.currentTag, this.state.limit, this.state.skip);
            } else {
                data = await this.loadList(); 
            }
            if (data && data.products) {
                this.state.list = data.products;
            }
            this.state.total = data.total;
            this.state.loading = false;
        }

        if(path === 'page') {
            this.state.skip = this.state.page * 9; 
        }

        if (path === 'skip') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.limit, this.state.skip);
            this.state.list = data.products;
            this.state.loading = false;
        }

        if (path === 'currentTag' || path === 'searchQuery') {
           this.state.page = 0;
           this.state.skip = 0;
           this.render();
        }

        if (path === 'list' || path === 'loading' || path === 'category' || path === 'page' || path === 'skip') {
            this.render();
        }
    }


    async loadListByTag(category, limit, skip) {
        if (!category) return null;
        try {
            const url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
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

    async loadList(q, limit, skip) {
        try {
            const url = q 
                ? `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}?limit=${limit}&skip=${skip}`
                : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
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
        main.append(new Pagination(this.state, this.appState).render())
        this.app.append(main)
        this.renderHeader();
    }
   
    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

    

}


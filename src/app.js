import { MainView } from "./view/main.js";
import { ProductView } from "./view/productView/productView.js";
import { ShopBucketView } from "./view/shop-bucket/shopBucket.js";


class App {

    routes = [
        {path: "", view: MainView},
        {path: "#shop-bucket", view: ShopBucketView},
        {path: `#${currentID}`, view: ProductView}

    ]

    ids = [];

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.route();
        this.loadIDs();
        console.log(this.ids)
    }

    appState = {
        shopBucket: [],
        currentID: undefined
    }

    async loadIDs() {
        const data = await this.loadProducts();
        data.products.forEach(el => {
            this.ids.push(el.id)
        })
    }

    async loadProducts() {
        const data = await fetch('https://dummyjson.com/products');
        const res = data.json();
        return res;
    }

    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }
        const view = this.routes.find(r => r.path == location.hash).view;
        this.currentView = new view(this.appState);
        this.currentView.render();
    }

}

new App();
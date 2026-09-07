import { MainView } from "./view/main.js";
import { ShopBucketView } from "./view/shop-bucket/shopBucket.js";


class App {

    routes = [
        {path: "", view: MainView},
        {path: "#shop-bucket", view: ShopBucketView}
    ]


    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.route()
    }

    appState = {
        shopBucket: [],
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
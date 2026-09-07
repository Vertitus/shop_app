import { MainView } from "./view/main.js";


class App {

    routes = [
        {path: "", view: MainView}
    ]


    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));
        this.route()
    }

    appState = {
        shopBucked: [],
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
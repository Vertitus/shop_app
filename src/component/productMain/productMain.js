import { DivInint } from "../../common/div_init.js";
import "./productMain.css"

export class ProductMain extends DivInint {

    constructor(state, appState) {
        super();
        this.state = state;
        this.appState = appState;
    }


    render() {
        this.el.classList.add('div');
        this.el.innerHTML = `
            <img src="${this.state.list[this.appState.currentID].image[0]}">
        `
        return this.el;
    }

}
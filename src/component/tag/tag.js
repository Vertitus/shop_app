import { DivInint } from "../../common/div_init.js";
import "./tag.css"

export class Tag extends DivInint {

    constructor(category, appState, state) {
        super();
        this.category = category;
        this.appState = appState;
        this.state = state;
    }



    render() {

        const isActive = this.state.currentTag === this.category;
        const activeClass = isActive ? 'tag__button_active' : '';

        this.el.classList.add('tag');
        this.el.innerHTML = `
            <button class ="tag__button ${activeClass}">${this.category}</button>
        `
        this.el.querySelector('.tag__button').addEventListener('click', () => {
            if (this.state.currentTag === this.category) {
                this.state.currentTag = undefined;
            } else {
                this.state.currentTag = this.category;
            }
        })
        return this.el;
    }

}
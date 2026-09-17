import { DivInint } from "../../common/div_init.js";
import "./pagination.css"

export class Pagination extends DivInint {

    constructor(state, appState) {
        super();
        this.state = state;
        this.appState = appState;
    }


    render() {
        const activeClass = this.state.page === 0 ? "button__hidden" : '';
        const isLastPage = (this.state.page + 1) * this.state.limit >= this.state.total;
        const nextActiveClass = isLastPage ? "button__hidden" : '';
        this.el.classList.add('pagination')
        this.el.innerHTML = `
                <button class = "pagination__button back ${activeClass}">Previous</button>
                <button class = "pagination__button next ${nextActiveClass}">Next</button>
        `
        this.el.querySelector('.next').addEventListener('click', () => this.state.page++)
        this.el.querySelector('.back').addEventListener('click', () => this.state.page--)
        return this.el;
    }

}
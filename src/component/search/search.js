import { DivInint } from "../../common/div_init.js";
import "./search.css"

export class Search extends DivInint {

    constructor(state) {
        super();
        this.state = state;
    }

    search() {
        const value = this.el.querySelector('.input').value;
        this.state.searchQuery = value;
    }

    render() {
        this.el.classList.add('search');
        this.el.innerHTML = `
            <input 
                type="text"
                placeholder="search"    
                class ="input"
            />
            <button><img src ="./static/search.svg" /></button>
        `
        this.el.querySelector('button').addEventListener('click', () => this.search())
        this.el.querySelector('.input').addEventListener('keydown', (event) => {
            if(event.key === 'Enter') {
                this.search();
            }
        })

        return this.el;
    }

}
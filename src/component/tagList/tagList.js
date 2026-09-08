import { DivInint } from "../../common/div_init.js";
import { Tag } from "../tag/tag.js";
import './tagList.css'


export class TagList extends DivInint {

    constructor(state, appState) {
        super();
        this.state = state;
        this.appState = appState;
    }


    render() {

        this.el.classList.add('tag_list');
        const cardList = document.createElement('div');
        cardList.classList.add('tag_grid')
        this.el.append(cardList)
        for (const category of this.state.category) {
            cardList.append(new Tag(category, this.appState, this.state).render())
        }
        return this.el;
    }

}
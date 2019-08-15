import React from 'react';
import {
    getBookChapterCount
} from '../../helpers/bibleHelper';
import { StateContext } from "./../../State"
import { selectChapter } from "../../modules/homeIndexData"

import './ChapterSelector.css';

export default class ChapterSelector extends React.Component {
    onChapterChange = (event) => {
        // const [ { homeIndexData }, dispatch ] = this.context;
        const dispatch = this.context[1];
        dispatch(selectChapter(parseInt(event.target.value)));
    }

    bookChapters = () => {
        const [ { homeIndexData } ] = this.context;

        const count = getBookChapterCount(homeIndexData.bookIndex);

        let ret = [];

        for (let i = 0; i < count; i++) {
            ret.push(i + 1);
        }

        return (
            <select className="home-chapter-selector" value={homeIndexData.chapterIndex} onChange={this.onChapterChange}>
                {ret.map((chapter, key) => {
                    return  <option key={key} value={chapter - 1}>{chapter}</option>
                })}
            </select>
        )
    }

    render = () => {
        return (
            <div className="home-chapter-select">
                <h3>Chapter</h3>
                {this.bookChapters()}
            </div>
        )
    }
}
ChapterSelector.contextType = StateContext;
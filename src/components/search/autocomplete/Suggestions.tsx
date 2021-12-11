import React, { ReactElement } from 'react'
import { makeBold } from './../../../utils/string';
import Loader from './loader';
import './suggestions.scss';

export interface ISuggestionsProps {
    data: ISuggestion[],
    searchText: string,
    noResultsText?: string,
    disableSuggestions: boolean,
    highlighting?: boolean,
    loading: boolean,
    renderListItem?(data: ISuggestion): ReactElement,
    onKeyDown?(event: any): void,
    retrieveFocus(event: any): void,
    onSearch(text: string): void,
}

export interface ISuggestion {
    text: string,
    //...
}

export default function Suggestions(props: ISuggestionsProps): JSX.Element {
    let classNames = [`component-search-suggestions`];
    let listRefs : any[] = [];
    let index = 0;

    props.data.forEach(() => {
        listRefs.push(React.createRef());
    })

    const isFocused = (e : any) => {
        listRefs.forEach((elem, i) => {
            if (elem.current === e.target)
                index = i;
        })
    }

    const keyDown = (event: any, text: string) => {
        if (event.key === "ArrowDown")
            index++;
        if (event.key === "ArrowUp")
            index--;
        if (index < 0)
            index = listRefs.length - 1;
        if (index >= listRefs.length)
            index = 0;
        if (event.key === "ArrowDown" || event.key === "ArrowUp")
		{
			event.preventDefault();
			listRefs[index].current.focus();
		}
        if (event.key === "Escape")
            props.retrieveFocus(event);
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            props.onSearch(text);
            props.retrieveFocus(event);
        }
    }

    const list = props.data.map((elem, index) => {
        let item: any;
        if (props.renderListItem) {
            item = props.renderListItem(elem);
        } else {
            let text = (props.highlighting) ? makeBold(elem.text, props.searchText) : elem.text;
            item = <>
                <p dangerouslySetInnerHTML={{ __html: text }}></p>
                <i />
            </>;
        }

        return (
            <li key={"suggestion-" + index} onKeyDown={(event) => { keyDown(event, elem.text) }} className={`component-search-suggestions-list-item`}>
                <button onClick={(event) => { event.preventDefault(); props.onSearch(elem.text) }} onFocus={isFocused} ref={listRefs[index]} className={`component-search-suggestions-list-link`}>
                    {item}
                </button>
            </li>
        );
    })

    const noResultsText = (props.noResultsText) ? props.noResultsText : "Ingen resultater...";
    if (props.disableSuggestions)
        return (<></>);
    return (
        <div className={classNames.join(' ')} onKeyDown={props.onKeyDown}>
            <ul className={`component-search-suggestions-list`}>
                {props.loading &&
                    <div className={`component-search-suggestions-loader`}>
                        <Loader />
                    </div>}
                {!props.loading && list}
                {!props.data.length && !props.loading && <p>{noResultsText}</p>}
            </ul>
        </div>
    )
}

Suggestions.defaultProps = {
}

import React, { ReactElement, useState, useEffect } from 'react'
import Suggestions, { ISuggestion } from './autocomplete/Suggestions';
import './search.scss';
import { Button } from '../button/Button';

export interface ISearchProps {
    fetchSuggestionData(searchText: string): Promise<any[]>,
    renderListItem?(data: ISuggestion): ReactElement,
    onSearch(searchText: string): void,
    size: 'small' | 'medium' | 'large' | 'full',
	id?: string,
    maxResultsInSuggestions?: number,
    searchIcon?: 'none' | 'inside' | 'outside',
    searchButton?: boolean,
    highlighting?: boolean,
    searchButtonText?: string,
    labelText?: string,
    placeholderText?: string,
    searchTimeoutInMS?: number,
    noResultsText?: string,
    scrollTarget?: Node,
    loadingBar?: boolean,
    minCharactersForSearch?: number
}
let tmpSearch = "";
export function Search({minCharactersForSearch = 2, ...props}: ISearchProps): ReactElement {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [timeOutID, setTimeoutID] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [disableSuggestions, setDisableSuggestions] = useState(false);


    const ref = React.createRef<HTMLInputElement>();
    const inputRef = React.createRef<HTMLInputElement>();

    const id = props.id ? `component-search-${props.id}` : "generic-search";
    let classNames = [`component-search`];

    classNames.push(`component-search-size--${props.size}`);

    if (props.searchIcon && props.searchIcon !== 'none')
        classNames.push(`component-search-style--icon-` + props.searchIcon);

    const fetchSuggestions = () => {
        setTimeoutID(-1);
        let data = props.fetchSuggestionData(tmpSearch);
        data.then((result : any) => {
            setSuggestions(result);
            if (props.loadingBar)
                setLoading(false);
        })
    }

    const onChange = (event : any) => {
        setSearchText(event.target.value);
        tmpSearch = event.target.value;
        if (searchText === "" && suggestions !== [])
            setSuggestions([]);
        if (!loading && props.loadingBar)
            setLoading(true);
        if (timeOutID === -1 && searchText !== '') {
            window.clearTimeout(timeOutID);
            setTimeoutID(window.setTimeout(fetchSuggestions, props.searchTimeoutInMS));
        }
    }

    const onSearch = (text: string) => {
        setSearchText(text);
        inputRef.current?.focus();
        props.onSearch(text);
        setDisableSuggestions(true);
    }

    const keyDown = (event : any) => {
        if (event.key === "Enter") {
            props.onSearch(searchText);
        } else if (disableSuggestions && event.key !== "Tab")
            setDisableSuggestions(false);

    }

    const retrieveFocus = (event : any) => {
        inputRef.current?.focus();
        setDisableSuggestions(true);
    }

    useEffect(() => {
        function handler(event : any) {
            if (!ref.current?.contains(event.target)) {
                setDisableSuggestions(true)
            }
        }
        const target = (props.scrollTarget && props.scrollTarget != null) ? props.scrollTarget : window;
        window.addEventListener('click', handler)
        target.addEventListener('scroll', handler)
        window.addEventListener('touchstart', handler)
        return () => {
            window.removeEventListener('click', handler);
            target.removeEventListener('scroll', handler)
            window.removeEventListener('touchstart', handler);
        }
    })

    return (
        <div id={id} ref={ref} className={classNames.join(' ')}>
            {props.labelText !== "" && props.labelText && 
                <label htmlFor={id + "-input"}>{props.labelText}</label> 
            }
            <div className={`component-search-container`}>
                <div>
                    <input id={id + "-input"} type="search" placeholder={props.placeholderText} value={searchText} onChange={onChange} onClick={(event) => { event.stopPropagation() }} autoComplete="off" onKeyDown={keyDown} ref={inputRef} />
                    {searchText.length >= minCharactersForSearch &&  <Suggestions 
                                            data={suggestions.slice(0, props.maxResultsInSuggestions)} 
                                            highlighting={props.highlighting}
                                            disableSuggestions={disableSuggestions}
                                            onSearch={onSearch}
                                            searchText={searchText}
                                            retrieveFocus={retrieveFocus}
                                            loading={loading}
                                            renderListItem={props.renderListItem}
                                            />}
                </div>
                {props.searchButton && <Button onClick={() => { onSearch(searchText); setDisableSuggestions(true); }} text={(props.searchButtonText) ? props.searchButtonText : "Søk"} />}
            </div>
        </div>
    )
}

Search.defaultProps = {
    size: 'small',
    searchTimeoutInMS: 1000,
    scrollTarget: window,
    loadingBar: true,
    maxResultsInSuggestions: 10
}

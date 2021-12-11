import React, { ReactElement, useContext } from 'react'
import { Nav } from 'react-bootstrap';
import { Search } from '../../search/Search';

import { GetSuggestions } from '../../../controllers/search/Search';
import { SearchRedirect } from '../../../controllers/search/Search';

import { userContext } from '../../../models/user/UserContext';

import './navigation.scss';


interface INavigationProps {
	
}

export function Navigation({...props}: INavigationProps): ReactElement {

	const context = useContext(userContext);

	return (
		<Nav className="component-navigation">
			{context.user && 
			<Nav.Item>
    			<Nav.Link href="/admin">Admin</Nav.Link>
  			</Nav.Item>}
			<Nav.Item className="navigation-search-container">
				<Search
					fetchSuggestionData={GetSuggestions}
					minCharactersForSearch={2}
					highlighting={true}
					searchIcon="inside"
					searchTimeoutInMS={200}
					searchButton={true}
					size="full"
					onSearch={SearchRedirect}
				/>
			</Nav.Item>
		</Nav>
	)
}

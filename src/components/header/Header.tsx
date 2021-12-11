import React, { ReactElement } from 'react'

import { Navigation } from './nav/Navigation';


import './header.scss';

interface IHeaderProps {
	
}

export function Header({...props}: IHeaderProps): ReactElement {
 
	return (
		<header> 
			<a href="/" ><h1 id="site-name_heading">Holidaze</h1></a>
			<Navigation />
		</header>
	)
}

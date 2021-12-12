import React, { ReactElement } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import Button from '../../components/button/Button';
import { Collection } from '../../components/collection/Collection';
import ContactButton from '../../components/contactForm/ContactButton';
import { Search } from '../../components/search/Search'
import { GetSuggestions, SearchRedirect } from '../../controllers/search/Search'

import './home.scss';

interface IHomeProps {
	
}

export function Home({...props}: IHomeProps): ReactElement {
	return (
		<>
			<div className="home_search-container" >
				<div className="home_search-container-search">
					<Search fetchSuggestionData={GetSuggestions} labelText="Let etter hotel" minCharactersForSearch={2} highlighting={true} searchIcon="inside" searchTimeoutInMS={400} searchButton={true} size="full" onSearch={SearchRedirect} />
					<div className="home_search-container-search-show-all">
						<a href="/browse?search=" ><Button text="Vis alle" /></a>
					</div>
				</div>
			</div>
			<Container>
				<Row>
					<Collection />
				</Row>
				<Row>
					<div className={"home_tourist-activity"}>
						<span className="home_tourist-activity-title">Turist aktiviteter</span>
						<div className="home_tourist-activity-container">
							<Col sm={12} md={6}>
								<Image src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F-7FxCbEOBhg8%2FTi5b1OwGDAI%2FAAAAAAAAB-M%2Fopnk6TA9YwY%2Fs1600%2Ffloibanen.JPG&f=1&nofb=1" />
							</Col>
							<Col sm={12} md={6}>
								<p>Bergen er inngangsporten til sjarmen til Sør-Norge og er kjent for sin naturlige skjønnhet. Selv om det ofte regner i mange dager, er det denne typen vær som gjør byen frisk, grønn og blomster blomstrende. På samme måte, da jeg besøkte Bergen, fulgte regnet oss, men det reduserte ikke skjønnheten. Sollyset stiger etter regnet, reflekterer de vakre fargene på himmelen, blander seg med de vakre trehusene.</p>
							</Col>
						</div>
					</div>
				</Row>
			</Container>
			<ContactButton />
		</>
	)
}

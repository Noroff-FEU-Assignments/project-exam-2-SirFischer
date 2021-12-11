/**
 * @jest-environment jsdom
 */

import {Search} from './../Search';
const { axe, toHaveNoViolations } = require('jest-axe');
const { render } = require('react-dom')
import 'jest';

expect.extend(toHaveNoViolations);

let fakeData = [
    {
        text: "Test 1",
        link: "#"
    },
    {
        text: "Test 2",
        link: "#"
    },
    {
        text: "Test 3",
        link: "#"
    }
]

describe('Search', () => {
	it('has proper accesibility features', async () => {
		let test = document.createElement("div");
		render(
			<main>
				<Search
					labelText="Search..."
					fetchSuggestionData={async (searchText) => {
						return fakeData;
					}}
					onSearch={(text) => {
						
					}}
				/>
			</main>, test
		);
		const results = await axe(test)
		expect(results).toHaveNoViolations();
	})
})

//https://github.com/dequelabs/axe-core/blob/master/doc/rule-development.md Define other axe tests
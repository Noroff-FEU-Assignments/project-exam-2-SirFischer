/**
 * @jest-environment jsdom
 */

import Button from '../Button';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from 'react-dom';

expect.extend(toHaveNoViolations);

describe('Button', () => {
	it('has proper accesibility features', async () => {
		let test = document.createElement("div");
		render(
			<main><Button text="Accesibility test" /></main>, test
		);
		const results = await axe(test)
		expect(results).toHaveNoViolations();
	})
})

//https://github.com/dequelabs/axe-core/blob/master/doc/rule-development.md Define other axe tests
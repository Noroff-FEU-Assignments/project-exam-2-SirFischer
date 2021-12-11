/**
 * @jest-environment jsdom
 */

import {Modal} from './../Modal';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from 'react-dom';

expect.extend(toHaveNoViolations);

describe('Modal', () => {
	it('has proper accesibility features', async () => {
		let test = document.createElement("div");
		render(
			<main>
				<Modal id="testModal" show={true} closable={true} title="This is a pop-up!">
					<p>
						Lorem ipsum dolor sit amet consectetur <br />
						adipisicing elit. Quas facere ipsam <br />
						repellat atque necessitatibus asperiores <br />
						harum minus beatae libero? <br />
						Nostrum sit minus, expedita animi doloremque <br />
						ea consectetur est dolores hic.
					</p>
				</Modal>
			</main>, test
		);
		const results = await axe(test)
		expect(results).toHaveNoViolations();
	})
})

//https://github.com/dequelabs/axe-core/blob/master/doc/rule-development.md Define other axe tests

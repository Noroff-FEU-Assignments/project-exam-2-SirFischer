/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	transform: {
		"^.+\\.jsx?$": "babel-jest",
		"^.+\\.tsx?$": "ts-jest",
		// If you're using babel for both:
		// "^.+\\.[jt]sx?$": "babel-jest",
	},
  	transform: {
		"^.+\\.jsx?$": "babel-jest",
		"^.+\\.tsx?$": "ts-jest",
		"^.+\\.scss$": 'jest-scss-transform',
		// If you're using babel for both:
		// "^.+\\.[jt]sx?$": "babel-jest",
  	},
};
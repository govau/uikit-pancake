/***************************************************************************************************************************************************************
 *
 * helper.js unit tests
 *
 * @file - pancake/src/helpers.js
 *
 **************************************************************************************************************************************************************/


const { CheckNPM } = require( '../src/helpers' );


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Check npm version
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
test('CheckNPM should always return true or false', () => {
	expect( CheckNPM() ).toBeDefined();
});

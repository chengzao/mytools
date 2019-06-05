/* global test1:true, test2 */
/* eslint-disable no-console */

test1 = "111";

// test2 = "test2"; //Read-only global 'test2' should not be modified. (no-global-assign)

console.log(test1);
/** 
 * Calc - Worker
 *  
 */

importScripts('../bench/measureTime.js', 'selector.js', 'swap.js');

self.onmessage = function (input) {
	startBench();
	var result = calc(input.data);
	self.postMessage([result, stopBench()]);
	self.close();
}

//create operation matrix (m x n)
function calc(input) {
	let res = "";
	let val = [];

	//columns of the first row		
	for (let k = 0; k <= input[3]; k++) {
		(k === 0) ? res = input[0] : res += `,${k}`;
	}
	res += "\r\n";
	for (let i = 1; i <= input[2]; i++) {
		//rows of the first column 
		res += i;
		for (let j = 1; j <= input[3]; j++) {
			val = swapOp(i, j, input[1]);
			res += `,${mode(input[0], val)}`;
		}
		if (i !== input[3]) res += `\r\n`;
	}
	return res;
}

/** 
 * Calc - Worker
 *  
 */

importScripts('../bench/measureTime.js', 'selector.js', 'swap.js');

self.onmessage = function (input) {
	startBench();
	var result = {		
		table: calc(input.data),
		elapsed: stopBench()
	}
	self.postMessage(result);
	self.close();
}

//create operation matrix (m x n)
function calc(input) {
	let res = "";
	let val = [];

	//columns of the first row		
	for (let k = 0; k <= input.col; k++) {
		(k === 0) ? res = input.op : res += `;${k}`;
	}
	res += "\r\n";
	for (let i = 1; i <= input.row; i++) {
		//rows of the first column 
		res += i;
		for (let j = 1; j <= input.col; j++) {
			val = swapOp(i, j, input.comm);
			res += `;${mode(input.op, val)}`;
		}
		if (i !== input.col) res += `\r\n`;
	}
	return res;
}

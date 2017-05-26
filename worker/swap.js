//commutative? swap operands
function swapOp(i, j, swap) {
	let operand = {
		x: i,
		y: j
	}
	
	if (swap) {
		[operand.x, operand.y] = [operand.y, operand.x];
	}

	return operand;
}
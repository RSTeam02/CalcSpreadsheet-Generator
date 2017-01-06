//commutative? swap operands
function swapOp(i, j, swap) {
	let a = i;
	let b = j;
	if (swap) {
		[a, b] = [b, a]
	}
	return [a, b];
}
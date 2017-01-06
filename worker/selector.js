//select operation
function mode(select, val) {
	let expr = 0;

	if (select === "*") {
		expr = `${val[0] * val[1]}`;
	} else if (select === "-") {
		expr = `${val[0] - val[1]}`;
	} else if (select === "/") {
		expr = `${Math.floor(val[0] / val[1])}`;
	} else if (select === "%") {
		expr = `${val[0] % val[1]}`;
	} else if (select === "+") {
		expr = `${val[0] + val[1]}`;
	} else {
		expr = `${2 * (val[0] + val[1])}`;
	}

	return expr;
}
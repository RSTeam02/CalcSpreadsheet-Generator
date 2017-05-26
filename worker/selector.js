//select operation
function mode(select, val) {
	let expr = 0;

	if (select === "*") {
		expr = `${val.x * val.y}`;
	} else if (select === "-") {
		expr = `${val.x - val.y}`;
	} else if (select === "/") {
		expr = `${Math.floor(val.x / val.y)}`;
	} else if (select === "%") {
		expr = `${val.x % val.y}`;
	} else if (select === "+") {
		expr = `${val.x + val.y}`;
	} else {
		expr = `${2 * (val.x + val.y)}`;
	}

	return expr;
}
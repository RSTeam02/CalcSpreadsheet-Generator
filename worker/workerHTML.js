/**
 * 
 * HTML - Table impl. 
 */

importScripts('selector.js', 'swap.js');


self.onmessage = function (input) {
    var result = calc(input.data);
    self.postMessage(result);
    self.close();
}

//create calc matrix (m x n)
function calc(input) {
    let res = "";
    let result = "";
    let title = "";

    res += `<tr>`;
    for (let i = 0; i <= input.col; i++) {
        (i === 0)
            ? res += `<th align = "right" id = "btmRight">${input.op}</th>`
            : res += `<th class = "classCol${i}" id="bottom" align = "right">${i}</th>`
    }
    res += `</tr>`;

    for (let i = 1; i <= input.row; i++) {
        res += `<tr class = "classRow${i}">`;
        for (let j = 1; j <= input.col; j++) {
            if (j === 1) {
                res += `<th align = "right" id="right">${i}</th>`;
            }
            val = swapOp(i, j, input.comm);
            result = mode(input.op, val);

            (input.op === "2*(+")
                ? title = `2*(${val.x}+${val.y})=${result}`
                : title = `${val.x}${input.op}${val.y}=${result}`;
            res += `<td class = "classCol${j}" title = ${title} align = "right">${result}</td>`;
        }
        res += `</tr>`;
    }
    return res;
}

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

    res = `<colgroup>`;
    for (let i = 0; i <= input[3]; i++) {
        res += `<col id="col${i}">`;
    }
    res += `</colgroup>`;

    res += `<tr>`;
    for (let i = 0; i <= input[3]; i++) {
        (i === 0)
            ? res += `<th align = "right" id = "btmRight">${input[0]}</th>`
            : res += `<th align = "right" id = "bottom">${i}</th>`
    }
    res += `</tr>`;

    for (let i = 1; i <= input[2]; i++) {
        res += `<tr>`;
        for (let j = 1; j <= input[3]; j++) {
            if (j === 1) {
                res += `<th align = "right" id="right">${i}</th>`;
            }
            val = swapOp(i, j, input[1]);
            result = mode(input[0], val);

            (input[0] === "2*(+")
                ? title = `2*(${val[0]}+${val[1]})=${result}`
                : title = `${val[0]}${input[0]}${val[1]}=${result}`;
            res += `<td class = "classCol${j}" title = ${title} align = "right">${result}</td>`;
        }
        res += `</tr>`;
    }
    return res;
}

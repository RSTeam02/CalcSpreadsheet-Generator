import { FileWriter } from "../io/filewriter.js";

export class Controller {

    constructor() {
        this.inputListener();
        this.info = document.getElementById("info");
        this.elapsed = document.getElementById("elapsed");
        this.htmlTable = document.getElementById("result");
    }



    //2 workers for html and csv output
    inputListener() {

        $(".inputUI")
            .on("keyup mouseleave touchend", () => {
                let fWriter = new FileWriter();
                let res = "";
                var worker = {
                    CSV: new Worker('worker/workerCSV.js'),
                    HTML: new Worker('worker/workerHTML.js')
                };
                var inputUI = {
                    op: $("input:radio[name='mode']:checked").val(),
                    comm: document.getElementById("commCheck").checked,
                    row: $("#rowSlider").val(),
                    col: $("#colSlider").val()
                };

                for (let val in worker) {
                    worker[val].postMessage(inputUI);
                    worker[val].onmessage = (event) => {
                        if (val == "CSV") {
                            this.elapsed.innerHTML = `elapsed time: ${event.data.elapsed}`;
                            fWriter.setContent(event.data.table);
                            fWriter.createFile();
                        } else {
                            this.htmlTable.innerHTML = event.data;
                            this.markRowCol(inputUI.row, inputUI.col);
                        }
                    }
                }
            }).on("input", () => {
                $("#infoRow").html(`Rows: ${$("#rowSlider").val()}`);
                $("#infoCol").html(`Cols: ${$("#colSlider").val()}`);
            });
    }

    //mark rows, columns
    markRowCol(row, col) {
        $("td, tr").on("mouseenter touchstart", function () {
            $(`.${$(this).attr("class")}`).css('background-color', 'lightgreen');
        }).on("mouseleave touchend", function () {
            $(`.${$(this).attr("class")}`).css('background-color', 'transparent');
        });
    }
}
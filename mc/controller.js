class Controller {

    constructor() {
        this.inputListener();
        this.info = document.getElementById("info");
        this.elapsed = document.getElementById("elapsed");
        this.htmlTable = document.getElementById("result");
    }



    //2 workers for html and csv output
    inputListener() {

        $(".inputUI")
            .on("click keyup", () => {
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
                            this.markCol(inputUI.row, inputUI.col);
                        }
                    }
                }
            }).on("input", () => {
                $("#infoRow").html(`Rows: ${$("#rowSlider").val()}`);
                $("#infoCol").html(`Cols: ${$("#colSlider").val()}`);
            });
    }

    //mark vertical column
    markCol(row, col) {
        let classCol = [];
        for (let i = 0; i < col; i++) {
            classCol[i] = document.getElementsByClassName(`classCol${i + 1}`);
        }
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < row; j++) {
                classCol[i][j].addEventListener("mouseover", () => {
                    document.getElementById(`col${i + 1}`).style.backgroundColor = 'lightgreen';
                });
                classCol[i][j].addEventListener("mouseout", () => {
                    document.getElementById(`col${i + 1}`).style.backgroundColor = 'white';
                });
            }
        }
    }
}
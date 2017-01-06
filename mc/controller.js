class Controller {

    constructor() {
        this.evalInput();
        this.info = document.getElementById("info");
        this.elapsed = document.getElementById("elapsed");
        this.htmlTable = document.getElementById("result");
    }
    //read string from input field
    getKeyInput() {
        let inputs = document.autoForm.numberM.value.split("x");
        return inputs;
    }

    evalInput() {
        //set number of rows, columns (m, n)
        document.getElementById("generateBtn").addEventListener("click", () => {
            this.generate();
        });

    }

    //dependent on checkbox selection
    workerSelect(table) {
        let workerSet = [];
        switch (table) {
            case true:
                workerSet[0] = new Worker('worker/workerCSV.js');
                workerSet[1] = new Worker('worker/workerHTML.js');
                break;
            case false:
                workerSet[0] = new Worker('worker/workerCSV.js');
                break;
            default:
                workerSet = [];
                break;
        }
        return workerSet;
    }

    //2 workers for html and csv output
    generate() {
        this.htmlTable.innerHTML = this.elapsed.innerHTML = this.info.innerHTML = "";
        let swap = document.getElementById("commCheck").checked;
        let mn = this.getKeyInput();
        let fWriter = new FileWriter();
        let res = "";
        let allMode = document.autoForm.elements.mode;
        let worker = this.workerSelect(document.getElementById("cbox").checked);

        try {
            if (mn.length !== 2 || isNaN(mn[0]) || mn[0] === "" || isNaN(mn[1]) || mn[1] === "") {
                throw "input is not valid";
            } else {
                for (let i = 0; i < worker.length; i++) {
                    worker[i].postMessage([allMode.value, swap, mn[1], mn[0]]);
                    worker[i].onmessage = (event) => {
                        if (i === 0) {
                            this.elapsed.innerHTML = `elapsed time: ${event.data[1]}`;
                            fWriter.setContent(event.data[0]);
                            fWriter.createFile();
                        } else {
                            this.htmlTable.innerHTML = event.data;
                            this.markCol(mn[1], mn[0]);
                        }
                    }
                }
            }
        } catch (error) {
            this.info.innerHTML = error;
        }
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
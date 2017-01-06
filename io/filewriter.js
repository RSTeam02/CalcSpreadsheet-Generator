
//class for download as plain text/csv

class FileWriter {

    constructor() {
        this.fileName = "calcTable.csv";
        this.link = document.getElementById("download");
        this.link.innerHTML = "";
    }

    setContent(input) {
        this.content = input;
        this.blob = new Blob([this.content], { type: 'text/plain' });
    }

    createFile() {
        this.link.download = this.fileName;
        this.link.innerHTML = "Download Calc - Table";
        this.link.href = window.URL.createObjectURL(this.blob);
        document.getElementById("ahref").appendChild(this.link);
    }
}
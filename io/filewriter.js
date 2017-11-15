
//class for download as plain text/csv

export class FileWriter {

    constructor() {
        $("#download").html("");
    }

    setContent(input) {
        this.blob = new Blob([input], { type: 'text/plain' });
    }

    createFile() {
        $("#download").attr("download", "calcTable.csv");
        $("#download").html("Download Calc - Table");
        $("#download").attr('href', window.URL.createObjectURL(this.blob));
        $("#ahref").append($("#download"));
    }
}
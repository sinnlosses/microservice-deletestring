/**
 * 削除処理を実行する.
 */
function execute() {
    var inputText = getDocumentId("inputTextarea").value;
    var inputRows = inputText.split("\n");
    var leftString = getDocumentId("leftString").value;
    var rightString = getDocumentId("rightString").value;
    for (var i = 0; i < inputRows.length; i++) {
        var deleteString = inputRows[i].replace(leftString, "");
        var position = deleteString.lastIndexOf(rightString);
        deleteString = deleteString.substr(0, position);
        inputRows[i] = deleteString;
    }
    var outputTextarea = getDocumentId("outputTextarea");
    outputTextarea.value = inputRows.join("\n");
}
/**
 * 指定したIDを持つエレメントを返す.
 * @param id エレメントID
 */
function getDocumentId(id) {
    return document.getElementById(id);
}

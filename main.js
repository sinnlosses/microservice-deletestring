/**
 * 削除処理を実行する.
 */
function execute() {
    var inputText = getDocumentId("inputTextarea").value;
    var inputRows = inputText.split("\n");
    var leftString = getDocumentId("leftString").value;
    var rightString = getDocumentId("rightString").value;
    var commentSymbol = getDocumentId("commentSymbol").value;
    for (var i = 0; i < inputRows.length; i++) {
        // 対象の行でない場合は除く
        if (!isTargetRow(inputRows[i], commentSymbol)) {
            continue;
        }
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
/**
 * 操作すべき行か判定する.
 * @param text 判定する対象テキスト
 * @param comment コメント文字列
 */
function isTargetRow(text, comment) {
    if (!text.match(comment)) {
        return false;
    }
    if (text.trim().startsWith(comment)) {
        return false;
    }
    return true;
}

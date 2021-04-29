/**
 * 削除処理を実行する.
 */
function execute() {
    var inputText = getDocumentId("inputTextarea").value;
    var inputRows = inputText.split("\n");
    var leftString = getDocumentId("leftString").value;
    var rightString = getDocumentId("rightString").value;
    var commentSymbol = getDocumentId("commentSymbol").value == "" ? "//" : getDocumentId("commentSymbol").value;
    var deleteString;
    for (var i = 0; i < inputRows.length; i++) {
        // コメントが指定されている行は除く
        if (!isTargetRow(inputRows[i], commentSymbol)) {
            continue;
        }
        // 左側の文字列が指定されている場合
        if (leftString.length != 0) {
            if (isTargetRowLeft(inputRows[i], leftString)) {
                deleteString = inputRows[i].replace(leftString, "");
            }
            else {
                deleteString = inputRows[i];
            }
        }
        // 右側の文字列が指定されている場合
        if (rightString.length != 0) {
            var position = isTargetRowRight(deleteString, rightString);
            if (position > 0) {
                deleteString = deleteString.substr(0, position);
            }
        }
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
 * コメント行か判定する.
 * @param text 判定する対象テキスト
 * @param commentSymbol コメント判定に使う文字列
 */
function isTargetRow(text, commentSymbol) {
    if (text.trim().startsWith(commentSymbol)) {
        return false;
    }
    return true;
}
/**
 * 左側の文字列が削除対象か判定する.
 * @param text 判定する対象テキスト
 * @param leftString 判定に使う文字列
 */
function isTargetRowLeft(text, leftString) {
    if (text.trim().startsWith(leftString)) {
        return true;
    }
    return false;
}
/**
 * 右側の文字列が削除対象か判定する.
 * @param text 判定する対象テキスト
 * @param rightString 判定に使う文字列
 */
function isTargetRowRight(text, rightString) {
    var position = 0;
    if (text.match(rightString)) {
        var position_1 = text.lastIndexOf(rightString);
        return position_1;
    }
    return position;
}

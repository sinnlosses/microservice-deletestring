/**
 * 削除処理を実行する.
 */
function execute():void{
    const inputText:string = getDocumentId("inputTextarea").value;
    const inputRows:string[] = inputText.split("\n");
    const leftString:string = getDocumentId("leftString").value;
    const rightString:string = getDocumentId("rightString").value;
    const commentSymbol:string = getDocumentId("commentSymbol").value;

    for (let i = 0; i < inputRows.length; i++){

        // 対象の行でない場合は除く
        if (!isTargetRow(inputRows[i], commentSymbol)){
            continue;
        }

        var deleteString:string = inputRows[i].replace(leftString,"")
        const position:number = deleteString.lastIndexOf(rightString)
        deleteString = deleteString.substr(0,position)
        inputRows[i] = deleteString;

    }
    let outputTextarea:HTMLInputElement = getDocumentId("outputTextarea");
    outputTextarea.value = inputRows.join("\n");
}

/**
 * 指定したIDを持つエレメントを返す.
 * @param id エレメントID
 */
function getDocumentId(id:string):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

/**
 * 操作すべき行か判定する.
 * @param text 判定する対象テキスト
 * @param commentSymbol コメント文字列
 */
 function isTargetRow(text:string, commentSymbol:string):boolean{
    if (!text.match(commentSymbol)){
        return false;
    }
    if (text.trim().startsWith(commentSymbol)){
        return false;
    }
    return true;
}

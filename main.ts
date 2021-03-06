/**
 * 削除処理を実行する.
 */
function execute():void{
    const inputText:string = getDocumentId("inputTextarea").value;
    const inputRows:string[] = inputText.split("\n");
    const leftString:string = getDocumentId("leftString").value;
    const rightString:string = getDocumentId("rightString").value;

    for (let i = 0; i < inputRows.length; i++){
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
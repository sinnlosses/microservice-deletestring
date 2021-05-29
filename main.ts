/**
 * 削除処理を実行する.
 */
 function execute():void{
    const inputTextArea:string = getDocumentId("inputTextarea").value;
    const inputRows:string[] = inputTextArea.split("\n");
    const leftString:string = getDocumentId("leftString").value;
    const rightString:string = getDocumentId("rightString").value;
    const commentSymbol:string = getDocumentId("commentSymbol").value == "" ? "//" : getDocumentId("commentSymbol").value;
    
    for (let i = 0; i < inputRows.length; i++){
        // コメントされている行は除く
        if (!isTargetRow(inputRows[i], commentSymbol)){
            continue;
        }

        // 対象テキストのコメント退避用
        let commentString:string = "";

        // 右側にコメントがある場合、コメント文字列として退避させておく
        let commentPosition:number = findComment(inputRows[i], commentSymbol)
        if(commentPosition > 0){
            commentString = inputRows[i].substr(commentPosition,inputRows[i].length)
            inputRows[i] = inputRows[i].replace(commentString,"")
        }

        // 出力文字列格納用
        let deletedString:string = inputRows[i];

        // 左側の文字列が指定されている場合
        if(leftString.length > 0){
            if(isTargetRowLeft(inputRows[i], leftString)){
                deletedString = inputRows[i].replace(leftString,"")
            }
        }

        // 右側の文字列が指定されている場合
        if(rightString.length > 0){
            let position:number = findLastIndexOfRightString(deletedString, rightString)
            if(position > 0){
                deletedString = deletedString.substr(0,position)
            }  
        }

        inputRows[i] = deletedString +　" " + commentString;
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
 * コメント行か判定する.
 * @param text 判定する対象テキスト
 * @param commentSymbol コメント判定に使う文字列
 */
 function isTargetRow(text:string, commentSymbol:string):boolean{
    if (text.trim().startsWith(commentSymbol)){
        return false;
    }
    return true;
}

/**
 * テキストのコメントの位置を返す.
 * コメントが含まれない場合は負の値を返す.
 * @param text 対象テキスト
 * @param commentSymbol コメント文字列
 */
 function findComment(text:string, commentSymbol:string):number{
    return text.lastIndexOf(commentSymbol);
}

/**
 * 左側の文字列が削除対象か判定する.
 * @param text 判定する対象テキスト
 * @param leftString 判定に使う文字列
 */
 function isTargetRowLeft(text:string, leftString:string):boolean{
    return text.startsWith(leftString);
}

/**
 * 対象文字列の右側の文字列の位置を返す.
 * 右側の文字列が含まれない場合は負の値を返す.
 * @param text 判定する対象テキスト
 * @param rightString 判定に使う文字列
 */
 function findLastIndexOfRightString(text:string, rightString:string):number{
    return text.lastIndexOf(rightString);
}



 
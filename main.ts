/**
 * 削除処理を実行する.
 */
 function execute():void{
    const inputText:string = getDocumentId("inputTextarea").value;
    const inputRows:string[] = inputText.split("\n");
    const leftString:string = getDocumentId("leftString").value;
    const rightString:string = getDocumentId("rightString").value;
    const commentSymbol:string = getDocumentId("commentSymbol").value == "" ? "//" : getDocumentId("commentSymbol").value;
    var deleteString:string;
    
    for (let i = 0; i < inputRows.length; i++){
        var commentString:string = "";

        // コメントされている行は除く
        if (!isTargetRow(inputRows[i], commentSymbol)){
            continue;
        }

        // 右側にコメントがある場合、コメント文字列として退避させておく
        var position:number = isComment(inputRows[i], commentSymbol)
        if(position != 0){
            commentString = inputRows[i].substr(position,inputRows[i].length)
            inputRows[i] = inputRows[i].replace(commentString,"")
        }

        // 左側の文字列が指定されている場合
        if(leftString.length != 0){
            if(isTargetRowLeft(inputRows[i], leftString)){
                deleteString = inputRows[i].replace(leftString,"")
            }
            else{
                deleteString = inputRows[i]
            }
        }

        // 右側の文字列が指定されている場合
        if(rightString.length != 0){
            var position:number = isTargetRowRight(deleteString, rightString)
            if(position > 0){
                deleteString = deleteString.substr(0,position)
            }  
        }

        inputRows[i] = deleteString + commentString;
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
 * コメントか判定する.
 * @param text 判定する対象テキスト
 * @param commentSymbol コメント判定に使う文字列
 */
 function isComment(text:string, commentSymbol:string):number{
    var position:number = 0
    if(text.match(commentSymbol)){
        position = text.lastIndexOf(commentSymbol)
        return position;
    }
    return position;
}

/**
 * 左側の文字列が削除対象か判定する.
 * @param text 判定する対象テキスト
 * @param leftString 判定に使う文字列
 */
 function isTargetRowLeft(text:string, leftString:string):boolean{
    if (text.trim().startsWith(leftString)){
        return true;
    }
    return false;
}

/**
 * 右側の文字列が削除対象か判定する.
 * @param text 判定する対象テキスト
 * @param rightString 判定に使う文字列
 */
 function isTargetRowRight(text:string, rightString:string):number{
    const position:number = 0;

    if(text.match(rightString)){
        const position:number = text.lastIndexOf(rightString)
        return position;
    }    
    return position;
}



 
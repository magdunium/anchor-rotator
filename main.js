function errorHandling (printError) {
    document.getElementById('Error').innerHTML = printError;

    if (printError === '') {
        document.getElementById('unicorn').src = 'http://media.giphy.com/media/WZmgVLMt7mp44/giphy.gif';
    }
    else {
        document.getElementById('unicorn').src = 'http://giffiles.alphacoders.com/853/8538.gif';
    }
}

function anchorRotator(lang) {
    var userInput = inputForm.inputArea.value;
    var number = Number(userInput);
    var anchorOutput = document.getElementById('anchors');

    errorHandling('')

    if (lang === "pl"){
        var anchorList = originalAnchorList.slice();
    }
    else if (lang === "eng"){
        var anchorList = engAnchorList.slice();
    }
    else if (lang === "fr"){
        var anchorList = frAnchorList.slice();
    }
    else if (lang === "de"){
        var anchorList = deAnchorList.slice();
    }
    if (lang === "cz"){
        var anchorList = czAnchorList.slice();
    }

    if (userInput > anchorList.length) {
        errorHandling('Błąd: Nie mam tylu anchorów... jeszcze.');
        return;
    }
    
    anchorOutput.value = '';
    for (let i = 0; i < number; i++) {
        var idx = Math.floor(Math.random() * anchorList.length);
        var randomElement = anchorList[idx];
        anchorList.splice(idx, 1);
        if (document.getElementById("checkbox").checked){
            randomElement = randomElement.charAt(0).toUpperCase() + randomElement.slice(1);
        }
        anchorOutput.value += randomElement;
        if (i < number - 1){
             anchorOutput.value += '\n';
        }
    }
}

function linkMaker(){
    var urlInput = document.getElementById("urls");
    var anchorInput = document.getElementById("anchors");
    var urlOutput = document.getElementById("output"); 
  
    var urlSplit = urlInput.value.split('\n');
    var anchorSplit = anchorInput.value.split('\n');
   
    
    urlOutput.value = '<a href="{' + urlSplit.join('|') + '}">{' + anchorSplit.join('|') + '}</a>';
    if (document.getElementById("nofollow").checked){
            urlOutput.value = '<a href="{' + urlSplit.join('|') + '}"' + ' rel="nofollow"' + '>{' + anchorSplit.join('|') + '}</a>';
        }
    else if (document.getElementById("50/50").checked){
        urlOutput.value = '<a href="{' + urlSplit.join('|') + '}"' + ' {rel="nofollow"|}' + '>{' + anchorSplit.join('|') + '}</a>';
    }
    else if (document.getElementById("spinner").checked){
        var spinNum = Math.min(urlSplit.length, anchorSplit.length);
        
        urlOutput.value = '<a href="{';
        for (let i = 0; i < spinNum; i ++){
            urlOutput.value += urlSplit[i] + '">' + anchorSplit[i];
            if (i < spinNum - 1){
                urlOutput.value += '|';
            }
        }
        urlOutput.value +=   '}</a>';
    }
}

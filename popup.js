//active : true

params = {
    active : true,
    currentWindow: true
}

chrome.tabs.query(params, gotTab);

function gotTab(tab){
   
    chrome.tabs.sendMessage(tab[0].id, {}, function(response) {
        console.log(response);
    });
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
   
    const times = document.getElementsByClassName("style-scope ytd-thumbnail-overlay-time-status-renderer");
    
    let timeList = [];

    for (const item of times) {
        const value = item.innerText.trim();

        if(value != ""){
            timeList.push(item.innerText.trim());
        }
    }

    sendResponse(timeList);
}


// let times = document.getElementsByClassName("ytd-thumbnail-overlay-time-status-renderer");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
   
    let times = document.getElementsByClassName("ytd-thumbnail-overlay-time-status-renderer");
    
    let timeList = [];

    for (let item of times) {
         timeList.push(item.innerText.trim());
    }

    sendResponse(timeList);
}


let time = document.getElementById('playlist-time');

params = {
    active : true,
    currentWindow: true
}

chrome.tabs.query(params, gotTab);

function gotTab(tab){
   
    chrome.tabs.sendMessage(tab[0].id, {}, function(response) {
        let finalTime = sumTime(response);
        time.innerText = finalTime;
    });
}

function sumTime(timeList){
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    timeList.forEach(actualTime => {
        let aux = actualTime.split(':');
        if(aux.length == 3){
            hours += parseInt(aux[0]);
            minutes += parseInt(aux[1]);
            seconds += parseInt(aux[2]);
        }else{
            minutes += parseInt(aux[0]);
            seconds += parseInt(aux[1]);
        }

    });
    
    return timeToString(hours, minutes, seconds);
}

function timeToString(hours, minutes, seconds){
    
    let newSeconds = seconds%60;
    let newMinutes = (minutes + Math.floor(seconds/60))%60
    let newHours = hours + Math.floor(minutes/60) + Math.floor(seconds/3600);

    if(newHours == 0){
        return toTwoDigits(newMinutes) + ':' + toTwoDigits(newSeconds);     
    }else{
        return newHours + ':' + toTwoDigits(newMinutes) + ':' + toTwoDigits(newSeconds);         
    }
}

function toTwoDigits(n){
    return n > 9 ? n : '0' + n;
}
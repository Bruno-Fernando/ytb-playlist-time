const time = document.getElementById('playlist-time');

params = {
    active: true,
    currentWindow: true
}

chrome.tabs.query(params, gotTab);

function gotTab(tab) {

    chrome.tabs.sendMessage(tab[0].id, {}, function (response) {
        const finalTime = sumTime(response);
        time.innerText = timeToString(formatTime(finalTime));
    });
}

function sumTime(timeList) {
    const fullTime = {
        hours: 0,
        minutes: 0,
        seconds: 0
    }

    timeList.forEach(actualTime => {
        const aux = actualTime.split(':');
        if (aux.length == 3) {
            fullTime.hours += parseInt(aux[0]);
            fullTime.minutes += parseInt(aux[1]);
            fullTime.seconds += parseInt(aux[2]);
        } else {
            fullTime.minutes += parseInt(aux[0]);
            fullTime.seconds += parseInt(aux[1]);
        }

    });

    return fullTime;
}

function formatTime(time) {
    const newSeconds = time.seconds % 60;
    const newMinutes = (time.minutes + Math.floor(time.seconds / 60)) % 60;
    const newHours = time.hours + Math.floor(time.minutes / 60) + Math.floor(time.seconds / 3600);

    return { newHours, newMinutes, newSeconds };
}

function timeToString(time) {

    if (time.newHours == 0) {
        return toTwoDigits(time.newMinutes) + ':' + toTwoDigits(time.newSeconds);
    } else {
        return time.newHours + ':' + toTwoDigits(time.newMinutes) + ':' + toTwoDigits(time.newSeconds);
    }
}

function toTwoDigits(n) {
    return n > 9 ? n : '0' + n;
}
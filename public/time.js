function timeStamp(time) {
    // const date = new Date(time);
    const second = 1000;
    const date = new Date(time * second);
    //Thu Jan 01 1970 09:00:00 GMT+0900

    return {
        month: pad(date.getMonth() + 1, 2),
        date: pad(date.getDate(), 2),
        hours: pad(date.getHours(), 2),
        minute: pad(date.getMinutes(), 2),
        second: pad(date.getSeconds(), 2),
        year: date.getFullYear(),
        fullTime: date.getFullYear() +
            '. ' +
            pad(date.getMonth() + 1, 2) +
            '. ' +
            pad(date.getDate(), 2) +
            '. ' +
            handleNoon(date.getHours()) +
            ' ' +
            pad(date.getHours(), 2) +
            ':' +
            pad(date.getMinutes(), 2) +
            ':' +
            pad(date.getSeconds(), 2),
        timelapse: getTimelapse(time)
    };
}

function handleNoon(time) {
    if (time > 12 && time < 24)
        return '오후';
    else return '오전';
}

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function getTimelapse(duration) {
    let seconds = parseInt(duration % 60);
    let minutes = parseInt((duration / 60) % 60);
    let hours = parseInt(((duration / 60) / 60) % 24);
    let date = parseInt(((duration / 60) / 60) / 24);

    // return date + "d " + hours + "h " + minutes + "m ago";
    return (date == 0 ? "" : (date + "d ")) +
        (hours == 0 ? "" : (hours + "h ")) +
        (minutes == 0 ? "" : (minutes + "m ")) +
        (seconds == 0 ? "" : (seconds + "s ago"));
}
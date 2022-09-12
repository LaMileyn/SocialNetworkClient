export const getFormattedAMPMDate = (inputDate : string) => {
    let date = new Date(inputDate);
    let hours : string | number = date.getHours();
    let minutes : string | number = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
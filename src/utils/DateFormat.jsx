import moment from "moment";

export const dateFormat =(date) =>{
    return moment(date).format('DD-/MM/YYYY')
}


 export const getFormattedDate = (date) => {
    // Format the date as "Day, Month and Time"
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateStr = date.toLocaleString('en-US', options);
    return (dateStr);
}

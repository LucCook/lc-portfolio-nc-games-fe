function formatDate(dateString) {
    const date = new Date(dateString);
    const fullDateString = date.toUTCString();
    return fullDateString.slice(fullDateString.indexOf(" "));
}

export default formatDate
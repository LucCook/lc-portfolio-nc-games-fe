function formatDate(dateString) {
    const date = new Date(dateString);
    const fullDateString = date.toUTCString();
    return fullDateString.slice(fullDateString.indexOf(" "));
}

export const awaitTimeout = delay => new Promise(resolve => setTimeout(resolve, delay))

export default formatDate
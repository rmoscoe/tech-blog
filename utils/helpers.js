module.exports = {
    formatDate: (ymdDate) => {
        const parts = ymdDate.split("-");
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
}
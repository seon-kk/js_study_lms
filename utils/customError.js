class CustomError extends Error {
    constructor(message, status = 400, ...params) {
        super(...params);
        this.status = status;
        this.message = message;
    }
}

module.exports = CustomError;
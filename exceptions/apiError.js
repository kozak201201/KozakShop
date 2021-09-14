module.exports = class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static BadRequest(message = 'Bad request') {
        return new ApiError(400, message);
    }

    static Unauthorize(message = 'Unauthorize') {
        return new ApiError(401, message)
    }

    static NoAccess(message = 'No access') {
        return new ApiError(403, message);
    }
}
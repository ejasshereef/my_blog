

class ApiError extends Error {
    statusCode: number;
    message: string;
    errors: any[]; 
    stack?: string;

    constructor(
        statusCode: number,
        message = "Something went wrong",
        errors: any[] = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, ApiError);
        }
    }
}

export { ApiError };

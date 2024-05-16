export class AppError extends Error {
    statusCode: number;

    constructor(message: string, code: number) {
        super(message);
        this.statusCode = code;
    }
}
import { Request, Response, NextFunction } from "express"

const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("An error occurred");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Unhandled Error';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
    console.log(errMsg);
}

export default ErrorHandler
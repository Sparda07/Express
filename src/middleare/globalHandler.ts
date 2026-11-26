import type { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    if (res.headersSent) {
        next(err);
        return;
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};

export default globalErrorHandler;
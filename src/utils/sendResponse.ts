
import type { Response } from "express";

type TResponse <T> = {
    statusCOde: number;
    success: boolean;
    message: string;
    data ?: T;
    error ?: any;
}

const SendResponse = <T> (res : Response, data : TResponse<T>) => {
    res.status(data.statusCOde).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error,
    });
}

export default SendResponse;
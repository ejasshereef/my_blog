import { NextFunction,Response,Request } from "express";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError";



const errorHandler=(err:ApiError,req:Request,res:Response,next:NextFunction)=>{
    let error:any=err

    if(!(error instanceof ApiError)){
        if (error instanceof mongoose.Error) {
            // If it's a mongoose error, set statusCode to 400
            error = new ApiError(400, "Mongoose Error"
            );
        } else {
            // If it's not a known error type, set statusCode to 500
            error = new ApiError(500, "Something went wrong");
        }
        
        const statusCode=error instanceof mongoose.Error ? 400 : 500

        const message=error.message||"Something went wrong"
        error=new ApiError(statusCode,message,error?.errors||[])
    }

    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Error stack traces should be visible in development for debugging
      };

      //removeUnusedMulterImageFilesOnError(req);
  // Send error response
  return res.status(error.statusCode).json(response);
}

export {errorHandler}
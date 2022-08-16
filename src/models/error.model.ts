export interface ServerError{
    message : string, // type of error
    errors : {
        msg : string,
        param : string,
        location : string
        value? : string,
    } []
}

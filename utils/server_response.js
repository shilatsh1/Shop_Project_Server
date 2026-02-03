export const serverResponse = (res, status = 200, message = "", error=null) =>
  res.status(status).json({message, error: error ? error.message : null}).end();

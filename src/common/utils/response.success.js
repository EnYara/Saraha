// success response
export const successResponse = ({
  res,
  status = 200,
  message = "Done",
  data
} = {}) => {
  return res.status(status).json({
    success: true,
    message,
    ...(data && { data })
  });
};

export const errorResponse = ({
  res,
  status = 500,
  message = "Something went wrong",
  error
} = {}) => {
  return res.status(status).json({
    success: false,
    message,
    ...(error && { error })
  });
};
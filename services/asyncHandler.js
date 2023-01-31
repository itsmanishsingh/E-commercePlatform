const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 401).json({
      success: false,
      message: error.message,
    });
  }
};

export default asyncHandler;

// Above code is similar to this
// const asyncHandler = () => {};
// const asyncHandler = (func) => {};
// const asyncHandler = (func) => () => {};
// const asyncHandler = (func) => async () => {};

// or
// function asyncHandler(fn) {
//     return async function (req, res, next) {
//         try {
//             await fn(req, res, next);
//         } 
//         catch (err) {
//          res.status(err.code || 500).json({
//               success: false,
//          });
//       }
//     };
//   }

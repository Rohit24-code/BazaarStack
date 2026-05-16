"use strict";
// “To avoid repetitive try-catch blocks in async route handlers and automatically forward errors to Express error middleware using next.”
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = asyncHandler;
function asyncHandler(func) {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
}

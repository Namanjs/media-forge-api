import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
    error,
    _request,
    response,
    _next,
) => {
    console.error(error);

    response
        .status(500)
        .type("application/problem+json")
        .json({
            type: "about:blank",
            title: "Internal Server Error",
            status: 500,
            detail: "An unexpected error occurred.",
        });
};

export { errorHandler };
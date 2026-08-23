import type { RequestHandler } from "express";

const notFoundHandler: RequestHandler = (_request, response) => {
    response
        .status(404)
        .type("application/problem+json")
        .json({
            type: "about:blank",
            title: "Not Found",
            status: 404,
            detail: "The requested route does not exist.",
        });
};

export { notFoundHandler };
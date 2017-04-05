import express from "express";
import createError from "http-errors";
import nocache from "nocache";
import config from "../shared/config/config.js";

const api = express.Router();

api.use(nocache());

api.use((req, res, next) => {
    next(createError(404));
});

api.use((err, req, res, next) => {
    const severe = !err.status || err.status === 500;

    if (severe) {
        console.error(err, req); //eslint-disable-line no-console
    }

    if (res.headersSent) {
        return next(err);
    }

    if (severe) {
        if (config.get("buildMode") === "development") {
            res.status(500).json({ message: err.message, stack: err.stack });
        } else {
            res.status(500).json({ message: "Sorry, an error occurred while processing your request." });
        }
    } else {
        res.status(err.status).json({ message: err.message, errors: err.errors });
    }
});

export default api;

const debug = require("debug")("app:core:logger");

const Logs = require("../models/log");

class Logger {
    constructor() {
        this.messages = {
            RUNTIME_ERROR: "Runtime Error",
            CRITICAL_ERROR: "Critical Error",
            NORMAL_ACTIVITY: "Normal Activity",
            SUSPICIOUS_ACTIVITY: "Suspicious Activity"
        };

        this.logTypes = {
            CRITICAL_ERROR: "ce",
            RUNTIME_ERROR: "re",
            NORMAL_ACTIVITY: "na",
            SUSPICIOUS_ACTIVITY: "sa"
        };
    }

    logAsCriticalError({ message, error, data }) {
        this._log({
            type: this.logTypes.CRITICAL_ERROR,
            message,
            error,
            data
        });
    }

    logAsRuntimeError({ message, error, data }) {
        this._log({ type: this.logTypes.RUNTIME_ERROR, message, error, data });
    }

    logAsSuspiciousActivity({ message, data }) {
        this._log({ type: this.logTypes.SUSPICIOUS_ACTIVITY, message, data });
    }

    logAsNormalActivity({ message, data }) {
        this._log({ type: this.logTypes.NORMAL_ACTIVITY, message, data });
    }

    async _log({ type, message, error, data }) {
        debug(
            "\n\n================================",
            type,
            "==================================\n",
            message,
            "\n",
            error ? error : null,
            "\n",

            data ? data : null,
            "\n============================== ===================================\n\n"
        );

        switch (type) {
            case this.logTypes.CRITICAL_ERROR:
                // TODO: Emergency logging with SMS notification after logging
                // messenger.sendSMS(...)
                break;

            default:
                break;
        }

        // TODO: Save into MongoDB
        const log = new Logs({
            type,
            customMessage: message,
            errorMessage: error ? error.message : "",
            errorStack: error ? error.stack : "",
            data
        });

        try {
            if (await log.save()) {
                return true;
            } else {
                console.error("++++++ Failed to save log -> Logger._log()", {
                    type,
                    message,
                    error,
                    data
                });

                return false;
            }
        } catch (error) {
            console.log("Method failed -> Logger._log()", error);
            debug("Method failed -> Logger._log()", error);

            return false;
        }
    }
}

module.exports = new Logger();

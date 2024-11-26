import { validator } from "@/helpers";
import logger from "@/infrastructure/logger";
import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const handleErrorValidation = (
  schema: Schema,
  hasToValidatePayload: boolean = true
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    logger.info("errorValidation | called");
    try {
      const { error } = hasToValidatePayload
        ? validator(schema)(req.body)
        : validator(schema)(req.params);
      if (error) {
        logger.info("errorValidation | failed");

        const msgs = error.details.map((e) => {
          return { message: e.message, path: e.path };
        });
        return res.status(400).json({
          status: 400,
          errors: msgs,
        });
      }
      logger.info("errorValidation | succeeded");

      return next();
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  };
};

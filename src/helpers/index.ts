import { Schema } from "joi";

export const validator =
  <T>(schema: Schema<T>) =>
  (payload: T) =>
    schema.validate(payload, { abortEarly: false });

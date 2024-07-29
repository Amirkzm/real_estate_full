import { ZodError } from "zod";

const zodErrorsExtractor = (err: ZodError) => {
  const errors = err.errors.map((error) => {
    return {
      field: error.path.join("."),
      message: error.message,
    };
  });
  return errors;
};

export default zodErrorsExtractor;

import { AxiosError } from "axios";

export const errorExtractor = (err: AxiosError | Error): string => {
  console.log("raw err in errorExtractor", err);
  if (err instanceof AxiosError) {
    if (err.response) {
      const errorDetails =
        err.response?.data?.errors?.details ||
        err.response?.data?.errors?.message;

      return errorDetails[0].path[0] + " " + errorDetails[0].message;
    } else {
      console.log(err.message);
      return err.message;
    }
  } else {
    return err.message;
  }
};

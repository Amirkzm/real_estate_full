import { AxiosError } from "axios";

export const errorExtractor = (err: AxiosError | Error) => {
  if (err instanceof AxiosError) {
    if (err.response) {
      const errorDetails = err.response?.data?.errors?.details;
      console.log(errorDetails);

      return errorDetails[0].path[0] + " " + errorDetails[0].message;
    } else {
      return err.message;
    }
  } else {
    return err.message;
  }
};

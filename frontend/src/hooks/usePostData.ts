import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { ErrorResponse } from "../types/errors";
import apiRequest from "../lib/apiRequest";
import { errorExtractor } from "../lib/ErrorExtractor";

interface PostDataReturnType {
  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  postData: (
    data: Record<string, any>
  ) => Promise<AxiosResponse<any, any> | undefined>;
}

const usePostData = (url: string, method = "POST"): PostDataReturnType => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postData = async (data: Record<string, any>) => {
    try {
      setErrorMessage("");
      setIsError(false);
      setIsLoading(true);
      const res = await (method === "POST"
        ? apiRequest.post(url, data)
        : apiRequest.put(url, data));
      console.log(res);
      return res;
    } catch (error) {
      setIsError(true);
      setErrorMessage(
        errorExtractor(error as AxiosError<ErrorResponse> | Error)
      );

      // setErrorMessage("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { isError, errorMessage, isLoading, postData };
};

export default usePostData;

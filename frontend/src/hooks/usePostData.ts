import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { ErrorResponse } from "../types/errors";
import apiRequest from "../lib/apiRequest";

interface PostDataReturnType {
  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  postData: (
    data: Record<string, any>
  ) => Promise<AxiosResponse<any, any> | undefined>;
}

const usePostData = (url: string): PostDataReturnType => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postData = async (data: Record<string, any>) => {
    try {
      setErrorMessage("");
      setIsError(false);
      setIsLoading(true);
      const res = await apiRequest.post(url, data);
      return res;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      setIsError(true);
      if (axiosError.response) {
        setErrorMessage(axiosError.response.data as unknown as string);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isError, errorMessage, isLoading, postData };
};

export default usePostData;

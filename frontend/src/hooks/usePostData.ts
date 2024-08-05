import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
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

  const postData = useCallback(
    async (data: Record<string, any>) => {
      try {
        setErrorMessage("");
        setIsError(false);
        setIsLoading(true);
        console.log("data inside usepostdata", data);
        const res = await (method === "POST"
          ? apiRequest.post(url, data)
          : method === "PUT"
          ? apiRequest.put(url, data)
          : apiRequest.delete(url, { data }));
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        setIsError(true);
        setErrorMessage(
          errorExtractor(error as AxiosError<ErrorResponse> | Error)
        );
      } finally {
        setIsLoading(false);
      }
    },
    [method, url]
  );

  return { isError, errorMessage, isLoading, postData };
};

export default usePostData;

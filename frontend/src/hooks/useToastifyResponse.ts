import toast from "react-hot-toast";
import usePostData from "./usePostData";

type UseToastProps = {
  endpoint?: string;
  reqMethod?: "POST" | "PUT" | "DELETE";
};

type ToastifyResponseArgs = {
  onSuccess?: (res: any) => string;
  onError?: (err: Error) => string;
  successMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
} & (
  | { response?: Promise<any>; data?: never }
  | { data?: any; response?: never }
);

const useToastifyResponse = ({
  endpoint,
  reqMethod,
}: UseToastProps): (({ response, data }: ToastifyResponseArgs) => void) => {
  const { isError, errorMessage, isLoading, postData } = usePostData(
    endpoint || "",
    reqMethod
  );

  const toastifyResponse = ({
    response,
    data,
    onSuccess,
    onError,
    successMessage,
    errorMessage: providedErrorMessage,
    loadingMessage,
  }: ToastifyResponseArgs) => {
    const promise = response ?? postData(data);

    toast.promise(
      promise.then((res) => {
        if (res?.status && res?.status >= 200 && res?.status < 300) {
          return res;
        } else {
          throw new Error(errorMessage);
        }
      }),
      {
        loading: loadingMessage || "Loading...",
        success: (res: any) => {
          if (onSuccess) {
            return onSuccess(res);
          }
          return successMessage || "Post created successfully!";
        },
        error: (err: Error) => {
          if (onError) {
            return onError(err);
          }

          return `Error: ${providedErrorMessage || errorMessage}`;
        },
      }
    );
  };

  return toastifyResponse;
};

export default useToastifyResponse;

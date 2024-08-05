import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type useQueryParamsReturnType = {
  searchParams: URLSearchParams;
  updateQueryParams: (newParams: Record<string, string>) => void;
  deleteQueryParam: (param: string) => void;
  getQueryParam: (param: string) => string | null;
};

const useQueryParams = (): useQueryParamsReturnType => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const updateQueryParams = useCallback(
    (newParams: Record<string, string>) => {
      const updatedParams = new URLSearchParams(searchParams);
      Object.keys(newParams).forEach((key) => {
        if (newParams[key]) {
          updatedParams.set(key, newParams[key]);
        } else if (newParams[key] === "" || newParams[key] === "any") {
          updatedParams.delete(key);
        }
      });
      navigate({ search: updatedParams.toString() });
    },
    [navigate, searchParams]
  );

  const deleteQueryParam = useCallback(
    (param: string) => {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete(param);
      navigate({ search: updatedParams.toString() });
    },
    [navigate, searchParams]
  );

  const getQueryParam = useCallback(
    (param: string) => {
      return searchParams.get(param);
    },
    [searchParams]
  );

  return { searchParams, updateQueryParams, deleteQueryParam, getQueryParam };
};

export default useQueryParams;

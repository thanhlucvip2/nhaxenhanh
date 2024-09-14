import { useQuery } from "@tanstack/react-query";

import { axios } from "src/lib/axios";
import { QueryConfig } from "src/lib/react-query";
import { ResponseData, ResponseDetailData } from "src/utils/type";
import { GetProductList } from "../types";

export const getProducts = (): Promise<
  ResponseDetailData<ResponseData<GetProductList>>
> => {
  return axios.get("/products");
};

type UseGetProductsOption = {
  config?: QueryConfig<any>;
};

export const useGetProducts = ({ config }: UseGetProductsOption) => {
  return useQuery<ResponseDetailData<ResponseData<GetProductList>>>({
    ...config,
    queryKey: ["products-list"],
    queryFn: () => getProducts(),
  });
};

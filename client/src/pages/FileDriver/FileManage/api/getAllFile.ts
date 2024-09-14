import { useQuery } from "@tanstack/react-query";

import { axios } from "src/lib/axios";
import { QueryConfig } from "src/lib/react-query";
import { ResponseDetailData } from "src/utils/type";
import { GetAllFile } from "../types";

export const getAllFile = (): Promise<ResponseDetailData<GetAllFile[]>> => {
  return axios.get("/upload");
};

type UseGetAllFileOption = {
  config?: QueryConfig<any>;
};

export const useGetAllFile = ({ config }: UseGetAllFileOption) => {
  return useQuery<ResponseDetailData<GetAllFile[]>>({
    ...config,
    queryKey: ["authority-group-new"],
    queryFn: () => getAllFile(),
  });
};

import { useQuery, UseQueryResult } from "react-query";

interface Props<IRes> {
  key: string | any[];
  queryFn: () => Promise<IRes>;
  options?: {
    enabled?: boolean | undefined;
  };
}

const useGrpcQuery = <IRes>({
  key,
  queryFn,
  options: { enabled = true } = {},
}: Props<IRes>): UseQueryResult<IRes> => {
  return useQuery<IRes>(
    key,
    async () => {
      return await queryFn();
    },
    {
      enabled,
    }
  );
};

export default useGrpcQuery;

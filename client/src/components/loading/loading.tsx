import { useLoading } from "src/hooks/useLoading";
import { Spinner } from "src/components/loading/spinner";

export const Loading = () => {
  const { isLoading } = useLoading();
  return <>{isLoading && <Spinner />}</>;
};

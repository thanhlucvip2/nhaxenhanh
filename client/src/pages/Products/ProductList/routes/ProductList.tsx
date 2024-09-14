import { useGetProducts } from "../api/getProducts";
export const ProductList = () => {
  const { data } = useGetProducts({});

  return (
    <div className="gap-4">
      {data?.data.data.map((item) => {
        return <div key={item.id}> {item.productName} </div>;
      })}
    </div>
  );
};

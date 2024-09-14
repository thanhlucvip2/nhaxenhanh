export type GetProductList = {
  createBy: string;
  createdAt: string;
  description: string;
  id: number;
  inventory: { id: number; quantity: number };
  productName: string;
  size: string;
  sku: number;
  status: number;
  updateBy: string;
  updatedAt: string;
  weight: number;
};

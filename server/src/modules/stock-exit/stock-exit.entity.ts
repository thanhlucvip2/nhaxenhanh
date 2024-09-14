import { BillingExitEntity } from '@modules/billing-exit/billing-exit.entity';
import { ProductsEntity } from '@modules/products/products.entity';
import { BaseEntity } from '@utils/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('stock_exit')
export class StockExitEntity extends BaseEntity {
  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  total_price: number;

  @Column({ type: 'int' })
  export_price: number;

  @ManyToOne(
    () => ProductsEntity,
    (products_entity) => products_entity.stock_entries,
  )
  @JoinColumn({
    name: 'product_id',
  })
  product_id: ProductsEntity;

  @ManyToOne(
    () => BillingExitEntity,
    (billing_exit_entity) => billing_exit_entity.stock_exits,
  )
  @JoinColumn({
    name: 'billing_entry_id',
  })
  billing_exit_id: BillingExitEntity;
}

import { getMaterials } from '@/lib/data-service';
import CreateOrderForm from './create-order-form';

export const metadata = {
  title: 'New Order', 
}

export default async function CreateOrderPage() {
  const materialsFromFile = await getMaterials();

  return <CreateOrderForm materials={materialsFromFile}/>;
}
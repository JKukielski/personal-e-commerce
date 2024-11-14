import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import Image from 'next/image';

export default async function Home() {
  const products = await getAllProducts();
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}

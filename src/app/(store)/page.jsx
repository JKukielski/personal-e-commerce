import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import Link from 'next/link';

export default async function Home() {
  const products = await getAllProducts();
  return (
    <div>
      <Link href="/products"></Link>
    </div>
  );
}

import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div className="flex justify-between">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

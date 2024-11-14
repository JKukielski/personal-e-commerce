import { urlFor } from '@/sanity/lib/image';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import Image from 'next/image';

export default async function Home() {
  const products = await getAllProducts();
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <Image
            alt="test-image"
            src={urlFor(product.image).url()}
            width={300}
            height={200}
          />
        </div>
      ))}
    </div>
  );
}

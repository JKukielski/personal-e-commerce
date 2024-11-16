import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug?.current}`}>
      <div className="border-solid border-2 border-black min-w-[350px] max-w-[350px] flex flex-col gap-4">
        <div className="relative w-full h-[350px] overflow-hidden flex align-center justify-center">
          <Image
            alt="test-image"
            src={urlFor(product.image).url()}
            priority
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <h1>{product.title}</h1>
        <p className="text-red-500">{product.price}</p>
        {/* <p>{product.description}</p> */}
        {/* <PortableText value={product.description} /> */}
      </div>
    </Link>
  );
}

export default ProductCard;

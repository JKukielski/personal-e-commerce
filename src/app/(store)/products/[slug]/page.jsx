import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }
  return <div>{product.title}</div>;
}

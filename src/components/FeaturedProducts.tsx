import ProductCard from './ProductCard'

const products = [
  {
    id: 1,
    name: 'Classic White Shirt',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
    category: 'Women',
  },
  {
    id: 2,
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
    category: 'Men',
  },
  {
    id: 3,
    name: 'Leather Handbag',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
    category: 'Accessories',
  },
  {
    id: 4,
    name: 'Summer Dress',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
    category: 'Women',
  },
  {
    id: 5,
    name: 'Casual Sneakers',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80',
    category: 'Accessories',
  },
  {
    id: 6,
    name: 'Wool Sweater',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
    category: 'Men',
  },
  {
    id: 7,
    name: 'Silk Scarf',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80',
    category: 'Accessories',
  },
  {
    id: 8,
    name: 'Tailored Blazer',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&q=80',
    category: 'Women',
  },
]

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of trending items for this season
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

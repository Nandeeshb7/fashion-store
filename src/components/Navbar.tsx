'use client'

import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link href="/" className="flex items-center ml-4 md:ml-0">
              <span className="text-2xl font-bold text-gray-900">FASHION</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Shop
            </Link>
            <Link href="/women" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Women
            </Link>
            <Link href="/men" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Men
            </Link>
            <Link href="/accessories" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Accessories
            </Link>
            <Link href="/sale" className="text-red-600 hover:text-red-700 font-medium transition-colors">
              Sale
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Search size={20} className="text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User size={20} className="text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Heart size={20} className="text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <ShoppingBag size={20} className="text-gray-700" />
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <Link href="/shop" className="block text-gray-700 hover:text-gray-900 font-medium py-2">
              Shop
            </Link>
            <Link href="/women" className="block text-gray-700 hover:text-gray-900 font-medium py-2">
              Women
            </Link>
            <Link href="/men" className="block text-gray-700 hover:text-gray-900 font-medium py-2">
              Men
            </Link>
            <Link href="/accessories" className="block text-gray-700 hover:text-gray-900 font-medium py-2">
              Accessories
            </Link>
            <Link href="/sale" className="block text-red-600 hover:text-red-700 font-medium py-2">
              Sale
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

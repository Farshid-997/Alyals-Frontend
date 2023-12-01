'use client';
import { useProductsQuery } from '@/redux/api/adminApi/productApi';
import { addToCart } from '@/redux/api/cartApi/cartApi';
import { useAppDispatch } from '@/redux/hooks';
import { IProduct } from '@/types';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Key, useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
export default function NewProduct() {
  const router = useRouter();
  const { data } = useProductsQuery({});

  const products = data?.products || [];
  const meta = data?.meta;

  const dispatch = useAppDispatch();

  const handleAddToCart = (item: {
    id: any;
    name: any;
    price: any;
    image: any;
  }) => {
    console.log('tigger');
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    );
  };
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl text-center">
            New Arrival
          </h2>
        </header>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {products
            ?.filter(
              (p: IProduct | null | undefined) => p?.productstate === 'new'
            )
            .map(
              (product: {
                id: Key | null | undefined;
                image: string | undefined;
                name: string | number;
                price: string | number;
              }) => (
                <div key={product?.id}>
                  <div className="group relative block overflow-hidden">
                    <button className="absolute end-4 top-4 z-8 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                      <span className="sr-only">Wishlist</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </button>

                    <Link href={`/products/${product?.id}`}>
                      <Image
                        src={product?.image || 'default-image-url'}
                        alt=""
                        className="h-20 w-full object-fill transition duration-500 group-hover:scale-105 sm:h-72 cursor-pointer hover:brightness-100"
                        width={150}
                        height={150}
                      />
                    </Link>

                    <div className="p-6  h-fit w-full">
                      <p className="whitespace-normal ms-2 text-center text-sm line-clamp-1 ">
                        {product?.name}
                      </p>

                      <div className="flex items-center mb-2 mt-2 ms-10 text-yellow-500">
                        {' '}
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />{' '}
                      </div>

                      <p className="text-center">৳ {product?.price}</p>

                      <p
                        className="text-gray-500 text-center hover:text-black cursor-pointer font-bold"
                        onClick={() => {
                          handleAddToCart(product);
                        }}
                      >
                        {' '}
                        ADD to Cart
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </section>
  );
}

'use client';
import { useProductsQuery } from '@/redux/api/adminApi/productApi';
import { addToCart } from '@/redux/api/cartApi/cartApi';
import { useAppDispatch } from '@/redux/hooks';


import { IProduct } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Key, useState } from 'react';
import { FaEye, FaLuggageCart, FaRegStar } from 'react-icons/fa';
export default function ProductsList() {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [inStock, setInStock] = useState<boolean>(false);
  const [outOfStock, setOutOfStock] = useState<boolean>(false);

  const query: Record<string, any> = {};

  const { data: productsData } = useProductsQuery({
    ...(minPrice || maxPrice
      ? { minPrice: parseFloat(minPrice), maxPrice: parseFloat(maxPrice) }
      : {}),
    stock: inStock ? 'in-stock' : outOfStock ? 'out-stock' : undefined,
  });

  if (!!minPrice && !!maxPrice) {
    query['minPrice'] = minPrice;
    query['maxPrice'] = maxPrice;
  }

  if (inStock) {
    query['inStock'] = inStock;
  }

  if (outOfStock) {
    query['outOfStock'] = outOfStock;
  }

  console.log('query', query);
  const products = productsData?.products || [];

  const resetStockFilterData = () => {
    setInStock(false);
    setOutOfStock(false);
  };

  const resetFilterData = () => {
    setMaxPrice('');
    setMinPrice('');
  };
  const dispatch = useAppDispatch();

  const handleAddToCart = (item: {
    id: any;
    name: any;
    price: any;
    image: any;
  }) => {
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
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl text-center font-sans mt-10 mb-10">
            Product Collection
          </h2>
        </header>

        <div className="mt-8 sm:flex sm:items-center sm:justify-between">
          <div className="hidden sm:flex sm:gap-4">
            <div className="relative">
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                  <span className="text-sm font-medium"> Availability </span>

                  <span className="transition group-open:-rotate-180">
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
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
                  <div className="w-96 rounded border border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        {' '}
                        Select Checkbox
                      </span>

                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                        onClick={resetStockFilterData}
                      >
                        Reset
                      </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      <li>
                        <label
                          htmlFor="FilterInStock"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterInStock"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={inStock}
                            onChange={(e) => {
                              setInStock(e.target.checked);
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            In Stock
                          </span>
                        </label>
                      </li>

                      <li>
                        <label
                          htmlFor="FilterOutOfStock"
                          className="inline-flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            id="FilterOutOfStock"
                            className="h-5 w-5 rounded border-gray-300"
                            checked={outOfStock}
                            onChange={(e) => {
                              setOutOfStock(e.target.checked);
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            Out of Stock
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>

            <div className="relative">
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                  <span className="text-sm font-medium"> Price </span>

                  <span className="transition group-open:-rotate-180">
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
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
                  <div className="w-96 rounded border border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">
                      <span className="text-sm text-gray-700">
                        Select the price
                      </span>

                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                        onClick={resetFilterData}
                      >
                        Reset
                      </button>
                    </header>

                    <div className="border-t border-gray-200 p-4">
                      <div className="flex justify-between gap-4">
                        <label
                          htmlFor="FilterPriceFrom"
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm text-gray-600">Min</span>

                          <input
                            type="number"
                            id="FilterPriceFrom"
                            placeholder="Min Price"
                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-3"
                            value={minPrice}
                            onChange={(e) => {
                              setMinPrice(e.target.value);
                            }}
                          />
                        </label>

                        <label
                          htmlFor="FilterPriceTo"
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm text-gray-600">Max</span>

                          <input
                            type="number"
                            id="FilterPriceTo"
                            placeholder="Max Price"
                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-3"
                            value={maxPrice}
                            onChange={(e) => {
                              setMaxPrice(e.target.value);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 font-sans my-14">
          {products
            ?.filter(
              (p: IProduct | null | undefined) => p?.productstate === 'normal'
            )
            .map(
              (product: {
                id: Key | null | undefined;
                image: string | undefined;
                name: string | number;
                price: string | number;
                stock: string | undefined;
              }) => (
                <div key={product?.id} className="group relative">
                  <div className="block relative overflow-hidden">
                    <button className="absolute end-4 top-4 z-8 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                      <span className="sr-only font-sans">Wishlist</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </button>

                    <div className="relative group">
                      <Image
                        src={product?.image || 'default-image-url'}
                        alt=""
                        className=" w-full object-fill transition duration-500 group-hover:scale-105 sm:h-72 cursor-pointer hover:brightness-50 "
                        width={150}
                        height={150}
                      />
                      <div className="absolute inset-0 bg-[#D8E4DD] opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="text-black font-semibold">
                          {/* Add your overlay content here */}
                          <div className="flex items-center mb-2 mt-3 text-yellow-600 ml-3">
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                          </div>
                          <p className="text-center font-sans mt-6">
                            {product?.price}৳
                          </p>

                          <div className="flex justify-evenly mt-8 ">
                            <Link href={`/products/${product?.id}`}>
                              <FaEye className=" cursor-pointer w-[30px] h-[30px] text-yellow-800" />
                            </Link>

                            <FaLuggageCart
                              className="cursor-pointer w-[30px] h-[30px] text-red-800"
                              onClick={() => {
                                handleAddToCart(product);
                              }}
                            />
                          </div>

                          {/* <h5
                              className=" text-center  cursor-pointer font-bold font-sans shadow-md  p-2 mt-6 text-xl text-[#3D0C02] border-none "
                              onClick={() => {
                                handleAddToCart(product);
                              }}
                            >
                              Add To Cart
                            </h5> */}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 h-fit w-full">
                      <p className="whitespace-normal ms-2 text-center text-sm line-clamp-1 font-sans font-semibold ">
                        {product?.name}
                      </p>

                      <p className="font-sans text-center"> {product?.stock}</p>
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

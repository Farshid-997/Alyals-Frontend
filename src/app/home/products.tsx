'use client';
import { Reveal } from '@/lib/Reveal';
import { useAllbrandsQuery } from '@/redux/api/adminApi/brandApi';
import { useAllcategorysQuery } from '@/redux/api/adminApi/categoryApi';
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
  const [sale, setSale] = useState<boolean>(false);
  const [regular, setRegular] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const query: Record<string, any> = {};

  const { data: productsData } = useProductsQuery({
    ...(minPrice || maxPrice
      ? { minPrice: parseFloat(minPrice), maxPrice: parseFloat(maxPrice) }
      : {}),
    stock: sale ? 'sale' : regular ? 'regular' : undefined,
    brand: selectedBrand,
    category: selectedCategory,
  });

  if (!!minPrice && !!maxPrice) {
    query['minPrice'] = minPrice;
    query['maxPrice'] = maxPrice;
  }

  if (sale) {
    query['sale'] = sale;
  }

  if (regular) {
    query['regular'] = regular;
  }

   if (selectedBrand) {
     query['brand'] = selectedBrand;
   }
 if (selectedCategory) {
   query['category'] = selectedCategory;
 }

 
 
  const products = productsData?.products || [];

 
   const { data, isLoading } = useAllbrandsQuery(query);
 const { data:category, isLoading:load } = useAllcategorysQuery(query);
 
  const resetStockFilterData = () => {
    setSale(false);
    setRegular(false);
  };

  const resetBrandData = () => {
    setSelectedBrand("")
    setSelectedCategory;
  };


    const resetCategoryData = () => {
    
      setSelectedCategory("")
    };



  const resetFilterData = () => {
    setMaxPrice('');
    setMinPrice('');
  };

  const handleBrandSelect = (brandName: string) => {
  

    setSelectedBrand(brandName);
    
    
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
   
    
  };

  const dispatch = useAppDispatch();

  const handleAddToCart = (item: {
    id: any;
    name: any;
    price: any;
    image: any;
    discount:number
  }) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        discount:item.discount
      })
    );
  };
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-8">
        <header>
          <Reveal>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl text-center font-sans mt-10 mb-10">
              Product Collection
            </h2>
          </Reveal>
        </header>

        <div className="mt-8 sm:flex sm:items-center sm:justify-between ">
          <div className="hidden sm:flex sm:gap-4">
            {/* stock filter */}
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
                            checked={sale}
                            onChange={(e) => {
                              setSale(e.target.checked);
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            Sale
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
                            checked={regular}
                            onChange={(e) => {
                              setRegular(e.target.checked);
                            }}
                          />

                          <span className="text-sm font-medium text-gray-700">
                            Regular
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>

            {/* price filter */}
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

            {/* brand filter */}

            <div className="relative">
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                  <span className="text-sm font-medium"> Brand </span>

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
                        Select the Brand
                      </span>

                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                        onClick={resetBrandData}
                      >
                        Reset
                      </button>
                    </header>

                    <div className="border-t border-gray-200 p-4">
                      {data?.map((brand: any) => (
                        <p
                          key={brand?.id}
                          className="text-md cursor-pointer font-semibold my-4"
                          onClick={() => handleBrandSelect(brand?.name)}
                        >
                          {brand?.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            </div>

            {/* category filter */}

            <div className="relative">
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                  <span className="text-sm font-medium">Category </span>

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
                        Select the Category
                      </span>

                      <button
                        type="button"
                        className="text-sm text-gray-900 underline underline-offset-4"
                        onClick={resetCategoryData}
                      >
                        Reset
                      </button>
                    </header>

                    <div className="border-t border-gray-200 p-4">
                      {category?.map((category: any) => (
                        <p
                          key={category?.id}
                          className="text-md cursor-pointer font-semibold my-4"
                          onClick={() => handleCategorySelect(category?.name)}
                        >
                          {category?.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>

        <div className=" grid gap-5 sm:grid-cols-2 lg:grid-cols-5 font-sans mt-8">
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
                discount: number;
              }) => (
                <div key={product?.id} className="group relative my-8">
                  <Reveal>
                    <div className="block relative overflow-hidden">
                      <p className="absolute end-4 top-4 z-8 rounded-full  p-1.5 text-blue-700 transition  font-bold font-sans tex-xl">
                        {product?.discount ? `${product.discount} %` : ''}
                      </p>

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
                          </div>
                        </div>
                      </div>

                      <div className="p-6 h-fit w-full">
                        <p className="whitespace-normal ms-2 text-center text-sm line-clamp-1 font-sans font-semibold ">
                          {product?.name}
                        </p>

                        <p className="font-sans text-center">
                          {' '}
                          {product?.stock}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              )
            )}
        </div>
      </div>
    </section>
  );
}

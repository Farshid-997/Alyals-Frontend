'use client';
import Footer from '@/app/home/footer';
import { useProductIdQuery } from '@/redux/api/adminApi/productApi';
import { addToCart } from '@/redux/api/cartApi/cartApi';
import { useAppDispatch } from '@/redux/hooks';
import { useState } from 'react';

import Image from 'next/image';
import NavbarPage from './../../home/navbar';






export default function ProductDetails({ params }: { params: { id: string } }) {
  const { data } = useProductIdQuery(params?.id);


  const [activeImg, setActiveImage] = useState(data?.image);

  const [amount, setAmount] = useState(0);

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
        quantity: amount > 0 ? amount : 1,
        discount:item.discount
      })
    );
  };


 
  return (
    <div className="max-w-screen-xl mx-auto">
      <NavbarPage />
      <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <Image
              src={data?.image}
              width={400}
              height={400}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-row justify-between h-24">
              <Image
                src={data?.image}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                width={100}
                height={100}
                onClick={() => setActiveImage(data?.image)}
              />
              <Image
                src={data?.image}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(data?.image)}
                width={100}
                height={100}
              />
              <Image
                src={data?.image}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(data?.image)}
                width={100}
                height={100}
              />
              <Image
                src={data?.image}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(data?.image)}
                width={100}
                height={100}
              />
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span
                className="  font-semibold"
                style={{ color: '#1E3A8A' }}
              >
                Product Details
              </span>
              <h1 className="text-3xl font-bold">{data?.name}</h1>
            </div>
            <p className="text-gray-700">{data?.description}</p>
            <h6 className="text-2xl font-semibold">৳ {data?.price}</h6>
            <div className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount(amount > 1 ? amount - 1 : 1)}
                >
                  &minus;
                </button>
                <span className="py-4 px-6 rounded-lg">{amount}</span>

                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                  onClick={() => setAmount(amount + 1)}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => {
                  handleAddToCart(data);
                }}
                className=" text-white font-semibold py-3 px-16 rounded-xl h-full"
                style={{ backgroundColor: '#1E3A8A' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

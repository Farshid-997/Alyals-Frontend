'use client';

import Image from 'next/image';

export default function OfferingSection() {
  return (
    <div className="flex justify-between bg-blue-900 mt-14 mb-7 max-w-screen-xl h-32 p-10">
      <div className="flex">
        <Image
          src="https://art-furniture-3.myshopify.com/cdn/shop/files/2_2d88b772-fb81-4764-9c06-12c393cba637.png?v=1618739040"
          alt=""
          width={50}
          height={50}
        ></Image>

        <div className="ml-2">
          <h3 className="text-white">Free Shipping</h3>
          <p className="text-white">On all orders over $5</p>
        </div>
      </div>

      <div className="flex">
        <Image
          src="https://art-furniture-3.myshopify.com/cdn/shop/files/3.png?v=1618739063"
          alt=""
          width={50}
          height={50}
        ></Image>

        <div className="ml-2">
          <h3 className="text-white">Free Returns</h3>
          <p className="text-white">Returns are free with 9 days</p>
        </div>
      </div>

      <div className="flex">
        <Image
          src="https://art-furniture-3.myshopify.com/cdn/shop/files/4.png?v=1618739085"
          alt=""
          width={50}
          height={50}
        ></Image>

        <div className="ml-2">
          <h3 className="text-white">100% Payment secure</h3>
          <p className="text-white">Your payment are safe with us</p>
        </div>
      </div>

      <div className="flex">
        <Image
          src="https://art-furniture-3.myshopify.com/cdn/shop/files/5.png?v=1618739108"
          alt=""
          width={50}
          height={50}
          className="mt-2"
        ></Image>

        <div className="ml-2">
          <h3 className="text-white">Support 24/7</h3>
          <p className="text-white">Contact us 24 hours a day</p>
        </div>
      </div>
    </div>
  );
}

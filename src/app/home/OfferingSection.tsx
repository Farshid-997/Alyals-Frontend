'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
export default function OfferingSection() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="flex flex-col justify-around  gap-10 md:flex-row  rounded-md mt-20 mb-7 max-w-screen-xl ">
          <div className="flex items-center mb-4 md:mb-0  shadow-md p-6 bg-[#CBC5B9] rounded-md">
            <Image
              src="https://cdn-icons-png.flaticon.com/512/2037/2037477.png"
              alt=""
              width={50}
              height={50}
            />
            <div className="ml-4">
              <h3 className="text-black font-sans font-semibold">
                Free Shipping
              </h3>
              <p className="text-black font-sans font-semibold">
                On all orders over $5
              </p>
            </div>
          </div>

          <div className="flex items-center mb-4 md:mb-0 shadow-md p-6 bg-gray-300 rounded-md">
            <Image
              src="https://en.gliamicidipierrot.com/wp-content/uploads/2015/09/returns.gif"
              alt=""
              width={50}
              height={50}
            />
            <div className="ml-2">
              <h3 className="text-black font-sans font-semibold">
                Free Returns
              </h3>
              <p className="text-black font-sans font-semibold">
                Returns are free within 9 days
              </p>
            </div>
          </div>

          <div className="flex items-center mb-4 md:mb-0 shadow-md p-6 bg-[#EBEACA] rounded-md">
            <Image
              src="https://cdn.vectorstock.com/i/preview-1x/83/93/secure-logo-badge-design-ic-vector-38848393.jpg"
              alt=""
              width={30}
              height={30}
            />
            <div className="ml-2">
              <h3 className="text-black font-sans font-semibold">
                100% Payment secure
              </h3>
              <p className="text-black font-sans font-semibold">
                Your payments are safe with us
              </p>
            </div>
          </div>

          <div className="flex items-center mb-4 md:mb-0 shadow-md p-6 bg-[#EACEC3] rounded-md">
            <Image
              src="https://static.helpjuice.com/helpjuice_production/uploads/upload/image/4752/direct/1649785851474-24-7%20Customer%20Service%20Tech%20Support.png"
              alt=""
              width={50}
              height={50}
              className="mt-2"
            />
            <div className="ml-2">
              <h3 className="text-black font-sans font-semibold">
                Support 24/7
              </h3>
              <p className="text-black font-sans font-semibold">
                Contact us 24 hours a day
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

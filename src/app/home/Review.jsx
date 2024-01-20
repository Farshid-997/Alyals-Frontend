"use client"
import { Reveal } from '@/lib/Reveal';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
export default function Review() {


  return (
    <>
      <section className="container flex items-center my-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 lg:w-1/2">
              <Reveal>
                <h2 className="text-3xl font-semibold mb-2 font-sans">
                  Products
                  <span className="text-red-900 underline underline-offset-4 font-sans ml-2">
                    Reviwes
                  </span>{' '}
                  From our customers
                </h2>
              </Reveal>

              <Reveal>
                <p className="font-light font-sans ">
                  New and best seller product review!
                </p>
              </Reveal>
            </div>

            <div className="max-w-xl">
              <div className="  p-6 rounded-lg shadow-xl">
                <p className="text-lg font-sans">
                  Good Product and best packaging. Got the same product which I
                  was Purchased
                </p>
                <div className="flex mt-4 justify-end">
                  <div className="w-14 h-14 mr-4 md:w-16 md:h-16">
                    <Image
                      className="rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRreh9Fwfj6mP6s9CINDCpfUXmi6OrRXJoD8fFI7BV01mzbbC1FhW5MLGQZYgH9PJ8UhC0&usqp=CAU"
                      alt="John Doe Profile Picture"
                      height={50}
                      width={50}
                    />
                  </div>

                  <div className="md:text-lg">
                    <div className="flex flex-row">
                      <p className="font-semibold mr-2 font-sans">John Doe</p>
                    </div>
                    <p className="text-sm">
                      <a
                        href="#"
                        className="hover:underline hover:cursor-pointer hover:text-blue-500 transition-colors duration-75"
                      >
                        <div className="flex items-center mb-2 mt-3 text-yellow-600 ">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

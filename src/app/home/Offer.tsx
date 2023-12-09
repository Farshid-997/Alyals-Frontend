'use client';

export default function Offer() {
  return (
    <div className="flex h-screen justify-center items-center flex-col -mt-24">
      <div className="w-full h-96 bg-[url('https://htmldemo.net/harosa/harosa-v2/assets/images/bg/bg_newletter.webp')] bg-cover bg-center  transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ">
        <div
          className="w-full h-full flex  justify-center items-center
             bg-blue-900/30  cursor-pointer flex-col  "
        >
          <label className="mb-2 text-white text-xl font-sans">Huge Sale</label>
          <span className="text-white text-4xl w-1/2 text-center font-sans">
            Offers 50% On Any Product
          </span>

          <button className="bg-blue-900 mt-4 text-white p-4 rounded-md w-40 font-sans">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

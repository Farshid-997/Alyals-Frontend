'use client';

export default function News() {
  return (
    <>
      <div className="border border-slate-100 w-max-w-screen-xl "></div>

      <section className="bg-white mb-3">
        <div className="py-8 px-4 mx-auto max-w-screen-2xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">
              Sign up for our newsletter
            </h2>
            <p className="mx-auto mb-8 max-w-2xl  text-gray-700 md:mb-12 sm:text-xl font-semibold">
              Stay up to date with the roadmap progress, announcements and
              exclusive discounts feel free to sign up with your email.
            </p>
            <form>
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="hidden mb-2 text-sm font-medium"
                  >
                    Email address
                  </label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    className="block p-3 pl-10 w-full text-sm  rounded-lg border border-yellow-500 sm:rounded-none focus:outline-none sm:rounded-l-lg font-sans"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-3 px-7 w-full text-sm font-medium text-center rounded-md  bg-blue-900 text-white font-sans"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-700 newsletter-form-footer font-light font-sans">
                We care about the protection of your data.{' '}
                <a
                  href="#"
                  className="font-medium text-primary-600 dark:text-primary-500 hover:underline font-sans"
                >
                  Read our Privacy Policy
                </a>
                .
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

'use client';
import { useAllblogsQuery } from '@/redux/api/adminApi/blogApi';
import { Key } from 'react';
export default function BlogPage() {
  const { data } = useAllblogsQuery({});
   console.log(data)
  const blogs = data || [];

  return (
    <section className="mb-20">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl text-center font-sans mt-10 mb-10">
           New Blogs
          </h2>
        </header>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blogs?.map(
            (blog: {
              id: Key | null | undefined;
              authorName:string|undefined
              image: string;
              title: string | undefined;
              content: string | undefined;
            }) => (
              <div className="max-w-screen-lg mx-auto" key={blog?.id}>
                <div className="bg-white  border border-gray-200 rounded-lg max-w-sm mb-5">
                  <div>
                    <img
                      style={{objectFit:"cover",width:"300px",height:"300px"}}
                      src={blog?.image}
                      alt="blogs image"
                      // width={300}
                      // height={300}
                    />
                  </div>
                  <div className="p-5">
                    <div >
                      <h5 className="text-gray-900 font-bold text-xl tracking-tight mb-2">
                      {blog?.title}
                      </h5>
                    </div>
                    <p className="font-normal text-gray-700 mb-3">
                    {
                      blog?.content?.slice(0,50)
                    }......
                    </p>
                    <p
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                      
                    >
                      Read more
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

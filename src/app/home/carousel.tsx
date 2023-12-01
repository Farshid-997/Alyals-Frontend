import { Carousel } from 'antd';
import Image from 'next/image';

export default function CarouselPage() {
  return (
    <div className="carousel-container">
      <Carousel effect="fade" autoplay infinite className="carousel">
        <div className="carousel-item">
          <Image
            src="https://cdn.shopify.com/s/files/1/0410/9608/5665/t/3/assets/pf-7115f8d1--cover-image-2.jpg?v=1614833751"
            width={1000}
            height={500}
            alt="image"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="carousel-item">
          <Image
            src="https://plugins-media.makeupar.com/smb/blog/post/2021-05-28/394bcea3-e2ac-4d96-b8cd-df695e396628.jpg"
            width={1000}
            height={500}
            alt="image"
            className="w-full h-80 object-cover" // Tailwind classes to set width and height
          />
        </div>
        <div className="carousel-item">
          <Image
            src="https://media.licdn.com/dms/image/D5612AQGo7wyaWNnmnw/article-cover_image-shrink_720_1280/0/1679996011955?e=2147483647&v=beta&t=FJjQcrvOMXl7Vz5WRpjWmnXExnz-6vA2z6vUM-pPPz4"
            width={1000}
            height={500}
            alt="image"
            className="w-full h-80 object-cover" // Tailwind classes to set width and height
          />
        </div>
        <div className="carousel-item">
          <Image
            src="https://img.freepik.com/free-vector/vector-cosmetic-banner-promotion-brand_88138-89.jpg?1&w=1380&t=st=1701239046~exp=1701239646~hmac=af6c2b5ebb2f7570de6cb35330598ca975dd4ff60acfdc49cd58035bf94a6d71"
            width={1000}
            height={500}
            alt="image"
            className="w-full h-80 object-cover" // Tailwind classes to set width and height
          />
        </div>
      </Carousel>
    </div>
  );
}

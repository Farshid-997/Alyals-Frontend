import { Carousel } from 'antd';
import Image from 'next/image';
import img1 from "../../Assest/1702734417460.jpg";
import img2 from '../../Assest/1702734417475.jpg';
import img3 from '../../Assest/1702734484449.jpg';
import img4 from '../../Assest/1702734484466.jpg';
export default function CarouselPage() {
  return (
    <div className="carousel-container">
      <Carousel effect="fade" autoplay infinite className="carousel">
        <div className="carousel-item">
          <Image
            src={img1}
            // width={1000}
            // height={600}
            alt="image"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="carousel-item">
          <Image
            src={img2}
            // width={1000}
            // height={600}
            alt="image"
            className="w-full h-80 object-cover" // Tailwind classes to set width and height
          />
        </div>
        <div className="carousel-item">
          <Image
            src={img3}
            // width={1000}
            // height={600}
            alt="image"
            className="w-full h-80 object-cover" // Tailwind classes to set width and height
          />
        </div>
        <div className="carousel-item">
          <Image
            src={img4}
            // width={1000}
            // height={600}
            alt="image"
            className="w-full h-80 object-cover" // Tailwind classes to set width and height
          />
        </div>
      </Carousel>
    </div>
  );
}

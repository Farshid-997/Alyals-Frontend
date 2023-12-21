import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from '../loading';
import NewProduct from './NewProduct';
import News from './News';
import Offer from './Offer';
import OfferingSection from './OfferingSection';
import Review from './Review';
import CarouselPage from './carousel';
import Footer from './footer';
import Navbar from './navbar';
import ProductsList from './products';
import SideSection from './sectionSIde';

function HomePage() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Suspense fallback={<Loading />}>
        <Navbar />

        <CarouselPage />
        <OfferingSection />
        <ProductsList />
        <NewProduct />
        <SideSection />
        <Offer />
        <Review />
        <News />

        <Footer />
      </Suspense>
    </div>
  );
}

export default dynamic(() => Promise.resolve(HomePage), { ssr: false });

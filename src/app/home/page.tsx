import dynamic from 'next/dynamic';
import NewProduct from './NewProduct';
import OfferingSection from './OfferingSection';
import CarouselPage from './carousel';
import Footer from './footer';
import Navbar from './navbar';
import ProductsList from './products';
import SideSection from './sectionSIde';

function HomePage() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Navbar />

      <CarouselPage />
      <OfferingSection />
      <ProductsList />
      <NewProduct />
      <SideSection />
      {/* <SectionPage></SectionPage> */}
      <Footer />
    </div>
  );
}

export default dynamic(() => Promise.resolve(HomePage), { ssr: false });

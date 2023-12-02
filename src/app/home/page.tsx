import dynamic from 'next/dynamic';
import CarouselPage from './carousel';
import CollectionPage from './collection';
import Footer from './footer';
import Navbar from './navbar';
import ProductsList from './products';
import SectionPage from './section';
import SideSection from './sectionSIde';
import ServiceList from './services';
import Testmonial from './testmonial';
import NewProduct from './NewProduct';

function HomePage() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Navbar />
      <CarouselPage />
      <ProductsList />
      <NewProduct />
    
      <Footer />
    </div>
  );
}

export default dynamic(() => Promise.resolve(HomePage), { ssr: false });

import Hero from '@/components/Hero';
import About from '@/components/About';
import Signatures from '@/components/Signatures';
import Ticker from '@/components/Ticker';
import Starters from '@/components/Starters';
import RiceDelights from '@/components/RiceDelights';
import OrderOnline from '@/components/OrderOnline';
import MenuSection from '@/components/MenuSection';
import PlattersBanner from '@/components/PlattersBanner';
import Events from '@/components/Events';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Visit from '@/components/Visit';
import StayConnected from '@/components/StayConnected';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Signatures />
      <Ticker
        variant="dark"
        items={['Tandoori', 'Biryani', 'Butter Chicken', 'Dal Makhni', 'Naan', 'Malai Chaap', 'Paneer Tikka', 'Rogan Josh']}
      />
      <Starters />
      <RiceDelights />
      <OrderOnline />
      <MenuSection />
      <Ticker
        items={['Butter Chicken', 'Dal Makhni', 'Biryani', 'Tandoori', 'Paneer Tikka', 'Garlic Naan', 'Rogan Josh', 'Seekh Kebab']}
      />
      <PlattersBanner />
      <Events />
      <Gallery />
      <Reviews />
      <Visit />
      <StayConnected />
    </>
  );
}

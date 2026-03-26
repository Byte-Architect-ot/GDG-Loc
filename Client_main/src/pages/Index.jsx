import Header from '@/components/Header';
import First from '@/components/First';
import Explore from '@/components/Explore';
import About from '@/components/About';
import Events from '@/components/Events';
import Team from '@/components/Team';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <First />
        <Explore />
        <About />
        <Events />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

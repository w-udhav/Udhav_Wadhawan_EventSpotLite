import AppTemplate from "./components/layouts/AppTemplate";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import EventsListing from "./components/EventsListing";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />

      <HeroSection />

      <AppTemplate className="my-10 md:my-20">
        <div className="flex flex-col gap-20">
          <EventsListing />
        </div>
      </AppTemplate>

      <Footer />
    </div>
  );
}

export default App;

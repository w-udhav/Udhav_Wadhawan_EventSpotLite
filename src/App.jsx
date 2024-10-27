import AppTemplate from "./components/layouts/AppTemplate";
import diljit from "./assets/diljit/posterVid.mp4";
import SectionHeader from "./components/SectionHeader";
import Navbar from "./components/Navbar";
import Icon from "./components/Icon";
import HeroSection from "./components/HeroSection";
import EventCard from "./components/EventCard";
import EventsListing from "./components/EventsListing";

function App() {
  return (
    <div>
      <Navbar />

      <HeroSection />

      <AppTemplate className="mt-20">
        <div className="flex flex-col gap-20">
          <section className="">
            <SectionHeader title="For You" />
          </section>

          <EventsListing />
        </div>
      </AppTemplate>
    </div>
  );
}

export default App;

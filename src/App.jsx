import AppTemplate from "./components/layouts/AppTemplate";
import diljit from "./assets/diljit/posterVid.mp4";
import SectionHeader from "./components/SectionHeader";
import Navbar from "./components/Navbar";
import Icon from "./components/Icon";

function App() {
  return (
    <div>
      <Navbar />
      <AppTemplate wantFull={true} className="mb-12">
        <div className="w-full rounded h-[60vh] md:h-full md:max-h-[80vh] overflow-hidden relative">
          <div className="w-full h-full absolute top-0 left-0 bg-black/45 flex items-end">
            <div className="absolute w-full top-0 left-0 right-0 h-52 bg-gradient-to-b from-black to-transparent" />
            <div className="absolute w-full bottom-0 left-0 right-0 h-20 bg-gradient-to-b to-background from-transparent" />

            <div className="w-full flex flex-col items-center pb-12">
              <h3 className="font-semibold text-xl md:text-4xl text-zinc-400">
                Most Popular
              </h3>
              <h1 className="text-textWhite font-black text-5xl md:text-7xl">
                Diljit Dosanjh
              </h1>
            </div>
          </div>
          <div className="w-full h-full absolute top-0 right-0"></div>
          <video
            src={diljit}
            className="w-full h-full object-cover"
            autoPlay
            loop={true}
            controls={false}
            muted
            playsInline
          ></video>
        </div>
      </AppTemplate>
      <AppTemplate className="flex flex-col gap-5">
        <section className="flex items-center justify-between border">
          <SectionHeader title="Explore Local Events" />
          <button>
            <Icon
              name="search"
              className="text-3xl text-rose-200 font-medium bg-white/10 p-2 w-12 h-[46px] flex justify-center items-center rounded-full"
            />
          </button>
        </section>
      </AppTemplate>
    </div>
  );
}

export default App;

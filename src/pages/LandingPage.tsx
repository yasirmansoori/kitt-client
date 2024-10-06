import Navbar from "../components/Navbar/Navbar";
import FeaturedCard from "../components/Helpers/FeaturedCard";
import data from "../data.json";
import Footer from "../components/Fotter/Footer";
import Faqs from "../components/Faqs/Faqs";
import Divider from "../components/Helpers/Divider";
import SearchPanel from "../components/Panel/SearchPanel";
import OfferSection from "../components/Offers/OfferSection";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRef } from "react";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // scroll left
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  // scroll right
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />

      {/* content */}
      <div className="mt-24 max-w-screen-lg mx-auto w-full">
        {/* center heading  */}
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-xl sm:text-4xl font-bold tracking-widest">
            Find And Book
          </h1>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-widest">
            A Great Experience
          </h1>
        </div>

        {/* image vector  */}
        <img
          src="https://res.cloudinary.com/dnjcut34n/image/upload/v1728043873/KITT/flight-image_w950w6.png"
          alt="vector"
          className="hidden sm:block"
        />

        {/* image vector on mobile  */}
        <img
          src="https://res.cloudinary.com/dnjcut34n/image/upload/v1728174920/KITT/10782884_19199292_ojs4xt.jpg"
          alt="vector"
          className="sm:hidden"
        />

        {/* search Panel  */}
        <SearchPanel />

        {/* divider */}
        <Divider />

        {/* promo section */}
        <div className="grid sm:grid-cols-4 m-4 sm:m-0">
          <h1 className="text-2xl font-medium">
            Big <br /> Promo
          </h1>

          <h1 className="text-4xl font-medium col-span-2 mb-2 sm:mb-2">
            Limited Time Offer <br />
            Book Now and Save <br />
            Big!
          </h1>

          <div className="flex flex-col gap-4">
            <h1 className="text-sm font-normal text-gray-400">
              Big Promo Alert! Are you ready for the ultimate adventure at an
              unbeatable price? Kitt is thrilled to announce our latest Big
              Promo, offering you <strong>30% off</strong> on all flights. Book
              now and save big!
            </h1>

            {/* button here */}
            <button
              type="button"
              className="text-white p-1 px-4 border rounded-2xl bg-black hover:scale-105 transition-all"
              onClick={scrollToTop}
            >
              Book Now
            </button>
          </div>
        </div>

        {/* divider */}
        <Divider />

        {/* featured destinations */}
        <div className="w-full flex flex-col gap-4">
          <h1 className="ml-4 text-2xl font-bold">Featured Destinations</h1>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 justify-items-center">
            {data.destinations?.map((destination) => (
              <FeaturedCard
                key={destination.id}
                destination={destination.name ?? "Unknown"}
                link={destination.imgLink ?? "default-image-url"}
              />
            ))}
          </div>
        </div>

        {/* divider */}
        <Divider />

        {/* offers section */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Popular Offers For You</h1>

            {/* button  */}
            <div className="hidden sm:flex items-center">
              <button onClick={() => scrollLeft()} className="text-gray-400">
                <MdOutlineKeyboardArrowLeft className="text-4xl" />
              </button>
              <button onClick={() => scrollRight()} className="text-gray-400">
                <MdOutlineKeyboardArrowRight className="text-4xl" />
              </button>
            </div>
          </div>

          <div className="pl-4 sm:pl-0 relative">
            <OfferSection refElement={containerRef} />
            <div className="absolute top-0 bottom-0 right-0 w-1/12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* divider */}
        <Divider />

        {/* faqs */}
        <h1 className="text-2xl font-bold mb-2 mx-4 sm:mx-0">FAQs</h1>
        <Faqs />

        {/* footer  */}
        <Footer />
      </div>
    </div>
  );
}

import { MdOutlineArrowOutward } from "react-icons/md";

export default function FeaturedCard({
  destination,
  link,
}: {
  destination: string;
  link: string;
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-44 h-40 sm:w-72 sm:h-56 relative">
      <img
        src={link}
        alt=""
        className="w-full h-full object-cover rounded-xl hover:blur-xs transition-all 0.5s hover:scale-105"
      />

      {/*  button  */}
      <button
        type="button"
        className="absolute bottom-4 right-4 p-2 text-white bg-black rounded-full"
        onClick={scrollToTop}
      >
        <MdOutlineArrowOutward size={20} />
      </button>

      {/* title */}
      <h1 className="text-lg absolute bottom-4 left-4 text-white font-semibold">
        {destination}
      </h1>
    </div>
  );
}

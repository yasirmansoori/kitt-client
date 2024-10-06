import { Box } from "@mui/material";
import data from "../../data.json";
import { FaCalendar } from "react-icons/fa";
import SpringModal from "../Modals/Modals";
import { useState } from "react";

export default function OfferSection({
  refElement,
}: {
  refElement: React.RefObject<HTMLDivElement>;
}) {
  return (
    <Box
      ref={refElement}
      sx={{
        display: "flex",
        flexDirection: "row",
        overflowX: "scroll",
        overflowY: "hidden",
        scrollSnapType: "x mandatory",
        scrollBehavior: "smooth",
        gap: "2rem",
        position: "relative",
      }}
    >
      {data.offers.map((offer) => (
        <Box
          sx={{
            flex: { xs: "0 0 80%", sm: "0 0 40%" },
            scrollSnapAlign: "start",
          }}
        >
          <OfferCard data={offer} />
        </Box>
      ))}
    </Box>
  );
}

type OfferProps = {
  data: {
    id: number;
    name: string;
    title: string;
    code: string;
    validity: string;
    imgLink: string;
  };
};

const OfferCard = (props: OfferProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hover:animate-background rounded-lg bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-md transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
      <div className="rounded-lg bg-white p-4">
        {/* banner  */}
        <img
          src={props.data.imgLink}
          alt="offer banner"
          className="rounded-lg h-40 w-full object-cover"
        />

        {/* desc  */}
        <div>
          <h1 className="text-lg font-semibold mt-3">{props.data.name}</h1>
          <h1 className="text-sm font-semibold mt-1">{props.data.title}</h1>
          <h1 className="text-sm font-semibold mt-1">
            <FaCalendar className="mr-2 inline" />
            <span>{props.data.validity}</span>
          </h1>
        </div>

        {/* button  */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex mt-4 overflow-hidden items-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-75 ease-out"
        >
          <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
          <div className="ml-2 flex items-center gap-1 text-sm md:flex">
            <h1 className="text-lg">Reveal Code</h1>
          </div>
        </button>
      </div>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} data={props.data} />
    </div>
  );
};

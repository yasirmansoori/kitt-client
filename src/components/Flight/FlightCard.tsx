import airportData from "../../data.json";
import { convertStringToShortDate } from "../../utils/dateConverter";
import { convertMinToHour } from "../../utils/minToHour";
import { TbPlaneDeparture } from "react-icons/tb";
import { TbPlaneArrival } from "react-icons/tb";
import { SwipeFromRightModal } from "../Modals/Modals";
import { useState } from "react";

export type FlightProps = {
  id: number;
  trip: string;
  data: [
    {
      airline: string;
      arrivalDate: string;
      arrivalTime: string;
      code: string;
      departDate: string;
      departTime: string;
      duration: number;
      from: string;
      id: number;
      price: number;
      to: string;
      logo: string;
      flightWay: string;
      aircraft: string;
    }
  ];
  isCheapest: boolean;
};

export default function FlightCard(props: FlightProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<
    FlightProps["data"] | null
  >(null);

  return (
    <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0">
      {/* left  */}
      <div className="sm:w-3/4 shadow-md flex flex-col mx-4 sm:mx-0">
        {props.data.map((flight) => (
          <div>
            {/* top bar  */}
            <div className="flex p-2 px-4 items-center border-b border-dashed gap-2">
              <img src={flight.logo} alt="airline logo" className="h-8 w-8" />
              <h1 className="text-lg">{flight.airline}</h1>
              {flight.flightWay === "Direct" ? (
                <TbPlaneDeparture />
              ) : (
                <TbPlaneArrival className="-scale-x-100" />
              )}

              {/* date  */}
              {props.trip === "Round Trip" ? (
                <div className="ml-auto">
                  {flight.flightWay === "Direct" ? (
                    <h1 className="text-xs font-semibold text-gray-400">
                      {convertStringToShortDate(
                        flight.departDate.split("-").join("")
                      )}
                    </h1>
                  ) : (
                    <h1 className="text-xs font-semibold text-gray-400">
                      {convertStringToShortDate(
                        flight.arrivalDate.split("-").join("")
                      )}
                    </h1>
                  )}
                </div>
              ) : (
                <h1 className="text-xs ml-auto font-semibold text-gray-400">
                  {convertStringToShortDate(
                    flight.departDate.split("-").join("")
                  )}
                </h1>
              )}
            </div>

            {/* content  */}
            <div className="p-4 pt-2">
              {/* from and to  */}
              <div className="flex justify-between mt-2">
                <h1 className="text-sm">
                  <strong>{flight.from}</strong>{" "}
                  {
                    airportData.airports.find(
                      (airport) => airport.code === flight.from
                    )?.city
                  }
                  ,{" "}
                  {
                    airportData.airports.find(
                      (airport) => airport.code === flight.from
                    )?.country
                  }
                </h1>
                <h1 className="text-sm">
                  <strong>{flight.to}</strong>{" "}
                  {
                    airportData.airports.find(
                      (airport) => airport.code === flight.to
                    )?.city
                  }
                  ,{" "}
                  {
                    airportData.airports.find(
                      (airport) => airport.code === flight.to
                    )?.country
                  }
                </h1>
              </div>

              {/* departure and arrival  */}
              <div className="flex items-center justify-between mt-2">
                <h1 className="text-lg font-normal">{flight.departTime}</h1>
                <h1 className="text-lg font-bold">
                  {convertMinToHour(flight.duration)}
                </h1>
                <h1 className="text-lg font-normal">{flight.arrivalTime}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:block mx-1 border border-dashed" />

      {/* right  */}
      <div className="relative flex flex-col sm:w-1/4 mx-4 sm:mx-0">
        {props.isCheapest && props.trip === "Round Trip" && (
          <div className="flex items-center justify-center shadow-md bg-gradient-to-r from-red-400 to-yellow-400 text-white p-1 px-4">
            Cheapest
          </div>
        )}

        {props.data.map((flight) => (
          <div
            className={`${
              props.trip === "One Way" ? "" : "hidden"
            } relative h-full shadow-md p-4 px-5 sm:flex flex-col`}
          >
            <div className="h-full">
              <h1 className="text-sm text-gray-400">from</h1>
              <h1 className="text-lg font-bold">INR {flight.price}</h1>
              <button
                type="button"
                className="flex p-2 px-16 text-white bg-searchButton/85 hover:bg-searchButton/100 font-medium items-center justify-center transition-all 0.3s w-full"
                onClick={() => {
                  setIsOpen(true);
                  setSelectedFlight(props.data);
                }}
              >
                Select
              </button>
            </div>

            {props.isCheapest && props.trip !== "Round Trip" && (
              <div className="absolute top-0 right-0 flex items-center justify-center shadow-md bg-gradient-to-r from-red-400 to-yellow-400 text-white p-1 px-4 rounded-bl-xl">
                Cheapest
              </div>
            )}
          </div>
        ))}

        {/* combined price for mobile  */}
        {props.trip === "Round Trip" && (
          <div className="flex flex-col gap-2 sm:hidden border shadow-md p-4 px-5">
            <h1 className="text-lg text-gray-400">from</h1>
            <h1 className="text-lg font-bold">
              INR{" "}
              <span>
                {props.data.reduce((acc, curr) => acc + curr.price, 0)}
              </span>
            </h1>
            <button
              type="button"
              className="flex p-2 px-16 text-white bg-searchButton/85 hover:bg-searchButton/100 font-medium items-center justify-center transition-all 0.3s w-full"
              onClick={() => {
                setIsOpen(true);
                setSelectedFlight(props.data);
              }}
            >
              Select
            </button>
          </div>
        )}
      </div>
      <SwipeFromRightModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={selectedFlight}
        cheapest={props.isCheapest}
      />
    </div>
  );
}

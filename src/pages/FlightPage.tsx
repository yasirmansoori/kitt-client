import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { convertStringToShortDate } from "../utils/dateConverter";
import data from "../data.json";
import FlightAPI from "../apis/FlightAPI";
import FlightCard, { FlightProps } from "../components/Flight/FlightCard";
import Footer from "../components/Fotter/Footer";
import Placeholder from "../components/Helpers/Placeholder";
import { SwipeFromTopModal } from "../components/Modals/Modals";

export default function FlightPage() {
  const { id } = useParams();
  const [flightInfo, setFlightInfo] = useState({
    from: null,
    to: null,
    departDate: "",
    returnDate: "",
  } as {
    from: string | null;
    to: string | null;
    departDate: string;
    returnDate: string;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [flights, setFlights] = useState<FlightProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const splittedData = id.split("air:")[1].split("-");
      setFlightInfo({
        from: splittedData[0],
        to: splittedData[1],
        departDate: splittedData[2],
        returnDate: splittedData[3],
      });
    }

    if (isOpen) {
      setIsOpen(false); // Close modal if open
    }
  }, [id]);

  // get all flights
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        if (id) {
          const response = await FlightAPI.getFlightById(id);
          setFlights(response.flights);
        }
      } catch (error) {
        setError("Failed to fetch flights. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [id]);

  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />

      {/* content  */}
      <div className="mt-24 max-w-screen-lg mx-auto w-full">
        {/* top bar  */}
        {loading && <Placeholder height={8} round="full" />}

        {!loading && (
          <div className="flex justify-between mx-4 sm:mx-0">
            <div className="flex items-center border p-2 px-4 rounded-3xl">
              <div className="flex gap-1 items-center justify-center">
                <h1 className="text-lg font-medium">{flightInfo.from}</h1>
                <h1 className="hidden sm:block text-lg text-gray-400">
                  {
                    data.airports.find(
                      (airport) => airport.code === flightInfo.from
                    )?.name
                  }
                </h1>
              </div>

              <div className="border mx-4 h-4" />

              <div className="flex gap-1 items-center justify-center">
                <h1 className="text-lg font-medium">{flightInfo.to}</h1>
                <h1 className="hidden sm:block text-lg text-gray-400">
                  {
                    data.airports.find(
                      (airport) => airport.code === flightInfo.to
                    )?.name
                  }
                </h1>
              </div>

              <div className="border mx-4 h-4" />

              <div className="flex gap-1 items-center justify-center">
                <h1 className="text-lg font-medium">
                  {convertStringToShortDate(flightInfo.departDate)}
                </h1>
                {flightInfo.returnDate && (
                  <>
                    <h1 className="text-lg font-medium">-</h1>
                    <h1 className="text-lg font-medium">
                      {convertStringToShortDate(flightInfo.returnDate)}
                    </h1>
                  </>
                )}
              </div>
            </div>

            {/* open button  */}
            {!error && (
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center p-4 rounded-full bg-gray-100 hover:cursor-pointer"
                disabled={error !== null}
              >
                <IoSearchSharp />
              </button>
            )}

            <SwipeFromTopModal isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        )}

        {/* divider  */}
        <div className="w-1/2 mx-auto border border-gray-50 my-8 shadow-sm shadow-gray-50" />

        {/* flights  */}
        <h1 className="text-lg font-normal text-gray-400 mx-4 sm:mx-0">
          Showing {flights.length} flights
        </h1>

        {/* flights or error */}
        {!loading && error && (
          <div>
            <h1 className="text-lg font-normal text-red-400">{error}</h1>
            {/* retry button here */}

            <button
              type="button"
              className="text-white p-1 px-4 border rounded-2xl bg-black hover:scale-105 transition-all"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {/* flight card, if loading is false */}
        {!loading && flights.length > 0 && (
          <div className="flex flex-col gap-8 my-4">
            {flights.map((flight) => (
              <FlightCard
                key={flight.id}
                data={flight.data}
                id={flight.id}
                trip={flight.trip}
                isCheapest={flight.isCheapest}
              />
            ))}
          </div>
        )}

        {/* when loading is true, show a placeholder */}
        {loading && (
          <div className="flex flex-col gap-4 my-4">
            <Placeholder height={16} />
            <Placeholder height={16} />
            <Placeholder height={16} />
            <Placeholder height={16} />
          </div>
        )}
      </div>

      {/* footer  */}
      <Footer />
    </div>
  );
}

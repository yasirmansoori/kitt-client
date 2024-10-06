import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import SearchPanel from "../Panel/SearchPanel";
import { IoMdClose } from "react-icons/io";
import { GoDot } from "react-icons/go";
import { convertStringToShortDate } from "../../utils/dateConverter";
import airportData from "../../data.json";
import { convertMinToHour } from "../../utils/minToHour";
import { IoTimeSharp } from "react-icons/io5";
import { Alert, Fade, Snackbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const SpringModal = ({
  isOpen,
  setIsOpen,
  data,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: {
    id: number;
    name: string;
    title: string;
    code: string;
    validity: string;
  };
}) => {
  const [state, setState] = useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(data.code);
    setState({ ...state, open: true });
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2">Offer</h3>
                <p className="mb-4 border-b pb-2">{data.title}</p>
                <h3 className="text-xs font-bold mb-4 text-center">
                  Use this coupon code at checkout:
                </h3>
                <div className="flex gap-2">
                  <h1 className="text-2xl w-3/4 bg-white border-2 border-black border-dashed text-black text-center font-semibold tracking-widest">
                    {data.code}
                  </h1>
                  <button
                    onClick={handleCopy}
                    className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-1/4 py-2"
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Snackbar
        open={state.open}
        onClose={() => setState({ ...state, open: false })}
        TransitionComponent={state.Transition}
        autoHideDuration={2000}
      >
        <Alert
          onClose={() => {
            setState({ ...state, open: false });
          }}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Code Copied!
        </Alert>
      </Snackbar>
    </>
  );
};

export const SwipeFromTopModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="flex flex-col bg-slate-500/1 backdrop-blur p-8 fixed inset-0 z-10"
        >
          <div className="sm:flex sm:gap-2 z-50 sm:max-w-screen-lg sm:mx-auto mt-10 w-full">
            <SearchPanel />
            {/* open button  */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-4 rounded-full bg-gray-100 hover:cursor-pointer h-fit mt-8"
            >
              <IoMdClose />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SwipeFromRightModal = ({
  isOpen,
  setIsOpen,
  data,
  cheapest,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data:
    | [
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
      ]
    | null;
  cheapest: boolean;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="flex flex-col p-8 mt-16 fixed inset-0 z-10 bg-slate-500/1 backdrop-blur-sm items-center justify-center"
        >
          <div className="flex flex-col rounded-xl shadow-lg sm:w-1/2 h-full bg-white ml-auto p-4 sm:p-8 max-h-[95%]">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-gray-100 hover:cursor-pointer w-fit"
            >
              <IoMdClose />
            </button>

            <div className="flex w-full border-b items-center justify-between">
              <h1 className="sm:text-lg font-normal py-3">Flight Details</h1>

              {cheapest && (
                <div className="flex items-center justify-center shadow-md bg-gradient-to-r from-red-400 to-yellow-400 text-white p-1 px-4 animate-bounce">
                  Cheapest Flight
                </div>
              )}
            </div>

            {/* details  */}
            <div className="h-full overflow-auto">
              {data &&
                data.map((flight) => (
                  <>
                    <div className="mt-2">
                      <div className="flex items-center gap-1">
                        <GoDot className="inline" size={20} />
                        <h1 className="sm:text-lg font-normal text-gray-400">
                          {flight?.departDate
                            ? convertStringToShortDate(
                                flight.departDate.split("-").join("")
                              )
                            : "Invalid Date"}{" "}
                          • {flight?.departTime}
                        </h1>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex w-1/2">
                          <div className="border-l-4 ml-2 w-1" />
                          <h1 className="sm:text-lg font-bold pl-3 mb-8">
                            {
                              airportData.airports.find(
                                (airport) => airport.code === flight?.from
                              )?.label
                            }
                          </h1>
                        </div>

                        <div className="flex w-1/2 gap-4 flex-row justify-end">
                          <img
                            src={flight?.logo}
                            alt=""
                            className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                          />

                          <div>
                            <h1 className="text-xs sm:text-lg">
                              {flight?.airline} • {flight?.code}
                            </h1>
                            <h1 className="text-xs sm:text-lg">
                              {flight?.aircraft}
                            </h1>
                            <h1 className="text-xs sm:text-lg">
                              <IoTimeSharp className="inline" size={20} />{" "}
                              {flight?.duration !== undefined
                                ? convertMinToHour(flight.duration)
                                : "N/A"}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex items-center gap-1">
                        <GoDot className="inline" size={20} />
                        <h1 className="sm:text-lg font-normal text-gray-400">
                          {flight?.arrivalDate
                            ? convertStringToShortDate(
                                flight.arrivalDate.split("-").join("")
                              )
                            : "Invalid Date"}{" "}
                          • {flight?.arrivalTime}
                        </h1>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex w-1/2">
                          <div className="border-l-4 ml-2 w-1 border-white" />
                          <h1 className="sm:text-lg font-bold pl-3 mb-8">
                            {
                              airportData.airports.find(
                                (airport) => airport.code === flight?.to
                              )?.label
                            }
                          </h1>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;

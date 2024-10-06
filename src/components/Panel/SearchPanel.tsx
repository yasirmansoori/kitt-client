import { IoMdSwap } from "react-icons/io";
import SearchInput from "../Helpers/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IoSearchSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";

export default function SearchPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({
    from: "",
    to: "",
    departDate: null as Dayjs | null,
    returnDate: null as Dayjs | null,
  });

  const [errors, setErrors] = useState({
    fromTo: "",
    departReturn: "",
  });

  const { from, to, departDate, returnDate } = formState;

  // validate from and to
  useEffect(() => {
    if (from && to && from === to) {
      setErrors((prev) => ({
        ...prev,
        fromTo: "Source and destination cannot be the same",
      }));
    } else {
      setErrors((prev) => ({ ...prev, fromTo: "" }));
    }
  }, [from, to]);

  // validate form
  const validateForm = () => {
    let isValid = true;

    if (!from || !to) {
      setErrors((prev) => ({
        ...prev,
        fromTo: "Source and destination cannot be empty",
      }));
      isValid = false;
    }
    if (from === to) {
      setErrors((prev) => ({
        ...prev,
        fromTo: "Source and destination cannot be the same",
      }));
      isValid = false;
    }
    if (!departDate) {
      setErrors((prev) => ({
        ...prev,
        departReturn: "Departure date cannot be empty",
      }));
      isValid = false;
    }
    if (returnDate && returnDate.isBefore(departDate)) {
      setErrors((prev) => ({
        ...prev,
        departReturn: "Return date cannot be before departure date",
      }));
      isValid = false;
    }

    return isValid;
  };

  const formatDate = (date: Dayjs | null) =>
    date ? date.format("YYYYMMDD") : "";

  // submit form
  const submit = async () => {
    if (!validateForm()) return;

    // Format the dates
    const formattedDepartDate = formatDate(departDate);
    const formattedReturnDate = formatDate(returnDate);

    // Create the URL
    let url = `air:${from}-${to}-${formattedDepartDate}`;
    if (formattedReturnDate) {
      url += `-${formattedReturnDate}`;
    }

    // Reload the page with the new URL if already on the "air" page
    if (location.pathname.includes("air")) {
      navigate(`/${url}`);
    } else {
      navigate(url);
    }
  };

  const handleInputChange = (field: string, value: string | Dayjs | null) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form className="flex flex-col justify-center sm:mt-8 m-4 p-3 sm:m-0 border rounded-xl sm:p-4 sm:px-8 gap-6 bg-white">
      <h1 className="text-sm font-medium mr-auto p-2 px-8 rounded-md bg-gray-50">
        Flights
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* to-and-fro  */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <SearchInput
              label="Where From?"
              value={from}
              setValue={(val) => handleInputChange("from", val)}
              isError={errors.fromTo}
            />
            <IoMdSwap className="mx-auto rotate-90 sm:rotate-0" size={40} />
            <SearchInput
              label="Where To?"
              value={to}
              setValue={(val) => handleInputChange("to", val)}
              isError={errors.fromTo}
            />
          </div>
          {/* error message  */}
          {errors.fromTo && (
            <h1 className="text-xs p-1 bg-red-200 rounded-lg mt-2 text-center text-red-500 font-medium transition-all 0.3s">
              {errors.fromTo}
            </h1>
          )}
        </div>

        {/* depart-and-return  */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row w-full gap-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Departure"
                disablePast
                value={departDate}
                onChange={(date) => handleInputChange("departDate", date)}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Return"
                disablePast
                value={returnDate}
                onChange={(date) => handleInputChange("returnDate", date)}
              />
            </LocalizationProvider>
          </div>
          {errors.departReturn && (
            <h1 className="text-xs p-1 bg-red-200 rounded-lg mt-2 text-center text-red-500 font-medium transition-all 0.3s">
              {errors.departReturn}
            </h1>
          )}
        </div>
      </div>

      {/* search button  */}
      <button
        type="button"
        className="flex p-2 px-16 text-white bg-searchButton/95 hover:bg-searchButton/100 font-medium rounded-lg items-center justify-center sm:ml-auto transition-all 0.3s"
        onClick={submit}
      >
        <IoSearchSharp className="me-2" />
        Search
      </button>
    </form>
  );
}

import { convertStringToDate } from "./dateConverter";

const dummyResponseGenerator = (flightId: string | undefined) => {
  // extract data from flightId
  const data = flightId?.split("air:")[1]?.split("-") ?? [];

  if (data?.length === 3) {
    const flightData = {
      from: data[0],
      to: data[1],
      departDate: convertStringToDate(data[2]),
      trip: "One Way",
    };

    // construct dummy flight data
    const flights = [
      {
        id: 1,
        trip: flightData.trip,
        data: [
          {
            id: 1.1,
            from: flightData.from,
            to: flightData.to,
            departDate: flightData.departDate,
            arrivalDate: flightData.departDate,
            departTime: "10:00 AM",
            arrivalTime: "11:00 AM",
            price: 5000,
            airline: "Air India",
            code: "AI-202",
            logo: "https://res.cloudinary.com/dnjcut34n/image/upload/v1728077654/KITT/5_mqttm3.png",
            duration: 60,
            flightWay: "Direct",
            aircraft: "Boeing 737",
          },
        ],
        isCheapest: false,
      },
      {
        id: 2,
        trip: flightData.trip,
        data: [
          {
            id: 2.1,
            from: flightData.from,
            to: flightData.to,
            departDate: flightData.departDate,
            arrivalDate: flightData.departDate,
            departTime: "02:00 PM",
            arrivalTime: "03:30 PM",
            price: 4000,
            airline: "Indigo",
            code: "IG-202",
            logo: "https://res.cloudinary.com/dnjcut34n/image/upload/v1728077652/KITT/4_p1b9xm.png",
            duration: 90,
            flightWay: "Direct",
            aircraft: "Boeing 980",
          },
        ],
        isCheapest: false,
      },
      {
        id: 3,
        trip: flightData.trip,
        data: [
          {
            id: 3.1,
            from: flightData.from,
            to: flightData.to,
            departDate: flightData.departDate,
            arrivalDate: flightData.departDate,
            departTime: "06:00 PM",
            arrivalTime: "09:00 PM",
            price: 2000,
            airline: "SpiceJet",
            code: "SJ-202",
            logo: "https://res.cloudinary.com/dnjcut34n/image/upload/v1728077927/KITT/2_l3fek4.png",
            duration: 180,
            flightWay: "Direct",
            aircraft: "Airbus A320",
          },
        ],
        isCheapest: false,
      },
      {
        id: 4,
        trip: flightData.trip,
        data: [
          {
            id: 4.1,
            from: flightData.from,
            to: flightData.to,
            departDate: flightData.departDate,
            arrivalDate: flightData.departDate,
            departTime: "10:00 PM",
            arrivalTime: "12:00 AM",
            price: 1500,
            airline: "GoAir",
            code: "GA-202",
            logo: "https://res.cloudinary.com/dnjcut34n/image/upload/v1728077651/KITT/1_gwqqs5.png",
            duration: 120,
            flightWay: "Direct",
            aircraft: "Airbus A320",
          },
        ],
        isCheapest: true,
      },
    ];

    // send payload
    const payload = {
      message: "Flight data",
      flights,
      total: flights.length,
    };

    return payload;
  } else {
    const flightData = {
      from: data[0],
      to: data[1],
      departDate: convertStringToDate(data[2]),
      returnDate: convertStringToDate(data[3]),
      trip: "Round Trip",
    };

    // construct dummy flight data
    const flights = [
      {
        id: 1,
        trip: flightData.trip,
        data: [
          {
            id: 1.1,
            from: flightData.from,
            to: flightData.to,
            departDate: flightData.departDate,
            arrivalDate: flightData.departDate,
            departTime: "10:00 AM",
            arrivalTime: "11:00 AM",
            price: 5000,
            airline: "Air India",
            code: "AI-202",
            logo: "https://res.cloudinary.com/dnjcut34n/image/upload/v1728077654/KITT/5_mqttm3.png",
            duration: 60,
            flightWay: "Direct",
            aircraft: "Boeing 737",
          },
          {
            id: 1.2,
            from: flightData.to,
            to: flightData.from,
            departDate: flightData.returnDate,
            arrivalDate: flightData.returnDate,
            departTime: "04:00 PM",
            arrivalTime: "06:00 PM",
            price: 4000,
            airline: "Vistara",
            code: "VS-202",
            logo: "https://res.cloudinary.com/dnjcut34n/image/upload/v1728077651/KITT/3_vcuux8.png",
            duration: 120,
            flightWay: "Return",
            aircraft: "Boeing 980",
          },
        ],
        isCheapest: false,
      },
      {
        id: 2,
        trip: flightData.trip,
        data: [
          {
            id: 2.1,
            from: flightData.from,
            to: flightData.to,
            departDate: flightData.departDate,
            arrivalDate: flightData.departDate,
            departTime: "02:00 PM",
            arrivalTime: "03:30 PM",
            price: 4000,
            airline: "Indigo",
            code: "IG-202",
            logo: "https://res.cloudinary.com/dnjcut34n/image/upload/v1728077652/KITT/4_p1b9xm.png",
            duration: 90,
            flightWay: "Direct",
            aircraft: "Boeing 980",
          },
          {
            id: 2.2,
            from: flightData.to,
            to: flightData.from,
            departDate: flightData.returnDate,
            arrivalDate: flightData.returnDate,
            departTime: "08:00 PM",
            arrivalTime: "10:00 PM",
            price: 3000,
            airline: "GoAir",
            code: "GA-202",
            logo: "https://res.cloudinary.com/dnjcut34n/image/upload/v1728077651/KITT/1_gwqqs5.png",
            duration: 120,
            flightWay: "Return",
            aircraft: "Airbus A320",
          },
        ],
        isCheapest: true,
      },
    ];

    //  send payload
    const payload = {
      message: "Flight data",
      flights,
      total: flights.length,
    };

    return payload;
  }
};

export { dummyResponseGenerator };

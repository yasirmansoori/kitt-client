import AccordionTab from "../Helpers/AccordianTab";
import AccordionWrapper from "../Helpers/AccordianWrapper";

export default function Faqs() {
  return (
    <AccordionWrapper>
      <AccordionTab
        title="What are the advantages of online flight booking?"
        content="Through online air ticket booking you can easily compare prices of multiple airlines to get your air tickets at lowest rates. Also, it is easy to do online flight booking as multiple payment options are available on websites like KITT."
      />
      <AccordionTab
        title="When should I book to get best flight ticket prices?"
        content="For best flight ticket prices and flight ticket offers, it is recommended to book at least 3 to 4 weeks in advance for domestic air tickets. For international flight ticket it is recommended to book at least 7 to 8 weeks in advance, so that you can get the best flight ticket prices."
      />
      <AccordionTab
        title="How can I book flight tickets online?"
        content="With the help of KITT, you can easily book both domestic flight tickets and international air tickets in simple steps within a few seconds."
      />
      <AccordionTab
        title="Why should I make a flight booking from KITT?"
        content="Along with an easy flight booking process, KITT offers various discounts, instant EMI options and credit/ debit card related offers on flight booking. By availing such benefits, you can book air tickets at reasonable prices."
      />
    </AccordionWrapper>
  );
}

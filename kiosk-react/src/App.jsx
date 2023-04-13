import { useEffect, useState } from "react";
import Kiosk from "./components/Kiosk";
import KioskService from "./services/Kiosk";
import { v4 as uuid } from "uuid";

function App() {
  const [sessionId, setSessionId] = useState("");
  const [customerSurveyKiosk, setCustomerSurveyKiosk] = useState({});

  const getCustomerSurveyKiosk = async () => {
    try {
      const customerSurvey = await KioskService.getCustomerSurvey();
      if (customerSurvey.data?.success) {
        setCustomerSurveyKiosk(customerSurvey.data?.data);
      }
    } catch (error) {
      console.log("Error getting customer survey", error);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("sessionId")) {
      const newId = uuid();
      localStorage.setItem("sessionId", newId);
      setSessionId(newId);
    }
    getCustomerSurveyKiosk();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <Kiosk kiosk={customerSurveyKiosk}></Kiosk>
    </div>
  );
}

export default App;

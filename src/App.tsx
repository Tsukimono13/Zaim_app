import { useState } from "react";
import "./App.scss";
import { AccountPage } from "@/pages/AccountPage";
import { ApplicationPage } from "@/pages/ApplicationPage";
import { CalculatorPage } from "@/pages/CalculatorPage";
import { CallbackPage } from "@/pages/CallbackPage";
import { MainPage } from "@/pages/MainPage";
import { ServicesPage } from "@/pages/ServicesPage";
import { LoansProvider } from "./app/context/LoansProvider/LoansProvider";
import { AuthProvider } from "./app/context/AuthProvider/AuthProvider";

function App() {
  const [activePage, setActivePage] = useState("main");

  return (
    <AuthProvider>
      <LoansProvider>
        <div className="wrapper">
          {activePage === "main" && <MainPage setActivePage={setActivePage} />}
          {activePage === "account" && <AccountPage />}
          {activePage === "services" && <ServicesPage />}
          {activePage === "application" && <ApplicationPage />}
          {activePage === "calculator" && <CalculatorPage />}
          {activePage === "callback" && <CallbackPage />}
        </div>
      </LoansProvider>
    </AuthProvider>
  );
}

export default App;

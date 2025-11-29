import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import EnvConfigModal from "./components/EnvConfigModal";
import { Outlet } from "react-router-dom";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openEnvModal, setOpenEnvModal] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 767);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2920/2920252.png"
          alt="desktop only"
          className="w-32 h-32 mb-6 opacity-80"
        />
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          Desktop View Required
        </h1>
        <p className="text-gray-500 max-w-sm">
          This dashboard is best viewed on a laptop or desktop.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onOpenEnvModal={() => setOpenEnvModal(true)} />

      <div className="p-6">
        <Outlet />
      </div>

      <EnvConfigModal
        open={openEnvModal}
        onClose={() => setOpenEnvModal(false)}
      />
    </div>
  );
};

export default App;
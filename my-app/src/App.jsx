import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import React, { useEffect, useState } from "react";

// 👉 IMPORT modal
import EnvConfigModal from "./components/EnvConfigModal";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  // 👉 Modal state
  const [openEnvModal, setOpenEnvModal] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 767);
    };

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

      {/* PASS the open function */}
      <Navbar onOpenEnvModal={() => setOpenEnvModal(true)} />

      <div className="p-6">
        <Dashboard />
      </div>

      {/* Modal render */}
      <EnvConfigModal
        open={openEnvModal}
        onClose={() => setOpenEnvModal(false)}
      />
    </div>
  );
};

export default App;









// import Navbar from "./components/Navbar";
// import ActionButtons from "./components/ActionButtons";
// import DataTable from "./components/DataTable";
// import React, { useEffect, useState } from "react";
// import Dashboard from "./pages/Dashboard";

// const App = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreen = () => {
//       setIsMobile(window.innerWidth < 767);
//     };

//     checkScreen(); // run on mount
//     window.addEventListener("resize", checkScreen);

//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   if (isMobile) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-6">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/2920/2920252.png"
//           alt="desktop only"
//           className="w-32 h-32 mb-6 opacity-80"
//         />
//         <h1 className="text-2xl font-semibold text-gray-700 mb-2">
//           Desktop View Required
//         </h1>
//         <p className="text-gray-500 max-w-sm">
//           This dashboard is best viewed on a laptop, desktop, or tablet in landscape mode.
//           <br />
//           Please open it on a larger screen.
//         </p>
//       </div>
//     );
//   }

//   // normal app render
//   return (
//    <div className="min-h-screen bg-gray-50">
//       <Navbar/>
//       <div className="p-6">
//         <Dashboard/>
//       </div>
//     </div>
//   );
// };

// export default App;


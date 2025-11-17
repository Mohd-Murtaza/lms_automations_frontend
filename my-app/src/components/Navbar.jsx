import React from "react";
import { Button } from "antd";

const Navbar = ({ onOpenEnvModal }) => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      
      <div className="text-2xl font-semibold text-gray-800 cursor-pointer">
        Automation
      </div>

      <div className="flex items-center gap-4">

        {/* OPEN ENV MODAL */}
        <Button
          type="default"
          className="rounded-md bg-green-600 text-white"
          onClick={onOpenEnvModal}
        >
          Configure ENV
        </Button>

        {/* Login Button */}
        <Button type="primary" className="rounded-md">
          Login
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;










// import React from "react";
// import { Button } from "antd";

// const Navbar = () => {
//   return (
//     <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm">
//       {/* Left Text */}
//       <div className="text-2xl font-semibold text-gray-800 cursor-pointer">
//         Automation
//       </div>

//       {/* Right Login Button */}
//       <Button type="primary" className="rounded-md">
//         Login
//       </Button>
//     </nav>
//   );
// };

// export default Navbar;

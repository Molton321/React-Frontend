import { useEffect, useState } from "react";
import { io } from "socket.io-client";



const Navbar = () => {
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
   

    return () => {
      //socket.off("new_notification");
    };
  }, []);

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      
    </nav>
  );
};

export default Navbar;
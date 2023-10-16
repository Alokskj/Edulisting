import { Close } from "@mui/icons-material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Offers = () => {
  const isHome = useLocation().pathname === "/";
  const [isClosed, setIsClosed] = useState(false)
  if (isHome && !isClosed)
    return (
      <div className="hidden md:flex  p-2 justify-between items-center bg-slate-100 text-sm font-medium w-full">
        <p className="text-center flex-1">🎉 Get upto 50% off on every book purchase.</p>
        <div className="cursor-pointer" onClick={()=> setIsClosed(true)}>
            <Close />
        </div>
      </div>
    );
};

export default Offers;

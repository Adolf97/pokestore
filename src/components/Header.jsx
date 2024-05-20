"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BsCoin } from "react-icons/bs";
import { useBudget } from "../app/context/BudgetContext";
import { FaPlus, FaRegUserCircle, FaStore } from "react-icons/fa";

const Header = () => {
  const { budget, addRandomBudget } = useBudget();

  const pathname = usePathname();

  return (
    <div className="fixed w-full bg-[#13161b] text-[#fbfbfb] z-10 px-[5%] py-4 flex justify-between items-center">
      <div className="flex justify-center items-center">
        <FaRegUserCircle className="mr-4 text-[#fca943]" size={30} />
        <Link
          href="/team"
          className="flex justify-center items-center mr-4 bg-[#fca943] hover:bg-[#e2983c] px-3 py-1 rounded"
        >
          Mi Equipo
        </Link>
      </div>
      {pathname !== "/team" ? (
        <div className="flex justify-center items-center">
          <button
            className="flex justify-center items-center mr-4 bg-[#6fb312] px-3 py-1 rounded"
            onClick={addRandomBudget}
          >
            <FaPlus className="mr-2" size={10} />
            Dinero
          </button>
          <BsCoin className="text-[#6fb312]" size={30} />
          <span className="ml-2">{budget}</span>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Link
            href={"/"}
            className="flex justify-center items-center mr-4 bg-[#6fb312] px-3 py-1 rounded"
          >
            <FaStore className="mr-2" size={20} />
            Tienda
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

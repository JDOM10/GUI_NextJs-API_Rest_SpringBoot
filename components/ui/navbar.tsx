"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavbarActions } from "@/components/navbar-actions";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="border-b bg-gray-800 z-50 relative">
      <div className="flex h-16 items-center px-4 justify-between">
        <Image
          src="/images/hbomax.jpg"
          alt="HBO Max Logo"
          height={40}
          width={100}
          className="m-1 h-12 w-16"
        />
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {/* Icono de menú */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <ul
          className={`flex-grow md:flex md:items-center md:space-x-7 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:block fixed md:relative left-0 md:left-auto top-16 md:top-auto bg-gray-800 md:bg-transparent w-full md:w-auto max-h-96 overflow-y-auto z-50`}
          style={{ backgroundColor: isMobileMenuOpen ? 'rgba(0, 0, 0, 0.9)' : 'transparent' }}
        >
          <li className="w-full md:w-auto">
            <Button
              onClick={() => router.push("/")}
              className="text-md bg-gray-800 font-bold text-white hover:bg-gray-300 w-full md:w-auto text-center py-2"
            >
              Inicio
            </Button>
          </li>
          <li className="w-full md:w-auto">
            <Button
              onClick={() => router.push("/clientes")}
              className="text-md bg-gray-800 font-bold text-white hover:bg-gray-300 w-full md:w-auto text-center py-2"
            >
              Clientes
            </Button>
          </li>
          <li className="w-full md:w-auto">
            <Button
              onClick={() => router.push("/pagos")}
              className="text-md bg-gray-800 font-bold text-white hover:bg-gray-300 w-full md:w-auto text-center py-2"
            >
              Pagos
            </Button>
          </li>
          <li className="w-full md:w-auto">
            <Button
              onClick={() => router.push("/suscripciones")}
              className="text-md bg-gray-800 font-bold text-white hover:bg-gray-300 w-full md:w-auto text-center py-2"
            >
              Suscripciones
            </Button>
          </li>
          <li className="w-full md:w-auto">
            <Button
              onClick={() => router.push("/planes")}
              className="text-md bg-gray-800 font-bold text-white hover:bg-gray-300 w-full md:w-auto text-center py-2"
            >
              Planes
            </Button>
          </li>
          <li id="sususu" className="w-full md:w-auto">
            <Button
              onClick={() => router.push("/suscribete")}
              className="text-md bg-gray-800 font-bold text-white hover:bg-gray-300 w-full md:w-auto text-center py-2 md:px-60"
            >
              SUSCRÍBETE AHORA
            </Button>
          </li>
        </ul>
        <div className="md:flex items-center">
          <NavbarActions />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

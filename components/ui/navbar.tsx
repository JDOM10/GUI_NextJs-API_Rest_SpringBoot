"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className={`border-b bg-gray-800`}>
      <div className="flex h-16 items-center px-4 justify-between">
        <Image
          src="/images/hbomax.jpg"
          alt="HBO Max Logo"
          height={40}
          width={100}
          className="m-1 h-12 w-16"
        />
        <ul className="flex flex-grow justify-end items-center space-x-4">
          <li>
            <Button
              onClick={() => router.push("/")}
              className="text-lg bg-gray-800 font-bold text-white hover:bg-gray-300"
            >
              Inicio
            </Button>
          </li>
          <li>
            <Button
              onClick={() => router.push("/clientes")}
              className="text-lg bg-gray-800 font-bold text-white hover:bg-gray-300"
            >
              Clientes
            </Button>
          </li>
          <li>
            <Button
              onClick={() => router.push("/pagos")}
              className="text-lg bg-gray-800 font-bold text-white hover:bg-gray-300"
            >
              Pagos
            </Button>
          </li>
          <li>
            <Button
              onClick={() => router.push("/suscripciones")}
              className="text-lg bg-gray-800 font-bold text-white hover:bg-gray-300"
            >
              Suscripciones
            </Button>
          </li>
          <li>
            <Button
              onClick={() => router.push("/planes")}
              className="text-lg bg-gray-800 font-bold text-white hover:bg-gray-300"
            >
              Plan
            </Button>
          </li>
          <li>
            <Button
              onClick={() => router.push("/estado-de-pagos")}
              className="text-lg bg-gray-800 font-bold text-white hover:bg-gray-300"
            >
              Estado de Pagos
            </Button>
          </li>
          <li id="sususu">
            <Button
              onClick={() => router.push("/suscribete")}
              className="text-lg bg-gray-800 font-bold text-white hover:bg-gray-300"
            >
              SUSCRÍBETE AHORA
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

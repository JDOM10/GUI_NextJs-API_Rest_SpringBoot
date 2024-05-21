"use client";

import { SuscripcionesForm } from "@/app/(routes)/suscripciones/[suscripcionesId]/components/suscripciones-form";


const SuscripcionesPageAdd = ({ 

}) => {

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SuscripcionesForm /> {}
      </div>
    </div>
  );
};

export default SuscripcionesPageAdd;

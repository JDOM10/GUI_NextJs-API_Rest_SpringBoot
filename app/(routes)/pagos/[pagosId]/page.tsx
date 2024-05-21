"use client";

import { PagosForm } from "@/app/(routes)/pagos/[pagosId]/components/pagos-form";


const PagosPageAdd = ({ 

}) => {

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PagosForm /> {}
      </div>
    </div>
  );
};

export default PagosPageAdd;

"use client";

import { PlanesForm } from "@/app/(routes)/planes/[planesId]/components/planes-form";


const PlanesPageAdd = ({ 

}) => {

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PlanesForm /> {}
      </div>
    </div>
  );
};

export default PlanesPageAdd;

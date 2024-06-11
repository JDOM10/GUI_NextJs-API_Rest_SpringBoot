import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-4 pb-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3 mb-3">
            <Image
              src="/images/hbomax.jpg"
              alt="HBO Max Logo"
              height={40}
              width={100}
              className="m-1 h-12 w-16"
            />
            <div className="w-full lg:w-1/3 mb-3">
              <h5 className="font-bold">Contáctanos</h5>
              <p>Av. Massapequa 1165 NYC, USA</p>
              <p>+1 888 987874523</p>
              <p>contactanos@max.com</p>
            </div>
          </div>
          <p>
            El texto está disponible bajo la Licencia Creative Commons
            Atribución-CompartirIgual 4.0; pueden aplicarse cláusulas
            adicionales. Al usar este sitio aceptas nuestros términos de uso y
            nuestra política de privacidad. Max® es una marca registrada de la
            Fundación JDOM, una organización con ánimo de lucro.
          </p>
        </div>
      </div>
    </footer>
  );
}

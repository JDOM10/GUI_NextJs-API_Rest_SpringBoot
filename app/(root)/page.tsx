import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto mt-5 p-5">
      <section className="bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Sobre MAX</h2>
        <p className="text-xl font-semibold underline mb-2">Misión</p>
        <p className="mb-4">
          En HBO Max, nuestra misión es ofrecer a nuestros suscriptores acceso a una incomparable biblioteca de
          contenido premium, que incluye una amplia gama de películas, series originales galardonadas, documentales
          impactantes y contenido para toda la familia. Nos esforzamos por proporcionar una experiencia de entretenimiento
          única y envolvente que supere las expectativas de nuestros usuarios, promoviendo la diversidad, la creatividad y la innovación en cada aspecto de nuestra plataforma.
        </p>
        <p className="text-xl font-semibold underline mb-2">Visión</p>
        <p className="mb-4">
          Nuestra visión en HBO Max es convertirnos en el principal destino de entretenimiento en línea, donde los usuarios de todo el mundo puedan descubrir, explorar y
          disfrutar de contenido excepcional en cualquier momento y en cualquier lugar. Nos comprometemos a ser líderes en la industria, ofreciendo constantemente nuevos
          e innovadores servicios y experiencias que enriquezcan la vida de nuestros suscriptores y fortalezcan nuestra posición como referente en el mundo del entretenimiento
          digital.
        </p>
        <h3 className="text-2xl font-bold mt-6">Conócenos un poco más</h3>
      </section>

      <section className="mt-10">
        <div className="w-full flex justify-center">
          <Image
            src="/images/planes2.png"
            alt="Mapa de la sede de HBO Max"
            width={800}
            height={600}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>
    </main>
  );
}

import ApiSorteo from "../hook/ventas";
import { useLocation } from "react-router-dom";

export default function Ticket() {
  const location = useLocation(); // Obtén la ubicación actual
  const queryParams = new URLSearchParams(location.search); // Usa la ubicación para obtener los parámetros de la URL
  const refNumero = queryParams.get("ref_venta"); // Obtén el parámetro ref_venta

  const { ventas, loading } = ApiSorteo(refNumero); // Pasa el número del ticket como parámetro4

  // Formato de pesos colombianos
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0, // Si no quieres decimales
    }).format(value);
  };

  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <section>{loading ? <p>Cargando...</p> : null}</section>
      <section className="w-[90%] mt-10 md:max-w-[500px]  flex  items-center m-auto bg-white text-black rounded-xl p-3 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
        {ventas && ventas.length > 0 ? (
          ventas.map((venta, index) => (
            <div key={index} className="w-full">
              <h1 className="font-bold text-center mb-5  underline">
                Comprobante de Venta
              </h1>
              <div className="flex justify-between items-center ">
                <p className="font-bold">Ticket </p>
                <p className="font-bold bg-[#027AFD] py-1 px-3 rounded-xl text-white">
                  #{venta.numero_venta}
                </p>
              </div>

              <div className="flex justify-between items-center mt-3">
                <p className="font-bold">Fecha:</p>
                <div className="flex gap-2">
                  <p className="text-white bg-zinc-700 rounded-xl px-2">
                    {venta.fecha}
                  </p>
                  <p className="text-white bg-zinc-700 rounded-xl px-2">
                    {venta.hora}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 ">
                <p className="font-bold">Tipo de juego </p>
                <p className="font-bold text-xl">{venta.juego}</p>
              </div>

              <p className="font-bold mt-3 text-center underline ">loterias </p>
              <div className="flex flex-row  justify-center  mt-3 m-auto  items-center flex-wrap gap-2 md:gap-0">
                {venta.loterias.map((loteria, index) => (
                  <section key={index} className="flex flex-col ">
                    <p className="bg-[#027AFD] rounded-xl p-2 text-white">
                      {loteria}
                    </p>
                  </section>
                ))}
              </div>
              <div className="w-[95%]">
                <article className=" flex justify-between items-center mt-5 m-auto font-bold">
                  <p>Numero</p>
                  <p>Modalidad</p>
                  <p>$Valor</p>
                  <p>$combi</p>
                </article>

                {venta.boletos.map((boleto, index) => (
                  <section
                    key={index}
                    className="flex justify-between items-center w-[95%] m-auto"
                  >
                    <div className="flex flex-col">
                      <p>{boleto.numero}</p>
                    </div>
                    <div className="flex flex-col">
                      <p>Cifras: {boleto.longitudNumero}</p>
                    </div>
                    <div className="flex flex-col">
                      <p>{formatCurrency(boleto.valor)}</p>
                    </div>

                    <div className="flex flex-col">
                      <p>{formatCurrency(boleto.conbi)}</p>
                    </div>
                  </section>
                ))}
              </div>
              <div className="flex flex-col justify-center items-center mt-4">
                <p className="font-bold text-2xl underline">TOTAL </p>
                <p className="font-bold text-xl mb-1">
                  <p className="bg-[#027AFD] py-2 px-4 text-white rounded-lg mt-2">
                    {formatCurrency(venta.valor_bruta)} cop
                  </p>
                </p>
              </div>
              <section className="w-full flex justify-center items-center mt-5">
                <button
                  onClick={handlePrint}
                  className="bg-zinc-700 text-white py-2 px-3 rounded-xl font-bold"
                >
                  Imprimir
                </button>
              </section>
            </div>
          ))
        ) : (
          <p>No se encontró el ticket.</p>
        )}
      </section>
    </>
  );
}

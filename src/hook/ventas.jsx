import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function ApiSorteo(ticket) {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticket) {
      getVentaByTicket(ticket);
    }
  }, [ticket]);

  async function getVentaByTicket(ticket) {
    setLoading(true);
    const { data, error } = await supabase
      .from("ventas")
      .select()
      .eq("numero_venta", ticket); // Filtra por el ticket

    if (error) {
      console.error("Error fetching data: ", error);
    } else {
      setVentas(data);
    }

    setLoading(false);
  }

  return {
    ventas,
    loading,
  };
}

export default ApiSorteo;

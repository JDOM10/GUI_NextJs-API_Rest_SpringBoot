import axios from 'axios';

export const fetchClientesbyID = async (
  { params }: { params: { clienteId: string } }
) => {
    try {
      // Realiza una solicitud GET a la URL de la API REST para obtener los datos del cliente con el ID especificado
      const response = await axios.get(`http://localhost:4000/cliente/${params.clienteId}`);
      // Retorna los datos de la respuesta
      return response.data;
    } catch (error) {
      // Manejo de errores en caso de fallo en la solicitud
      console.error(`Error fetching cliente with ID ${params.clienteId}:`, error);
      throw error; // Lanza el error para ser manejado por componentes superiores si es necesario
    }
  };
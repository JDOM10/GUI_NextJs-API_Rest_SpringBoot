import axios from 'axios';

export const fetchClientes = async () => {
  try {
    const response = await axios.get('http://localhost:4000/cliente');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching clientes:", error);
    throw error;
  }
};

// Función para crear un nuevo cliente
export const createCliente = async (clienteData: any) => {
  try {
    const response = await axios.post('http://localhost:4000/cliente', clienteData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating cliente:", error);
    throw error;
  }
};
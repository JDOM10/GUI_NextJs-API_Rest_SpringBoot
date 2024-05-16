package com.api.crud.services;

import com.api.crud.models.ClienteModel;
import com.api.crud.repositories.IClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    IClienteRepository iClienteRepository;

    public ArrayList<ClienteModel> obtenerClientes(){
        return (ArrayList<ClienteModel>) iClienteRepository.findAll();
    }

    public ClienteModel guardarCliente(ClienteModel cliente){
        return iClienteRepository.save(cliente);
    }

    public Optional<ClienteModel> obtenerPorId(String id){
        return iClienteRepository.findById(id);
    }

    public ClienteModel actualizarCliente(ClienteModel request, String id){
        ClienteModel cliente  = iClienteRepository.findById(id).get();

        cliente.setCLI_NOMBRE(request.getCLI_NOMBRE());
        cliente.setCLI_APELLIDO(request.getCLI_APELLIDO());
        cliente.setCLI_PAIS(request.getCLI_PAIS());
        cliente.setCLI_EMAIL(request.getCLI_EMAIL());
        cliente.setCLI_ESTADO(request.getCLI_ESTADO());

        iClienteRepository.save(cliente);

        return cliente;
    }

    public void eliminarCliente(String id){
        try {
            ClienteModel cliente  = iClienteRepository.findById(id).get();
            cliente.setCLI_ESTADO(false);
            iClienteRepository.save(cliente);
        } catch (Exception e){
        }
    }
}

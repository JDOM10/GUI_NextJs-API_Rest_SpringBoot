package com.api.crud.controllers;

import com.api.crud.models.ClienteModel;
import com.api.crud.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")

public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ArrayList<ClienteModel> obtenerClientes(){
        return this.clienteService.obtenerClientes();
    }

    @PostMapping
    public ClienteModel guardarCliente(@RequestBody ClienteModel cliente){
        return this.clienteService.guardarCliente(cliente);
    }

    @GetMapping(path = "/{id}")
    public Optional<ClienteModel> obtenerPorId(@PathVariable("id") String id){
        return this.clienteService.obtenerPorId(id);
    }

    @PutMapping(path = "/{id}")
    public ClienteModel actualizarCliente(@RequestBody ClienteModel request, @PathVariable("id") String id){
        return this.clienteService.actualizarCliente(request, id);
    }

    @DeleteMapping(path = "/{id}")
    public void eliminarCliente(@PathVariable("id") String id){
        this.clienteService.eliminarCliente(id);
    }

}

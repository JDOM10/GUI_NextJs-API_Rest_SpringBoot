package com.api.crud.controllers;

import com.api.crud.models.PagoModel;
import com.api.crud.services.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/pago")

public class PagoController {

    @Autowired
    private PagoService pagoService;

    @GetMapping
    public ArrayList<PagoModel> obtenerPagos(){
        return this.pagoService.obtenerPagos();
    }

    @PostMapping
    public PagoModel guardarPago(@RequestBody PagoModel pago){
        return this.pagoService.guardarPago(pago);
    }

    @GetMapping(path = "/{id}")
    public Optional<PagoModel> obtenerPorId(@PathVariable("id") int id){
        return this.pagoService.obtenerPorId(id);
    }

    @PutMapping(path = "/{id}")
    public PagoModel actualizarPago(@RequestBody PagoModel request, @PathVariable("id") int id){
        return this.pagoService.actualizarPago(request, id);
    }

    @DeleteMapping(path = "/{id}")
    public void eliminarPago(@PathVariable("id") int id){
        this.pagoService.eliminarPago(id);
    }

}

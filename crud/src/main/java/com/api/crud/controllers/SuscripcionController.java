package com.api.crud.controllers;

import com.api.crud.models.SuscripcionModel;
import com.api.crud.services.SuscripcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/suscripcion")

public class SuscripcionController {

    @Autowired
    private SuscripcionService suscripcionService;

    @GetMapping
    public ArrayList<SuscripcionModel> obtenerSuscripciones(){
        return this.suscripcionService.obtenerSuscripciones();
    }

    @PostMapping
    public SuscripcionModel guardarSuscripcion(@RequestBody SuscripcionModel suscripcion){
        return this.suscripcionService.guardarSuscripcion(suscripcion);
    }

    @GetMapping(path = "/{id}")
    public Optional<SuscripcionModel> obtenerPorId(@PathVariable("id") int id){
        return this.suscripcionService.obtenerPorId(id);
    }

    @PutMapping(path = "/{id}")
    public SuscripcionModel actualizarSuscripcion(@RequestBody SuscripcionModel request, @PathVariable("id") int id){
        return this.suscripcionService.actualizarSuscripcion(request, id);
    }

    @DeleteMapping(path = "/{id}")
    public void eliminarSuscripcion(@PathVariable("id") int id){
        this.suscripcionService.eliminarSuscripcion(id);
    }

}

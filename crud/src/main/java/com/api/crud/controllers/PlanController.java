package com.api.crud.controllers;

import com.api.crud.models.PlanModel;
import com.api.crud.services.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/plan")

public class PlanController {

    @Autowired
    private PlanService planService;

    @GetMapping
    public ArrayList<PlanModel> obtenerPlanes(){
        return this.planService.obtenerPlanes();
    }

    @PostMapping
    public PlanModel guardarPlan(@RequestBody PlanModel plan){
        return this.planService.guardarPlan(plan);
    }

    @GetMapping(path = "/{id}")
    public Optional<PlanModel> obtenerPorId(@PathVariable("id") int id){
        return this.planService.obtenerPorId(id);
    }

    @PutMapping(path = "/{id}")
    public PlanModel actualizarPlan(@RequestBody PlanModel request, @PathVariable("id") int id){
        return this.planService.actualizarPlan(request, id);
    }

    @DeleteMapping(path = "/{id}")
    public void eliminarPlan(@PathVariable("id") int id){
        this.planService.eliminarPlan(String.valueOf(id));
    }

}

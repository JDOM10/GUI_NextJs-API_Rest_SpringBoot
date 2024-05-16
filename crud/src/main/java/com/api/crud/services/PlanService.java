package com.api.crud.services;

import com.api.crud.models.PlanModel;
import com.api.crud.repositories.IPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class PlanService {

    @Autowired
    IPlanRepository iPlanRepository;

    public ArrayList<PlanModel> obtenerPlanes(){
        return (ArrayList<PlanModel>) iPlanRepository.findAll();
    }

    public PlanModel guardarPlan(PlanModel plan){
        return iPlanRepository.save(plan);
    }

    public Optional<PlanModel> obtenerPorId(int id){
        return iPlanRepository.findById(String.valueOf(id));
    }

    public PlanModel actualizarPlan(PlanModel request, Integer id) {
        PlanModel plan = iPlanRepository.findById(String.valueOf(id)).orElse(null);

        if (plan != null) {
            plan.setTipoplanNombre(request.getTipoplanNombre());
            plan.setTipoplanDuracion(request.getTipoplanDuracion());
            plan.setTipoplanPrecio(request.getTipoplanPrecio());
            plan.setTipoplanEstado(request.getTipoplanEstado());
            iPlanRepository.save(plan);
        }

        return plan;
    }

    public void eliminarPlan(String id){
        try {
            PlanModel plan  = iPlanRepository.findById(id).get();
            plan.setTipoplanEstado(false);
            iPlanRepository.save(plan);
        } catch (Exception e){
        }
    }
}

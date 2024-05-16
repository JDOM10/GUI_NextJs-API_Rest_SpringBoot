package com.api.crud.services;

import com.api.crud.models.SuscripcionModel;
import com.api.crud.repositories.ISuscripcionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class SuscripcionService {

    @Autowired
    private ISuscripcionRepository iSuscripcionRepository;

    public ArrayList<SuscripcionModel> obtenerSuscripciones() {
        return (ArrayList<SuscripcionModel>) iSuscripcionRepository.findAll();
    }

    public SuscripcionModel guardarSuscripcion(SuscripcionModel suscripcion) {
        return iSuscripcionRepository.save(suscripcion);
    }

    public Optional<SuscripcionModel> obtenerPorId(Integer id) {
        return iSuscripcionRepository.findById(String.valueOf(id));
    }

    public SuscripcionModel actualizarSuscripcion(SuscripcionModel request, Integer id) {
        SuscripcionModel suscripcion = iSuscripcionRepository.findById(String.valueOf(id)).orElse(null);

        if (suscripcion != null) {
            suscripcion.setCliente(request.getCliente());
            suscripcion.setTipoplan(request.getTipoplan());
            suscripcion.setSusStartDate(request.getSusStartDate());
            suscripcion.setSusEndDate(request.getSusEndDate());
            suscripcion.setSusRenovacionAuto(request.getSusRenovacionAuto());
            suscripcion.setSusEstado(request.getSusEstado());
            iSuscripcionRepository.save(suscripcion);
        }

        return suscripcion;
    }

    public void eliminarSuscripcion(Integer id) {
        try {
            SuscripcionModel suscripcion = iSuscripcionRepository.findById(String.valueOf(id)).orElse(null);
            if (suscripcion != null) {
                suscripcion.setSusEstado(false);
                iSuscripcionRepository.save(suscripcion);
            }
        } catch (Exception e) {
        }
    }
}

package com.api.crud.services;

import com.api.crud.models.PagoModel;
import com.api.crud.repositories.IPagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class PagoService {

    @Autowired
    private IPagoRepository iPagoRepository;

    public ArrayList<PagoModel> obtenerPagos() {
        return (ArrayList<PagoModel>) iPagoRepository.findAll();
    }

    public PagoModel guardarPago(PagoModel pago) {
        return iPagoRepository.save(pago);
    }

    public Optional<PagoModel> obtenerPorId(Integer id) {
        return iPagoRepository.findById(String.valueOf(id));
    }

    public PagoModel actualizarPago(PagoModel request, Integer id) {
        PagoModel pago = iPagoRepository.findById(String.valueOf(id)).orElse(null);

        if (pago != null) {
            pago.setCliente(request.getCliente());
            pago.setPagoCod(request.getPagoCod());
            pago.setPagoTipo(request.getPagoTipo());
            pago.setPagoMonto(request.getPagoMonto());
            pago.setPagoFecha(request.getPagoFecha());
            pago.setPagoPendiente(request.getPagoPendiente());
            pago.setPagoEstado(request.getPagoEstado());

            iPagoRepository.save(pago);
        }

        return pago;
    }

    public void eliminarPago(Integer id) {
        try {
            PagoModel pago = iPagoRepository.findById(String.valueOf(id)).orElse(null);
            if (pago != null) {
                pago.setPagoEstado(false);
                iPagoRepository.save(pago);
            }
        } catch (Exception e) {
        }
    }
}

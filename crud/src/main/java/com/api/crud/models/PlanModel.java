package com.api.crud.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "tipoplan")
public class PlanModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TIPOPLAN_ID")
    private Integer tipoplanId;

    @Column(name = "TIPOPLAN_NOMBRE")
    private String tipoplanNombre;

    @Column(name = "TIPOPLAN_DURACION")
    private String tipoplanDuracion;

    @Column(name = "TIPOPLAN_PRECIO")
    private BigDecimal tipoplanPrecio;

    @Column(name = "TIPOPLAN_ESTADO")
    private Boolean tipoplanEstado;

    // Getters y Setters
    public Integer getTipoplanId() {
        return tipoplanId;
    }

    public void setTipoplanId(Integer tipoplanId) {
        this.tipoplanId = tipoplanId;
    }

    public String getTipoplanNombre() {
        return tipoplanNombre;
    }

    public void setTipoplanNombre(String tipoplanNombre) {
        this.tipoplanNombre = tipoplanNombre;
    }

    public String getTipoplanDuracion() {
        return tipoplanDuracion;
    }

    public void setTipoplanDuracion(String tipoplanDuracion) {
        this.tipoplanDuracion = tipoplanDuracion;
    }

    public BigDecimal getTipoplanPrecio() {
        return tipoplanPrecio;
    }

    public void setTipoplanPrecio(BigDecimal tipoplanPrecio) {
        this.tipoplanPrecio = tipoplanPrecio;
    }

    public Boolean getTipoplanEstado() {
        return tipoplanEstado;
    }

    public void setTipoplanEstado(Boolean tipoplanEstado) {
        this.tipoplanEstado = tipoplanEstado;
    }

}
package com.api.crud.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "suscripcion")
public class SuscripcionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SUS_ID")
    private Integer susId;

    @Column(name = "CLI_ID")
    private String cliente;

    @Column(name = "TIPOPLAN_ID")
    private int tipoplan;

    @Column(name = "SUS_STARTDATE")
    private LocalDateTime susStartDate;

    @Column(name = "SUS_ENDDATE")
    private LocalDateTime susEndDate;

    @Column(name = "SUS_RENOVACIONAUTO")
    private Boolean susRenovacionAuto;

    @Column(name = "SUS_ESTADO")
    private Boolean susEstado;

    // Getters y Setters
    public Integer getSusId() {
        return susId;
    }

    public void setSusId(Integer susId) {
        this.susId = susId;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public int getTipoplan() {
        return tipoplan;
    }

    public void setTipoplan(int tipoplan) {
        this.tipoplan = tipoplan;
    }

    public LocalDateTime getSusStartDate() {
        return susStartDate;
    }

    public void setSusStartDate(LocalDateTime susStartDate) {
        this.susStartDate = susStartDate;
    }

    public LocalDateTime getSusEndDate() {
        return susEndDate;
    }

    public void setSusEndDate(LocalDateTime susEndDate) {
        this.susEndDate = susEndDate;
    }

    public Boolean getSusRenovacionAuto() {
        return susRenovacionAuto;
    }

    public void setSusRenovacionAuto(Boolean susRenovacionAuto) {
        this.susRenovacionAuto = susRenovacionAuto;
    }

    public Boolean getSusEstado() {
        return susEstado;
    }

    public void setSusEstado(Boolean susEstado) {
        this.susEstado = susEstado;
    }
}
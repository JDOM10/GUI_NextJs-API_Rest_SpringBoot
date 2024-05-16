package com.api.crud.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pago")
public class PagoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PAGO_ID")
    private Integer pagoId;

    @Column(name = "CLI_ID")
    private String cliente;

    @Column(name = "PAGO_COD")
    private String pagoCod;

    @Column(name = "PAGO_TIPO")
    private String pagoTipo;

    @Column(name = "PAGO_MONTO")
    private BigDecimal pagoMonto;

    @Column(name = "PAGO_FECHA")
    private LocalDateTime pagoFecha;

    @Column(name = "PAGO_PENDIENTE")
    private String pagoPendiente;

    @Column(name = "PAGO_ESTADO")
    private Boolean pagoEstado;

    // Getters and Setters
    public Integer getPagoId() {
        return pagoId;
    }

    public void setPagoId(Integer pagoId) {
        this.pagoId = pagoId;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getPagoCod() {
        return pagoCod;
    }

    public void setPagoCod(String pagoCod) {
        this.pagoCod = pagoCod;
    }

    public String getPagoTipo() {
        return pagoTipo;
    }

    public void setPagoTipo(String pagoTipo) {
        this.pagoTipo = pagoTipo;
    }

    public BigDecimal getPagoMonto() {
        return pagoMonto;
    }

    public void setPagoMonto(BigDecimal pagoMonto) {
        this.pagoMonto = pagoMonto;
    }

    public LocalDateTime getPagoFecha() {
        return pagoFecha;
    }

    public void setPagoFecha(LocalDateTime pagoFecha) {
        this.pagoFecha = pagoFecha;
    }

    public String getPagoPendiente() {
        return pagoPendiente;
    }

    public void setPagoPendiente(String pagoPendiente) {
        this.pagoPendiente = pagoPendiente;
    }

    public Boolean getPagoEstado() {
        return pagoEstado;
    }

    public void setPagoEstado(Boolean pagoEstado) {
        this.pagoEstado = pagoEstado;
    }

}
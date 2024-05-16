package com.api.crud.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "cliente")
public class ClienteModel {

    @Id
    @Column
    private String CLI_ID;

    @Column
    private String CLI_NOMBRE;

    @Column
    private String CLI_APELLIDO;

    @Column
    private String CLI_PAIS;

    @Column
    private String CLI_EMAIL;

    @Column
    private Boolean CLI_ESTADO;

    public String getCLI_ID() {
        return CLI_ID;
    }

    public void setCLI_ID(String CLI_ID) {
        this.CLI_ID = CLI_ID;
    }

    public String getCLI_NOMBRE() {
        return CLI_NOMBRE;
    }

    public void setCLI_NOMBRE(String CLI_NOMBRE) {
        this.CLI_NOMBRE = CLI_NOMBRE;
    }

    public String getCLI_APELLIDO() {
        return CLI_APELLIDO;
    }

    public void setCLI_APELLIDO(String CLI_APELLIDO) {
        this.CLI_APELLIDO = CLI_APELLIDO;
    }

    public String getCLI_PAIS() {
        return CLI_PAIS;
    }

    public void setCLI_PAIS(String CLI_PAIS) {
        this.CLI_PAIS = CLI_PAIS;
    }

    public String getCLI_EMAIL() {
        return CLI_EMAIL;
    }

    public void setCLI_EMAIL(String CLI_EMAIL) {
        this.CLI_EMAIL = CLI_EMAIL;
    }

    public Boolean getCLI_ESTADO() {
        return CLI_ESTADO;
    }

    public void setCLI_ESTADO(Boolean CLI_ESTADO) {
        this.CLI_ESTADO = CLI_ESTADO;
    }

}
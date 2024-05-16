package com.api.crud.repositories;

import com.api.crud.models.ClienteModel;
import com.api.crud.models.PagoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPagoRepository extends JpaRepository<PagoModel, String> {




}

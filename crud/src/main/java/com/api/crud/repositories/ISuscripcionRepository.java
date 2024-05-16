package com.api.crud.repositories;

import com.api.crud.models.PagoModel;
import com.api.crud.models.SuscripcionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISuscripcionRepository extends JpaRepository<SuscripcionModel, String> {




}

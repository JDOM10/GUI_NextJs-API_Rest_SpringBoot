package com.api.crud.repositories;

import com.api.crud.models.ClienteModel;
import com.api.crud.models.PlanModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPlanRepository extends JpaRepository<PlanModel, String> {




}

package com.codeclan.openspaces.repositories;

import com.codeclan.openspaces.models.Table;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableRepository extends MongoRepository<Table, String> {
}

package com.codeclan.openspaces.repositories;

import com.codeclan.openspaces.models.Bench;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BenchRepository extends MongoRepository<Bench, String> {
}

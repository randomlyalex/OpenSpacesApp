package com.codeclan.openspaces.repositories;

import com.codeclan.openspaces.models.Toilet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ToiletRepository extends MongoRepository<Toilet, String> {
}

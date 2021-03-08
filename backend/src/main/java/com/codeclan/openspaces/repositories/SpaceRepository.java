package com.codeclan.openspaces.repositories;

import com.codeclan.openspaces.models.Space;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SpaceRepository extends MongoRepository<Space, String> {
}

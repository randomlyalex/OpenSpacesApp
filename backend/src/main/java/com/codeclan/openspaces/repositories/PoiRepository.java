package com.codeclan.openspaces.repositories;

import com.codeclan.openspaces.models.Poi;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoiRepository extends MongoRepository<Poi, String> {
}

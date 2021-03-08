package com.codeclan.openspaces.repositories;

import com.codeclan.openspaces.models.Poi;
import com.codeclan.openspaces.models.Table;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PoiRepository extends MongoRepository<Poi, String> {
    public List<Poi> findAllByType(String type);

}

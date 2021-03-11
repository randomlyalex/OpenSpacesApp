package com.codeclan.openspaces.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pois")
public class Toilet extends Poi{
    public Toilet(double lat, double lon, String accessibility, String privacy, String createdBy) {
        super(lat, lon, accessibility, privacy);
        this.setType("toilet");
        setCreatedBy(createdBy);

    }

}

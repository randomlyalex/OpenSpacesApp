package com.codeclan.openspaces.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pois")
public class Toilet extends Poi{
    public Toilet(Coord coord, String accessibility, String privacy) {
        super(coord, accessibility, privacy);
        this.setType("Toilet");

    }

}

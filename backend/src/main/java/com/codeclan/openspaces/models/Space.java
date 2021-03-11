package com.codeclan.openspaces.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pois")
public class Space extends Poi {

    private boolean sheltered;


    public Space(double lat, double lon, String accessibility, String privacy, boolean sheltered, String createdBy) {
        super(lat, lon, accessibility, privacy);
        this.sheltered = sheltered;
        this.setType("space");
        setCreatedBy(createdBy);
    }

    public boolean isSheltered() {
        return sheltered;
    }

    public void setSheltered(boolean sheltered) {
        this.sheltered = sheltered;
    }
}

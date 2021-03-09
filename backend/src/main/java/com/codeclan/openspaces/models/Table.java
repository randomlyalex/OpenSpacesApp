package com.codeclan.openspaces.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pois")
public class Table extends Space {

    private int capacity;

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Table(double lat, double lon, String accessibility, String privacy, boolean sheltered, int capacity) {
        super(lat, lon, accessibility, privacy, sheltered);
        this.capacity = capacity;
        this.setType("table");


    }
}
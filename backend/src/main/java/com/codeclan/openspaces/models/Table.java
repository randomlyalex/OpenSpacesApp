package com.codeclan.openspaces.models;

public class Table extends Space {

    private int capacity;

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Table(Coord coord, String accessibility, String privacy, boolean sheltered, int capacity) {
        super(coord, accessibility, privacy, sheltered);
        this.capacity = capacity;

    }
}
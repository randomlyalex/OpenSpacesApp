package com.codeclan.openspaces.models;

public class Bench extends Space {

    private int capacity;

    public Bench(Coord coord, String accessibility, String privacy, boolean sheltered, int capacity) {
        super(coord, accessibility, privacy, sheltered);
        this.capacity = capacity;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
}

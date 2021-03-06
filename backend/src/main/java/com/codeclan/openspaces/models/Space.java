package com.codeclan.openspaces.models;

public class Space extends Poi {

    private boolean sheltered;


    public Space(Coord coord, String accessibility, String privacy, boolean sheltered) {
        super(coord, accessibility, privacy);
        this.sheltered = sheltered;
    }

    public boolean isSheltered() {
        return sheltered;
    }

    public void setSheltered(boolean sheltered) {
        this.sheltered = sheltered;
    }
}

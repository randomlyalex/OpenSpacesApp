package com.codeclan.openspaces.models;

public class Poi {

    private String id;
    private Coord coord;
    private String accessibility;
    private String privacy;

    public Poi(Coord coord, String accessibility, String privacy) {
        this.coord = coord;
        this.accessibility = accessibility;
        this.privacy = privacy;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Coord getLocation() {
        return coord;
    }

    public void setLocation(Coord coord) {
        this.coord = coord;
    }

    public String getAccessibility() {
        return accessibility;
    }

    public void setAccessibility(String accessibility) {
        this.accessibility = accessibility;
    }

    public String getPrivacy() {
        return privacy;
    }

    public void setPrivacy(String privacy) {
        this.privacy = privacy;
    }
}

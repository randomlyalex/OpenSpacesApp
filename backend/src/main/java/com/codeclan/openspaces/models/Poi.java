package com.codeclan.openspaces.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pois")
public class Poi {

    @Id
    private String id;
    private Coord coord;
    private String accessibility;
    private String privacy;
    private String type;

    public Poi(Coord coord, String accessibility, String privacy) {
        this.coord = coord;
        this.accessibility = accessibility;
        this.privacy = privacy;
        this.type = "poi";
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Coord getCoord() {
        return coord;
    }

    public void setCoord(Coord coord) {
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

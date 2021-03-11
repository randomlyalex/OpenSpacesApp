package com.codeclan.openspaces.models;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "pois")
public class Space extends Poi {

    private boolean sheltered;
    private String createdBy;
    private ArrayList<String> favBy;

    public Space(double lat, double lon, String accessibility, String privacy, boolean sheltered, String createdBy) {
        super(lat, lon, accessibility, privacy);
        this.sheltered = sheltered;
        this.setType("space");
        this.createdBy = createdBy;
        this.favBy = new ArrayList<>();
    }

//    public Space(double lat, double lon, String accessibility, String privacy, boolean sheltered, String createdBy, ArrayList<String> favBy, ArrayList<Rating> ratedBy) {
//        super(lat, lon, accessibility, privacy, ratedBy);
//        this.sheltered = sheltered;
//        this.setType("space");
//        this.createdBy = createdBy;
//        this.favBy = favBy;
//    }

    public ArrayList<String> getFavBy() {
        return favBy;
    }

    public void setFavBy(ArrayList<String> favBy) {
        this.favBy = favBy;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public boolean isSheltered() {
        return sheltered;
    }

    public void setSheltered(boolean sheltered) {
        this.sheltered = sheltered;
    }
}

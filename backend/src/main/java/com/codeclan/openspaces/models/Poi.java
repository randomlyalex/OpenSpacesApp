package com.codeclan.openspaces.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "pois")
public class Poi {

    @Id
    private String id;
    private double lat;
    private double lon;
    private String accessibility;
    private String privacy;
    private String type;
    private ArrayList<Rating> ratedBy;



    public Poi(double lat, double lon, String accessibility, String privacy) {
        this.lat = lat;
        this.lon= lon;
        this.accessibility = accessibility;
        this.privacy = privacy;
        this.type = "poi";
        this.ratedBy = new ArrayList<>();
    }
//    public Poi(double lat, double lon, String accessibility, String privacy, ArrayList<Rating> ratedBy) {
//        this.lat = lat;
//        this.lon= lon;
//        this.accessibility = accessibility;
//        this.privacy = privacy;
//        this.type = "poi";
//        this.ratedBy = ratedBy;
//    }

    public ArrayList<Rating> getRatedBy() {
        return ratedBy;
    }

    public void setRatedBy(ArrayList<Rating> ratedBy) {
        this.ratedBy = ratedBy;
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

    public double getLat() {   return lat;   }

    public void setLat(double lat) {  this.lat = lat;  }

    public double getLon() {return lon; }

    public void setLon(double lon) {  this.lon = lon; }

    public List<Double> getLocation(){
        ArrayList location = new ArrayList<Double>();
        location.add(this.lat);
        location.add(this.lon);
        return location;
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

    public String getCreatedBy(){
        return "";
    }

}

package com.codeclan.openspaces.models;

public class Rating {
    private String user;
    private double rating;

    public Rating(String user, double rating) {
        this.user = user;
        this.rating = rating;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}

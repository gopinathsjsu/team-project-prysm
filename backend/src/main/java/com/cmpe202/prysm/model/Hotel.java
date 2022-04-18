package com.cmpe202.prysm.model;

import org.springframework.stereotype.Component;

@Component
public class Hotel {
    private String hotel_id;

    public Hotel(String hotel_id, String hotel_name, String country, String city) {
        this.hotel_id = hotel_id;
        this.hotel_name = hotel_name;
        this.country = country;
        this.city = city;
    }

    private String hotel_name;

    private String country;

    private String city;

    public String getHotel_id() {
        return hotel_id;
    }

    public void setHotel_id(String hotel_id) {
        this.hotel_id = hotel_id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }



    public String getHotel_name() {
        return hotel_name;
    }

    public void setHotel_name(String hotel_name) {
        this.hotel_name = hotel_name;
    }
}

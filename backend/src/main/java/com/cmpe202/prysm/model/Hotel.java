package com.cmpe202.prysm.model;

import org.springframework.stereotype.Component;

import java.sql.Date;

@Component
public class Hotel {
    private String hotel_id;

    public Hotel(String hotel_id, String hotel_name, String country, String city, String fromDate, String toDate,int numOfRooms, int numOfGuests,boolean daily_continental_breakfast, boolean fitness_room, boolean swimming_pool, boolean jacuzzi,boolean daily_parking,boolean all_meals) {
        this.hotel_id = hotel_id;
        this.hotel_name = hotel_name;
        this.country = country;
        this.city = city;
        this.numOfRooms=numOfRooms;
        this.numOfGuests=numOfGuests;
        this.fromDate=fromDate;
        this.toDate=toDate;
        this.daily_continental_breakfast=daily_continental_breakfast;
        this.fitness_room=fitness_room;
        this.jacuzzi=jacuzzi;
        this.swimming_pool=swimming_pool;
        this.daily_parking=daily_parking;
        this.all_meals=all_meals;
    }

    private String hotel_name;

    private String country;

    private String city;



    private String fromDate;
    private String toDate;
    private int numOfRooms;
    private int numOfGuests;

    public Hotel() {

    }

    public boolean isDaily_continental_breakfast() {
        return daily_continental_breakfast;
    }

    public void setDaily_continental_breakfast(boolean daily_continental_breakfast) {
        this.daily_continental_breakfast = daily_continental_breakfast;
    }

    public boolean isFitness_room() {
        return fitness_room;
    }

    public void setFitness_room(boolean fitness_room) {
        this.fitness_room = fitness_room;
    }

    public boolean isSwimming_pool() {
        return swimming_pool;
    }

    public void setSwimming_pool(boolean swimming_pool) {
        this.swimming_pool = swimming_pool;
    }

    public boolean isJacuzzi() {
        return jacuzzi;
    }

    public void setJacuzzi(boolean jacuzzi) {
        this.jacuzzi = jacuzzi;
    }

    public boolean isDaily_parking() {
        return daily_parking;
    }

    public void setDaily_parking(boolean daily_parking) {
        this.daily_parking = daily_parking;
    }

    public boolean isAll_meals() {
        return all_meals;
    }

    public void setAll_meals(boolean all_meals) {
        this.all_meals = all_meals;
    }

    private boolean daily_continental_breakfast;
    private boolean fitness_room;
    private boolean swimming_pool;
    private boolean jacuzzi;
    private boolean daily_parking;
    private boolean all_meals;
    public int getNumOfGuests() {
        return numOfGuests;
    }

    public void setNumOfGuests(int numOfGuests) {
        this.numOfGuests = numOfGuests;
    }



    public int getNumOfRooms() {
        return numOfRooms;
    }

    public void setNumOfRooms(int numOfRooms) {
        this.numOfRooms = numOfRooms;
    }



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
    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }
}

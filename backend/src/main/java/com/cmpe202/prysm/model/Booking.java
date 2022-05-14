package com.cmpe202.prysm.model;

public class Booking {

    private String room_type;
    private String hotel_id;
    private String hotel_name;
    private String country;
    private String city;
    private String customer_id;
    private String from_date;
    private String to_date;
    private String booking_id;


    public String getHotel_name() {
        return hotel_name;
    }

    public void setHotel_name(String hotel_name) {
        this.hotel_name = hotel_name;
    }

    public String getBooking_id() {
        return booking_id;
    }

    public void setBooking_id(String booking_id) {
        this.booking_id = booking_id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    private int price;

    public Booking(String room_type, String hotel_id, String country, String city, String customer_id, String from_date,
                   String to_date, int price, String hotel_name) {
        this.room_type = room_type;
        this.hotel_id = hotel_id;
        this.country = country;
        this.city = city;
        this.customer_id = customer_id;
        this.from_date = from_date;
        this.to_date = to_date;
        this.price = price;
        this.hotel_name = hotel_name;
    }

    public String getRoom_type() {
        return room_type;
    }

    public void setRoom_type(String room_type) {
        this.room_type = room_type;
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

    public String getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(String customer_id) {
        this.customer_id = customer_id;
    }

    public String getFrom_date() {
        return from_date;
    }

    public void setFrom_date(String from_date) {
        this.from_date = from_date;
    }

    public String getTo_date() {
        return to_date;
    }

    public void setTo_date(String to_date) {
        this.to_date = to_date;
    }



}

package com.cmpe202.prysm.model;

public class Room {

    private Amenities amenities;
    private String room_id;
    private String room_type;
    private int price;
    private String hotel_id;

    public Room(Amenities amenities, String room_id, String room_type, int price, String hotel_id) {
        this.amenities = amenities;
        this.room_id = room_id;
        this.room_type = room_type;
        this.price = price;
        this.hotel_id = hotel_id;
    }

    public Amenities getAmenities() {
        return amenities;
    }

    public void setAmenities(Amenities amenities) {
        this.amenities = amenities;
    }

    public String getRoom_id() {
        return room_id;
    }

    public void setRoom_id(String room_id) {
        this.room_id = room_id;
    }

    public String getRoom_type() {
        return room_type;
    }

    public void setRoom_type(String room_type) {
        this.room_type = room_type;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getHotel_id() {
        return hotel_id;
    }

    public void setHotel_id(String hotel_id) {
        this.hotel_id = hotel_id;
    }
}

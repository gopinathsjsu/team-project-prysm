package com.cmpe202.prysm.model;

public class Room {

    private Amenities amenities;
    private String room_type;
    private int count_of_rooms;
    private int price;
    private String hotel_id;

    public Room(Amenities amenities, String room_type, int count_of_rooms, int price, String hotel_id) {
        this.amenities = amenities;
        this.room_type = room_type;
        this.count_of_rooms = count_of_rooms;
        this.price = price;
        this.hotel_id = hotel_id;
    }

    public Amenities getAmenities() {
        return amenities;
    }

    public void setAmenities(Amenities amenities) {
        this.amenities = amenities;
    }

    public String getRoom_type() {
        return room_type;
    }

    public void setRoom_type(String room_type) {
        this.room_type = room_type;
    }

    public int getCount_of_rooms() {
        return count_of_rooms;
    }

    public void setCount_of_rooms(int count_of_rooms) {
        this.count_of_rooms = count_of_rooms;
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

package com.cmpe202.prysm.model;

public class BookingInformation {

    private String bookingId;
    private String hotelId;
    private String roomType;
    private String fromDate;
    private String toDate;
    private int totalPrice;
    private Amenities amenities;
    private String hotel_name;

    public BookingInformation(String bookingId, String hotelId, String roomType, String fromDate, String toDate,
                              int totalPrice, Amenities amenities, String hotel_name) {
        this.bookingId = bookingId;
        this.hotelId = hotelId;
        this.roomType = roomType;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.totalPrice = totalPrice;
        this.amenities = amenities;
        this.hotel_name = hotel_name;
    }

    public String getHotel_name() {
        return hotel_name;
    }

    public void setHotel_name(String hotel_name) {
        this.hotel_name = hotel_name;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getHotelId() {
        return hotelId;
    }

    public void setHotelId(String hotelId) {
        this.hotelId = hotelId;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
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

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Amenities getAmenities() {
        return amenities;
    }

    public void setAmenities(Amenities amenities) {
        this.amenities = amenities;
    }
}

package com.cmpe202.prysm.controller;

import com.cmpe202.prysm.dao.HotelBookingDao;
import com.cmpe202.prysm.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.sql.SQLException;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HotelBookingController {

    Logger logger = LoggerFactory.getLogger(HotelBookingController.class);

    HotelBookingDao hotelBookingDao=new HotelBookingDao();

    public HotelBookingController() throws SQLException {
    }

    //login User
    @PostMapping(path = "loginUser")
    public String loginUser(@RequestBody Customer customer) throws SQLException {
        //fetch from DB and check if user exists
        logger.info("here");
        if(hotelBookingDao.loginUser(customer.getUsername(), customer.getPassword()))
            return "Success";

        return "Fail";
    }

    @PostMapping(path = "loginEmployee")
    public String loginEmployee(@RequestBody Employee employee) throws SQLException {
        //fetch from DB and check if employee exists
        logger.info("here");
        if(hotelBookingDao.loginEmployee(employee.getUsername(), employee.getPassword()))
            return "Success";

        return "Fail";
    }

    //createUser
    //Register User
    @PostMapping(path = "registerUser",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Boolean registerUser(@RequestBody Customer customer) throws SQLException {
        //check if all the required information is provided by the user and register User
        logger.info("here in in register");
        if(hotelBookingDao.registerUser(customer.getUsername(), customer.getPassword(), customer.getName())){
            return true;
        }
        return false;
    }

    //manage hotel rewards account


    //Search for Hotels
    @PostMapping(path = "fetchHotels",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Hotel> fetchHotels(@RequestBody Hotel hotel) throws SQLException {
        //check if all the required information is provided by the user and register User
        return hotelBookingDao.fetchHotels(hotel.getCity(),hotel.getCountry(),hotel.getFromDate(),
                hotel.getToDate(),hotel.getNumOfRooms(),hotel.getNumOfGuests());

    }

    @PostMapping(path = "addHotel",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public Boolean addHotel(@RequestBody Hotel hotel) throws SQLException {
        //check if all the required information is provided by the user and register User
        return hotelBookingDao.addHotel(hotel);
    }



    //Search for Rooms in Hotel
    @GetMapping(path = "fetchRooms/",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Room> fetchRooms(@RequestParam String hotel_id) throws SQLException {
        return hotelBookingDao.fetchRooms(hotel_id);
    }

    //Fetch Customer Booking History
    @GetMapping(path = "fetchCustomerHistory/",
                produces = MediaType.APPLICATION_JSON_VALUE)
    public List<BookingInformation> fetchCustomerHistory(@RequestParam String customerId) throws SQLException{
        return hotelBookingDao.fetchCustomerHistory(customerId);
    }
    @GetMapping(path = "/getHotels",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Hotel> getHotels() throws SQLException {
        return hotelBookingDao.getHotels();
    }



    //Book Rooms
    @PostMapping(path = "bookRooms",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public int bookRooms(boolean bookWithRewards ,@RequestBody List<Room> selectedRooms) throws SQLException {
        return hotelBookingDao.bookRooms(bookWithRewards, selectedRooms);
    }

    //Cancel Reservation
    @PostMapping(path = "cancelReservation",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean changeReservation(@RequestBody Booking booking) throws SQLException {
        return hotelBookingDao.cancelReservation(booking.getBooking_id());
    }


    //Cancel Reservation



}

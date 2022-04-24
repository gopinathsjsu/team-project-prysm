package com.cmpe202.prysm.controller;

import com.cmpe202.prysm.dao.HotelBookingDao;
import com.cmpe202.prysm.model.Customer;
import com.cmpe202.prysm.model.Hotel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

import java.util.*;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
public class HotelBookingController {

    Logger logger = LoggerFactory.getLogger(HotelBookingController.class);

    HotelBookingDao hotelBookingDao=new HotelBookingDao();

    public HotelBookingController() throws SQLException {
    }

    //login
    @PostMapping(path = "loginUser")
    public String loginUser(@RequestBody Customer customer) throws SQLException {
        //fetch from DB and check if user exists
        logger.info("here");
        if(hotelBookingDao.loginUser(customer.getUsername(), customer.getPassword()))
            return "Success";

        return "Fail";
    }

    //createUser
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
        return hotelBookingDao.fetchHotels(hotel.getCity(),hotel.getCountry(),hotel.getFromDate(),hotel.getToDate(),hotel.getNumOfRooms(),hotel.getNumOfGuests());

    }

    //Book one or more rooms for stay up to 1 week
    /*
        Options may be selected for each room for one or more amenities:
        Daily Continental Breakfast
        Access to fitness room
        Access to Swimming Pool/Jacuzzi
        Daily Parking
        All meals included (Breakfast, Lunch, Dinner)
     */




    //Change/Cancel reservations


}

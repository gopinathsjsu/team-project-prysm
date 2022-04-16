package com.cmpe202.prysm.controller;

import com.cmpe202.prysm.model.Customer;
import com.cmpe202.prysm.model.Hotel;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class HotelBookingController {

    //login
    @PostMapping(path = "loginUser",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity loginUser(@RequestBody Customer customer) {
        //fetch from DB and check if user exists

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

    //createUser
    @PostMapping(path = "registerUser",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity registerUser(@RequestBody Customer customer) {
        //check if all the required information is provided by the user and register User

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

    //manage hotel rewards account

    //Search for Hotels
    @PostMapping(path = "fetchHotels",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Hotel> fetchHotels(@RequestBody String city, @RequestBody String fromDate,
                                    @RequestBody String toDate, @RequestBody Integer numOfRooms,
                                    @RequestBody Integer guestCount) {
        //check if all the required information is provided by the user and register User

        return new ArrayList<Hotel>();
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

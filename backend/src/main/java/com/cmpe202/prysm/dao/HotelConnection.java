package com.cmpe202.prysm.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class HotelConnection {

    private final String dbUrl = "jdbc:mysql://127.0.0.1:3306/cmpe202project";
    private final String username = "root";
    private final String password = "password";

    private Connection hotelConnection = null;

    private Connection getConnection() throws SQLException {
        if(hotelConnection == null) {
            hotelConnection = DriverManager.getConnection(dbUrl,username,password);
        }
        return hotelConnection;
    }

}

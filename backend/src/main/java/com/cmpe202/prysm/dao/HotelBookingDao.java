package com.cmpe202.prysm.dao;

import com.cmpe202.prysm.model.Hotel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class HotelBookingDao {
    public final String dbUrl = "jdbc:mysql://127.0.0.1:3306/cmpe202";
    public final String username = "root";
    public final String password = "password";

    public Connection connection = DriverManager.getConnection(dbUrl,username,password);

    Logger logger = LoggerFactory.getLogger(HotelBookingDao.class);

    public HotelBookingDao() throws SQLException {
    }
    public Boolean loginUser (String username, String password) throws SQLException {
        String sql = "select * from employee where employee_id=? and password=?";
        PreparedStatement preparedStatement=connection.prepareStatement(sql);
        logger.info("connection established");
        preparedStatement.setString(1,username);
        preparedStatement.setString(2,password);
        ResultSet resultSet= preparedStatement.executeQuery();
        if (resultSet.next()){
            logger.info("fromdb"+resultSet.getRow());
            return true;
        }
        return false;
    }

    public Boolean registerUser (String username, String password, String name) throws SQLException {
        String sql = "insert into customer (customer_id,password,customer_name ) values (?,?,?)";
        PreparedStatement preparedStatement=connection.prepareStatement(sql);
        logger.info("connection established");
        preparedStatement.setString(1,username);
        preparedStatement.setString(2,password);
        preparedStatement.setString(3,name);
        int row= preparedStatement.executeUpdate();
        if (row > 0){
            logger.info("db updated");
            return true;
        }
        return false;
    }
    public List<Hotel> fetchHotels(String country, String city, String fromDate,
                                   String toDate,  Integer numOfRooms,
                                   Integer guestCount) throws SQLException {

//        String sql = "select hotel_id, hotel_name, country, city from hotel where country=?, city=?";
        String sql = "select hotel_id, hotel_name, country, city from hotel H inner join booking B on " +
                " H.hotel_id = B.hotel_id where H.country=?, H.city=?, B.from_date !=?, b.to_date !=?";

        PreparedStatement preparedStatement=connection.prepareStatement(sql);
        logger.info("connection established");
        preparedStatement.setString(1,country);
        preparedStatement.setString(2,city);
        preparedStatement.setString(3,fromDate);
        preparedStatement.setString(4,toDate);
        ResultSet resultSet= preparedStatement.executeQuery();
        List<Hotel> hotels = new ArrayList<>();
        while (resultSet.next()){
            String id = resultSet.getString("hotel_id");
            String name = resultSet.getString("hotel_name");
            String hotel_country = resultSet.getString("country");
            String hotel_city = resultSet.getString("city");
            Hotel hotel = new Hotel(id, name, hotel_country, hotel_city);
            hotels.add(hotel);
        }
        return hotels;
    }
}

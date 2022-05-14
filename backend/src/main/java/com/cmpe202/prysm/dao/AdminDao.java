package com.cmpe202.prysm.dao;

import com.cmpe202.prysm.model.Employee;
import com.cmpe202.prysm.model.Hotel;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AdminDao {

    public final String dbUrl = "jdbc:mysql://127.0.0.1:3306/cmpe202project";
    public final String username = "root";
    public final String password = "password";

    public Connection connection = DriverManager.getConnection(dbUrl,username,password);

    public AdminDao() throws SQLException {
    }


    public Employee loginEmployee (String username, String password) throws SQLException {
        String sql = "select * from employee where employee_id = ? and password = ?";
        Employee employee = new Employee();
        PreparedStatement preparedStatement=connection.prepareStatement(sql);
        preparedStatement.setString(1,username);
        preparedStatement.setString(2,password);
        ResultSet resultSet= preparedStatement.executeQuery();

        if (resultSet.next()){
            employee.setUsername(resultSet.getString(1));
            employee.setPassword(resultSet.getString(3));
            employee.setName(resultSet.getString(4));
        }
        return  employee;
    }


    public List<Hotel> getHotelsForAdmin() throws SQLException {
        List<Hotel> hotels = new ArrayList<>();
        String sql = "select * from hotel";
        PreparedStatement preparedStatement=connection.prepareStatement(sql);
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()){
            Hotel hotel = new Hotel();
            hotel.setHotel_id(resultSet.getString(1));
            hotel.setHotel_name(resultSet.getString(2));
            hotel.setCountry(resultSet.getString(3));
            hotel.setCity(resultSet.getString(4));
            hotel.setDaily_continental_breakfast(resultSet.getBoolean(5));
            hotel.setFitness_room(resultSet.getBoolean(6));
            hotel.setSwimming_pool(resultSet.getBoolean(7));
            hotel.setJacuzzi(resultSet.getBoolean(8));
            hotel.setDaily_parking(resultSet.getBoolean(9));
            hotel.setAll_meals(resultSet.getBoolean(10));
            hotels.add(hotel);
        }
        return hotels;
    }


    public boolean addHotel(Hotel hotel) throws SQLException {
        String queryToAddHotels = "insert into hotel (hotel_id,hotel_name,country,city,daily_continental_breakfast,fitness_room, " +
                "Swimming_pool, jacuzzi, daily_parking, all_meals ) values (?,?,?,?,?,?,?,?,?,?)";

        PreparedStatement preparedStatement=connection.prepareStatement(queryToAddHotels);
        preparedStatement.setString(1,hotel.getHotel_id());
        preparedStatement.setString(2,hotel.getHotel_name());
        preparedStatement.setString(3,hotel.getCountry());
        preparedStatement.setString(4,hotel.getCity());
        preparedStatement.setBoolean(5,hotel.isDaily_continental_breakfast());
        preparedStatement.setBoolean(6,hotel.isFitness_room());
        preparedStatement.setBoolean(7,hotel.isSwimming_pool());
        preparedStatement.setBoolean(8,hotel.isJacuzzi());
        preparedStatement.setBoolean(9,hotel.isDaily_parking());
        preparedStatement.setBoolean(10,hotel.isAll_meals());
        int row= preparedStatement.executeUpdate();
        if (row > 0){
            return true;
        }
        return false;
    }


}

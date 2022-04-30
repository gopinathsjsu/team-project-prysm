package com.cmpe202.prysm.dao;

import com.cmpe202.prysm.model.Hotel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class HotelBookingDao {
    public final String dbUrl = "jdbc:mysql://127.0.0.1:3306/cmpe202project";
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
    public List<Hotel> fetchHotels(String city, String country, String fromDate,
                                   String toDate,  Integer numOfRooms,
                                   Integer guestCount) throws SQLException {

//        String sql = "select hotel_id, hotel_name, country, city from hotel where country=?, city=?";
//        logger.info(country);
//        logger.info(city);
//        logger.info(String.valueOf(fromDate));
//        logger.info(String.valueOf(toDate));
//        logger.info(String.valueOf(numOfRooms));
//        logger.info(String.valueOf(guestCount));
        String sql1 = "select H.hotel_id, count(*) from hotel H join room R on H.hotel_id = R.hotel_id where H.city=? and H.country=? group by H.hotel_id having count(*)>= ?;";

        PreparedStatement preparedStatement=connection.prepareStatement(sql1);
//        logger.info("connection established");
        preparedStatement.setString(1,city);
        preparedStatement.setString(2,country);
        preparedStatement.setInt(3,numOfRooms);
        ResultSet resultSet= preparedStatement.executeQuery();
//        logger.info("Blank",String.valueOf(resultSet));
        HashMap<String,Integer> hotelCountMap = new HashMap<String, Integer>();
        while(resultSet.next()){
//            logger.info("inside while");
//            logger.info(String.valueOf(resultSet.getRow()));

            hotelCountMap.put(resultSet.getString(1),resultSet.getInt(2));
        }
//        for(Map.Entry<String,Integer>entry:HashMap.entrySet()){
//            String key=hotelCount.getKey();
//            Integer value=hotelCount.getValue();
//        }
//        logger.info("test values {}", hotelCountMap);
        List<String> hotelIds=new ArrayList<>();
        for(String hotelId : hotelCountMap.keySet()){
            int value = hotelCountMap.get(hotelId);
            if(value>=numOfRooms){
                String sql2="select count(*) from booking B where hotel_id=? and (? between B.from_date and B.to_date) or (? between B.from_date and B.to_date) group by ?;";
                PreparedStatement preparedStatement2=connection.prepareStatement(sql2);
                preparedStatement2.setString(1,hotelId);
                preparedStatement2.setString(2,fromDate);
                preparedStatement2.setString(3,toDate);
                preparedStatement2.setString(4,hotelId);

                ResultSet resultSet2= preparedStatement.executeQuery();
                int roomsOccupied=resultSet2.getRow();
                if(value-roomsOccupied>=numOfRooms){
                    hotelIds.add(hotelId);
                }
            }
        }
//        logger.info("test list {}", hotelIds);

        List<Hotel> validHotels=new ArrayList<>();
        for(String hotelId2:hotelIds){
            String sql3="select * from hotel where hotel_id=?";
            PreparedStatement preparedStatement3=connection.prepareStatement(sql3);
            preparedStatement3.setString(1,hotelId2);
            ResultSet resultSet3=preparedStatement3.executeQuery();


            while(resultSet3.next()){
                Hotel hotel=new Hotel();
                hotel.setHotel_id(resultSet3.getString(1));
                hotel.setHotel_name(resultSet3.getString(2));
                hotel.setCountry(resultSet3.getString(3));
                hotel.setCity(resultSet3.getString(4));
                hotel.setDaily_continental_breakfast(resultSet3.getBoolean(5));
                hotel.setFitness_room(resultSet3.getBoolean(6));
                hotel.setSwimming_pool(resultSet3.getBoolean(7));
                hotel.setJacuzzi(resultSet3.getBoolean(8));
                hotel.setDaily_parking(resultSet3.getBoolean(9));
                hotel.setAll_meals(resultSet3.getBoolean(10));
                hotel.setFromDate(fromDate);
                hotel.setToDate(toDate);
                hotel.setNumOfGuests(guestCount);
                hotel.setNumOfRooms(numOfRooms);
                validHotels.add(hotel);

            }


        }

        return validHotels;
    }
}

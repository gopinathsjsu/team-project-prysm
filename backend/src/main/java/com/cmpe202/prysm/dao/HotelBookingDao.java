package com.cmpe202.prysm.dao;

import com.cmpe202.prysm.model.Amenities;
import com.cmpe202.prysm.model.Booking;
import com.cmpe202.prysm.model.Hotel;
import com.cmpe202.prysm.model.Room;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository
public class HotelBookingDao {
    public final String dbUrl = "jdbc:mysql://127.0.0.1:3306/cmpe202project";
    public final String username = "root";
    public final String password = "password";

    public Connection connection = DriverManager.getConnection(dbUrl,username,password);

    Logger logger = LoggerFactory.getLogger(HotelBookingDao.class);

    private static List<Hotel> availableHotelsList = new ArrayList<>();

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

        String sql1 = "select H.hotel_id, count(*) from hotel H join room R on H.hotel_id = R.hotel_id where " +
                      "H.city=? and H.country=? group by H.hotel_id having count(*)>= ?;";

        PreparedStatement preparedStatement=connection.prepareStatement(sql1);
        preparedStatement.setString(1,city);
        preparedStatement.setString(2,country);
        preparedStatement.setInt(3,numOfRooms);
        ResultSet resultSet= preparedStatement.executeQuery();
        HashMap<String,Integer> hotelCountMap = new HashMap<String, Integer>();
        while(resultSet.next()){
            hotelCountMap.put(resultSet.getString(1),resultSet.getInt(2));
        }
        List<String> hotelIds=new ArrayList<>();
        for(String hotelId : hotelCountMap.keySet()){
            int value = hotelCountMap.get(hotelId);
            if(value>=numOfRooms){
                String sql2="select count(*) from booking B where hotel_id=? and (? between B.from_date and B.to_date) or " +
                            "(? between B.from_date and B.to_date) group by ?;";
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
        availableHotelsList.addAll(validHotels);
        return validHotels;
    }



    public boolean bookHotel(Booking booking) {

        boolean hotelBooked = false;
        String hotelBookingQuery = "Select ";
        return hotelBooked;

    }

    public List<Room> fetchRooms(String hotelId) throws SQLException {

        List<Room> availableRooms = new ArrayList<>();
        String fetchRoomsQuery = "Select * from room R join Hotel H on R.hotel_id = H.hotel_id where H.hotel_id = ?";

        for(Hotel hotel : availableHotelsList) {
            logger.info("hotel Id "+hotelId +" and existing hotelId "+hotel.getHotel_id());
            if(hotel.getHotel_id().trim().equals(hotelId.trim())) {
                logger.info(hotel.getHotel_id() + " , "+hotel.getHotel_name());
                PreparedStatement preparedStatement = connection.prepareStatement(fetchRoomsQuery);
                preparedStatement.setString(1, hotelId);
                ResultSet resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    Amenities amenities = new Amenities(resultSet.getBoolean(9), resultSet.getBoolean(10),
                            resultSet.getBoolean(11), resultSet.getBoolean(12), resultSet.getBoolean(13), resultSet.getBoolean(13));
                    Room room = new Room(amenities, resultSet.getString(1), resultSet.getString(3), resultSet.getInt(4), resultSet.getString(2));
                    availableRooms.add(room);
                }
            }
        }

        return availableRooms;
    }

}

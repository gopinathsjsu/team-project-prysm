package com.cmpe202.prysm.dao;

import com.cmpe202.prysm.model.Amenities;
import com.cmpe202.prysm.model.Hotel;
import com.cmpe202.prysm.model.Room;
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

    private static List<Hotel> availableHotelsList = new ArrayList<>();
    private static Map<String, Integer> occupiedRooms = new HashMap<>();

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

        String sql1 = "select R.hotel_id, sum(R.count_of_rooms) from hotel H join room R on H.hotel_id = R.hotel_id where " +
                "H.city=? and H.country=? group by R.hotel_id having sum(R.count_of_rooms) >= ?;";

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
        loadValidHotels(fromDate, toDate, numOfRooms, hotelCountMap, hotelIds);
        List<Hotel> validHotels=new ArrayList<>();
        for(String hotelId : hotelIds){
            String queryToFetchHotels = "select * from hotel where hotel_id=?";
            preparedStatement = connection.prepareStatement(queryToFetchHotels);
            preparedStatement.setString(1,hotelId);
            resultSet = preparedStatement.executeQuery();

            while(resultSet.next()){
                Hotel hotel=new Hotel(resultSet.getString(1), resultSet.getString(2), resultSet.getString(3), resultSet.getString(4),
                        fromDate, toDate, numOfRooms, guestCount, resultSet.getBoolean(5), resultSet.getBoolean(6), resultSet.getBoolean(7),
                        resultSet.getBoolean(8), resultSet.getBoolean(9), resultSet.getBoolean(10));
                validHotels.add(hotel);
            }
        }
        availableHotelsList.clear();
        availableHotelsList.addAll(validHotels);
        return validHotels;
    }

    private void loadValidHotels(String fromDate, String toDate, Integer numOfRooms, HashMap<String, Integer> hotelCountMap, List<String> hotelIds) throws SQLException {
        ResultSet resultSet;
        PreparedStatement preparedStatement;
        for(String hotelId : hotelCountMap.keySet()){

            int value = hotelCountMap.get(hotelId);

            if(value>= numOfRooms){

                String queryToFetchCount = "select count(*) from booking B where hotel_id=? and (? between B.from_date and B.to_date) or " +
                                            "(? between B.from_date and B.to_date) group by ?;";
                preparedStatement =connection.prepareStatement(queryToFetchCount);
                preparedStatement.setString(1,hotelId);
                preparedStatement.setString(2, fromDate);
                preparedStatement.setString(3, toDate);
                preparedStatement.setString(4,hotelId);

                resultSet = preparedStatement.executeQuery();
                int roomsOccupied=resultSet.getRow();

                if(value - roomsOccupied >= numOfRooms){
                    hotelIds.add(hotelId);
                    loadOccupiedRoomData(fromDate, toDate, hotelId);
                }
            }
        }
    }

    private void loadOccupiedRoomData(String fromDate, String toDate, String hotelId) throws SQLException {
        ResultSet resultSet;
        PreparedStatement preparedStatement;
        List<String> bookingIds = new ArrayList<>();
        //fetch booking Id from booking for booked room
        String queryToFetchBookingIds = "Select booking_id from booking where hotel_id = ? and (? between from_date and to_date) or (? between from_date and to_date)";
        preparedStatement = connection.prepareStatement(queryToFetchBookingIds);
        preparedStatement.setString(1, hotelId);
        preparedStatement.setString(2, fromDate);
        preparedStatement.setString(3, toDate);

        resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            bookingIds.add(resultSet.getString(1));
        }
        //use booking Id to fetch room types from roomsBooked
        for(String bookingId : bookingIds) {
            logger.info("booking Id " + bookingId);
            String queryToFetchOccupiedRoomTypes = "Select room_type, count(*) from roomsBooked where booking_id = ? group by room_type";
            preparedStatement = connection.prepareStatement(queryToFetchOccupiedRoomTypes);
            preparedStatement.setString(1, bookingId);

            resultSet = preparedStatement.executeQuery();
            occupiedRooms.clear();
            while (resultSet.next()) {
                occupiedRooms.put(resultSet.getString(1), resultSet.getInt(2));
            }

        }
    }


    public List<Room> fetchRooms(String hotelId) throws SQLException {

        List<Room> availableRoomsList = new ArrayList<>();
        String fetchRoomsQuery = "Select * from room R join Hotel H on R.hotel_id = H.hotel_id where H.hotel_id = ?";
        logger.info("availableRooms size" + availableRoomsList.size() );
        for(Hotel hotel : availableHotelsList) {
            logger.info("hotel Id "+hotelId +" and existing hotelId "+hotel.getHotel_id());
            if(hotel.getHotel_id().trim().equals(hotelId.trim())) {
                Map<String, Integer> totalAvailableRoomsMap = new HashMap<>();

                String queryForAvailableRoomTypes = "Select room_type, count_of_rooms from room where hotel_id = ?";
                PreparedStatement preparedStatement = connection.prepareStatement(queryForAvailableRoomTypes);
                preparedStatement.setString(1, hotelId);

                ResultSet resultSet = preparedStatement.executeQuery();
                while(resultSet.next()) {
                    totalAvailableRoomsMap.put(resultSet.getString(1), resultSet.getInt(2));
                }

                preparedStatement = connection.prepareStatement(fetchRoomsQuery);
                preparedStatement.setString(1, hotelId);
                resultSet = preparedStatement.executeQuery();
                while (resultSet.next()) {
                    Amenities amenities = new Amenities(resultSet.getBoolean(9), resultSet.getBoolean(10),
                            resultSet.getBoolean(11), resultSet.getBoolean(12), resultSet.getBoolean(13), resultSet.getBoolean(13));
                    String roomType = resultSet.getString(1);
                    int availableRooms = totalAvailableRoomsMap.getOrDefault(roomType, 0) - occupiedRooms.getOrDefault(roomType, 0);
                    Room room = new Room(amenities, roomType, availableRooms, resultSet.getInt(4), resultSet.getString(2));
                    availableRoomsList.add(room);
                }
            }
        }

        return availableRoomsList;
    }

}

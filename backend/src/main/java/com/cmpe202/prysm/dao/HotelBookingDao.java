package com.cmpe202.prysm.dao;

import com.cmpe202.prysm.holidays.SeasonalPricing;
import com.cmpe202.prysm.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import java.sql.*;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class HotelBookingDao {

    public final String dbUrl = "jdbc:mysql://cmpe-202-prysm-db.c4aze5nwerob.us-west-1.rds.amazonaws.com:3306/cmpe202project";
    public final String dbUsername = "admin";
    public final String dbPassword = "password";

    public Connection connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);

    Logger logger = LoggerFactory.getLogger(HotelBookingDao.class);

    private static List<Hotel> availableHotelsList = new ArrayList<>();
    private static Map<String, Integer> occupiedRooms = new HashMap<>();

    private static String HOTEL_ID = new String();
    private static String FROM_DATE = new String();
    private static String TO_DATE = new String();
    private static String USER_NAME = new String();
    private static int userRewards = 0;

    public HotelBookingDao() throws SQLException {
    }


    public Customer loginUser (String username, String password) throws SQLException {
        String sql = "select * from customer where customer_id = ? and password = ?";
        PreparedStatement preparedStatement=connection.prepareStatement(sql);
        preparedStatement.setString(1,username);
        preparedStatement.setString(2,password);

        Customer customer = new Customer();

        ResultSet resultSet= preparedStatement.executeQuery();

        if (resultSet.next()){
            customer = new Customer(resultSet.getString(1), resultSet.getString(2), resultSet.getString(3), resultSet.getInt(4));

            userRewards = resultSet.getInt(4);
            USER_NAME = new String(username);
        }
        return customer;
    }


    public int getCustomerRewards(String customerId) throws SQLException {
        String getCustomerRewardsQuery = "Select rewards from customer where customer_id = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(getCustomerRewardsQuery);
        preparedStatement.setString(1, customerId);

        ResultSet resultSet = preparedStatement.executeQuery();
        int rewards = 0;
        while (resultSet.next()) {
            rewards = resultSet.getInt(1);
        }
        return rewards;
    }


    public boolean registerUser (String username, String password, String name, int rewards) throws SQLException {
        logger.info(String.valueOf(rewards));

        String sql = "insert into customer (customer_id,password,customer_name, rewards ) values (?,?,?,?)";
        PreparedStatement preparedStatement=connection.prepareStatement(sql);
        preparedStatement.setString(1,username);
        preparedStatement.setString(2,password);
        preparedStatement.setString(3,name);
        preparedStatement.setInt(4,rewards);
        int row= preparedStatement.executeUpdate();
        if (row > 0){
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
        loadStaticDataToBookRooms(null, fromDate, toDate);
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
                preparedStatement = connection.prepareStatement(queryToFetchCount);
                preparedStatement.setString(1,hotelId);
                preparedStatement.setString(2, fromDate);
                preparedStatement.setString(3, toDate);
                preparedStatement.setString(4,hotelId);

                resultSet = preparedStatement.executeQuery();
                int roomsOccupied=resultSet.getRow();

                if(value - roomsOccupied >= numOfRooms){
                    hotelIds.add(hotelId);
                    //    loadOccupiedRoomData(fromDate, toDate, hotelId);
                }
            }
        }
    }


    private void loadOccupiedRoomData(String fromDate, String toDate, String hotelId) throws SQLException {
        ResultSet resultSet;
        PreparedStatement preparedStatement;
        List<String> bookingIds = new ArrayList<>();
        //fetch booking Id from booking for booked room
        String queryToFetchBookingIds = "Select booking_id from booking where hotel_id = ? and ((? between from_date and to_date) or (? between from_date and to_date))";
        preparedStatement = connection.prepareStatement(queryToFetchBookingIds);
        preparedStatement.setString(1, hotelId);
        preparedStatement.setString(2, fromDate);
        preparedStatement.setString(3, toDate);

        resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            bookingIds.add(resultSet.getString(1));
        }
        //use booking Id to fetch room types from roomsBooked
        occupiedRooms.clear();
        for(String bookingId : bookingIds) {
            String queryToFetchOccupiedRoomTypes = "Select room_type, count_of_rooms from roomsBooked where booking_id = ? ";
            preparedStatement = connection.prepareStatement(queryToFetchOccupiedRoomTypes);
            preparedStatement.setString(1, bookingId);

            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String roomType = resultSet.getString(1);
                int countOfRooms = resultSet.getInt(2);
                occupiedRooms.put(roomType, occupiedRooms.getOrDefault(roomType, 0)+countOfRooms);
            }

        }
    }


    public List<Room> fetchRooms(String hotelId) throws SQLException {
        HOTEL_ID = hotelId;
        List<Room> availableRoomsList = new ArrayList<>();
        String fetchRoomsQuery = "Select * from room R join hotel H on R.hotel_id = H.hotel_id where H.hotel_id = ?";

        loadOccupiedRoomData(FROM_DATE, TO_DATE, HOTEL_ID);

        int dynamicPrice = 0;

        SeasonalPricing seasonalPricing = SeasonalPricing.getSeasonalPricing();
        seasonalPricing.setDate(FROM_DATE);
        dynamicPrice = seasonalPricing.addDynamicPricing(dynamicPrice);

        LocalDate localDate = LocalDate.parse(FROM_DATE);
        DayOfWeek dayOfWeek = localDate.getDayOfWeek();

        boolean isCustomerLoyal = isCustomerLoyal();

        if((dayOfWeek == DayOfWeek.SATURDAY || dayOfWeek == DayOfWeek.SUNDAY) && !isCustomerLoyal) {
            dynamicPrice += 10;
        }

        for(Hotel hotel : availableHotelsList) {
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
                    if(availableRooms > 0) {
                        Room room = new Room(amenities, roomType, availableRooms, resultSet.getInt(4)+dynamicPrice, resultSet.getString(2));
                        availableRoomsList.add(room);
                    }
                }
            }
        }
        loadStaticDataToBookRooms(hotelId , null , null);
        return availableRoomsList;
    }


    public void loadStaticDataToBookRooms(String hotelId, String fromDate, String toDate) {
        HOTEL_ID = hotelId == null ? HOTEL_ID : new String(hotelId);
        FROM_DATE = fromDate == null ? FROM_DATE : new String(fromDate);
        TO_DATE = toDate == null ? TO_DATE : new String(toDate);
    }


    public int bookRooms(boolean bookWithRewards, List<Room> selectedRooms) throws SQLException {

        //write into booking table with count of rooms booked and from and to date
        int totalPrice = 0;
        int totalRooms = 0;
        int bookingId = 0;
        for(Room room : selectedRooms) {
            totalPrice += room.getPrice();
            totalRooms += room.getCount_of_rooms();
        }
        if(bookWithRewards) {
            if(userRewards < totalPrice) {
                totalPrice -= userRewards;
                userRewards = 0;
            } else {
                userRewards -= totalPrice;
                totalPrice = 0;
            }
            updateCustomerRewardsAfterBooking(USER_NAME, userRewards);
        }

        try {
            String queryToInsertInBooking = "Insert into booking values (NULL, ?, ? , ? , ?, ?, ? )";
            PreparedStatement preparedStatement = connection.prepareStatement(queryToInsertInBooking);
            preparedStatement.setString(1, USER_NAME);
            preparedStatement.setString(2, HOTEL_ID);
            preparedStatement.setString(3, FROM_DATE);
            preparedStatement.setString(4, TO_DATE);
            preparedStatement.setInt(5, totalRooms);
            preparedStatement.setInt(6, totalPrice);



            preparedStatement.executeUpdate();

            String queryToFetchBookingId = "Select max(booking_id) from booking";
            preparedStatement = connection.prepareStatement(queryToFetchBookingId);

            ResultSet resultSet = preparedStatement.executeQuery();
            if(resultSet.next()) {
                bookingId = resultSet.getInt(1);
            }

            //write into roomsBooked table with room type booked
            String queryToInsertInRoomsBooked = "Insert into roomsBooked values (?, ? , ? , ? , ? , ? , ? , ?, ?) ";
            for (Room room : selectedRooms) {
                Amenities amenities = room.getAmenities();
                preparedStatement = connection.prepareStatement(queryToInsertInRoomsBooked);
                preparedStatement.setInt(1, bookingId);
                preparedStatement.setString(2, room.getRoom_type());
                preparedStatement.setBoolean(3, amenities.getDaily_continental_breakfast());
                preparedStatement.setBoolean(4, amenities.getFitness_room());
                preparedStatement.setBoolean(5, amenities.getSwimming_pool());
                preparedStatement.setBoolean(6, amenities.getJacuzzi());
                preparedStatement.setBoolean(7, amenities.getDaily_parking());
                preparedStatement.setBoolean(8, amenities.getAll_meals());
                preparedStatement.setInt(9, room.getCount_of_rooms());

                preparedStatement.executeUpdate();
                updateCustomerRewards(USER_NAME, totalPrice / 10);
            }
        } catch (SQLException e) {
            return 0;
        }
        return bookingId;

    }


    public void updateCustomerRewardsAfterBooking(String customerId, int rewards) throws SQLException {

        String updateCustomerRewardsAfterBookingQuery = "Update customer set rewards = ? where customer_id = ?";

        PreparedStatement preparedStatement = connection.prepareStatement(updateCustomerRewardsAfterBookingQuery);
        preparedStatement.setInt(1, rewards);
        preparedStatement.setString(2, customerId);
        preparedStatement.executeUpdate();
    }


    public List<BookingInformation> fetchCustomerHistory(String customerId) throws SQLException {

        String fetchCustomerHistoryQuery = "Select R.*, B.hotel_id, B.from_date, B.to_date, B.total_price, H.hotel_name from roomsBooked R join booking B " +
                                           "on R.booking_id = B.booking_id join hotel H on B.hotel_id = H.hotel_id where B.customer_id = ?;";

        PreparedStatement preparedStatement = connection.prepareStatement(fetchCustomerHistoryQuery);
        preparedStatement.setString(1, USER_NAME);

        List<BookingInformation> userBookingInformation = new ArrayList<>();

        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            Amenities amenities = new Amenities(resultSet.getBoolean(3), resultSet.getBoolean(4), resultSet.getBoolean(5), resultSet.getBoolean(6),
                                                resultSet.getBoolean(7), resultSet.getBoolean(3));
            BookingInformation bookingInformation = new BookingInformation(resultSet.getString(1), resultSet.getString(10),
                                                     resultSet.getString(2), resultSet.getString(11), resultSet.getString(12),
                                                    resultSet.getInt(13), amenities, resultSet.getString(14));

            userBookingInformation.add(bookingInformation);
        }
        return userBookingInformation;
    }


    private void updateCustomerRewards(String customerId, int rewards) throws SQLException {

        String getCustomerRewardsQuery = "Select rewards from customer where customer_id = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(getCustomerRewardsQuery);
        preparedStatement.setString(1, customerId);
        int customerRewards = 0;

        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            customerRewards = resultSet.getInt(1);
        }

        customerRewards = Math.max(0, customerRewards + rewards);

        String updateCustomerRewardsQuery = "Update customer set rewards = ? where customer_id = ?";
        preparedStatement = connection.prepareStatement(updateCustomerRewardsQuery);
        preparedStatement.setInt(1, customerRewards);
        preparedStatement.setString(2, customerId);

        preparedStatement.executeUpdate();

        userRewards = customerRewards;

    }


    public boolean cancelReservation(String bookingId) {

        LocalDate currentDate = LocalDate.now(ZoneId.of( "America/Montreal" ));
        String fetchBookingDateQuery = "Select from_date, customer_id, total_price from booking where booking_id = ?";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(fetchBookingDateQuery);
            preparedStatement.setString(1, bookingId);
            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                String reservationStartDateStr = resultSet.getString(1);
                LocalDate reservationStartDate = LocalDate.parse(reservationStartDateStr);
                if (currentDate.isAfter(reservationStartDate)) {
                    return false;
                }
            }

            String customerId = resultSet.getString(2);
            int rewards = (-1) * resultSet.getInt(3) / 10;

            updateCustomerRewards(customerId, rewards);

            String cancelReservationQuery = "Delete from booking where booking_id = ?";

            preparedStatement = connection.prepareStatement(cancelReservationQuery);
            preparedStatement.setString(1, bookingId);
            preparedStatement.execute();

            cancelReservationQuery = "Delete from roomsBooked where booking_id = ?";

            preparedStatement = connection.prepareStatement(cancelReservationQuery);
            preparedStatement.setString(1, bookingId);
            preparedStatement.execute();

        } catch (SQLException e) {
            return false;
        }
        return true;
    }


    public boolean updateReservation(String bookingId, String fromDateStr, String toDateStr) throws SQLException {

        String queryToFetchBookingInformation = "Select from_date, to_date, hotel_id from booking where booking_id = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(queryToFetchBookingInformation);
        preparedStatement.setString(1, bookingId);

        ResultSet resultSet = preparedStatement.executeQuery();

        while(resultSet.next()) {
            String bookingStartDateStr = resultSet.getString(1);
            String bookingEndDateStr = resultSet.getString(2);
            String hotelId = resultSet.getString(3);

            LocalDate currentDate = LocalDate.now(ZoneId.of( "America/Montreal" ));
            LocalDate bookingStartDate = LocalDate.parse(bookingStartDateStr);
            LocalDate bookingEndDate = LocalDate.parse(bookingEndDateStr);

            if(currentDate.isAfter(bookingEndDate) || currentDate.isAfter(bookingStartDate)) {
                return false;
            }

            LocalDate fromDate = LocalDate.parse(fromDateStr);

            if(fromDate.isBefore(currentDate)) {
                return false;
            }

            return updateBooking(hotelId, bookingId, fromDateStr, toDateStr);

        }
        return false;
    }


    public boolean updateBooking(String hotelId, String bookingId, String fromDate, String toDate) throws SQLException {

        //formulate existing room booking information from rooms booked table in Map
        Map<String, Integer> roomsMap = new HashMap<>();
        String queryToFetchRoomsBooked = "Select room_type, count_of_rooms from roomsBooked where booking_id = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(queryToFetchRoomsBooked);
        preparedStatement.setString(1, bookingId);

        ResultSet resultSet = preparedStatement.executeQuery();

        while (resultSet.next()) {
            roomsMap.put(resultSet.getString(1), resultSet.getInt(2));
        }

        HOTEL_ID = hotelId;
        FROM_DATE = fromDate;
        TO_DATE = toDate;

        //find availability of the rooms obtained from map for new dates
        List<Room> availableRooms = fetchRooms(hotelId);
        Map<String, Integer> availableRoomMap = new HashMap<>();
        for(Room room : availableRooms) {

            //extract the map and find if we have enough available room types to reschedule
            String roomType = room.getRoom_type();
            int roomCount = room.getCount_of_rooms();
            availableRoomMap.put(roomType, availableRoomMap.getOrDefault(roomType, 0) + roomCount);

        }

        boolean isPossible = true;

        for(String roomType : roomsMap.keySet()) {
            if(availableRoomMap.getOrDefault(roomType, 0 ) < roomsMap.get(roomType)) {
                isPossible = false;
                break;
            }
        }

        if(isPossible) {
            String updateBookingInformation = "Update booking set from_date = ?, to_date = ? where booking_id = ?";

            preparedStatement = connection.prepareStatement(updateBookingInformation);
            preparedStatement.setString(1, fromDate);
            preparedStatement.setString(2, toDate);
            preparedStatement.setString(3, bookingId);

            preparedStatement.executeUpdate();

            return true;
        }

        return false;
    }


    public boolean isCustomerLoyal() throws SQLException {

        String queryToFetchBookingCount = "select count(*) from booking where customer_id = ? group by customer_id";

        PreparedStatement preparedStatement = connection.prepareStatement( queryToFetchBookingCount );
        preparedStatement.setString(1, USER_NAME);

        ResultSet resultSet = preparedStatement.executeQuery();
        int count = 0;
        if(resultSet.next()) {
            count = resultSet.getInt(1);
        }

        return (count == 0 || count % 5 != 0) ? false : true ;
    }

}

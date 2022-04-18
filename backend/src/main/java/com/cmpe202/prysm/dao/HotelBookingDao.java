package com.cmpe202.prysm.dao;

import com.cmpe202.prysm.controller.HotelBookingController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;

@Repository
public class HotelBookingDao {
    public final String dbUrl="jdbc:mysql://127.0.0.1:3306/cmpe202project";
    public final String username="root";
    public final String password="password";

    public final Connection connection= DriverManager.getConnection(dbUrl,username,password);

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
}

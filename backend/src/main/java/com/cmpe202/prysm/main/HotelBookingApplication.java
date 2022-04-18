package com.cmpe202.prysm.main;

import com.cmpe202.prysm.controller.HotelBookingController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackageClasses = HotelBookingController.class)
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class HotelBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(HotelBookingApplication.class, args);
	}

}

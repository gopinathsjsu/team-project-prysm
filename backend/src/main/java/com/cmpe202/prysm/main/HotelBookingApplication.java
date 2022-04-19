package com.cmpe202.prysm.main;

import com.cmpe202.prysm.controller.HotelBookingController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@ComponentScan(basePackageClasses = HotelBookingController.class)
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class HotelBookingApplication {

	@Bean
	public WebMvcConfigurer configure(){
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/*").allowedOrigins("*");
			}
		};
	}


	public static void main(String[] args) {
		SpringApplication.run(HotelBookingApplication.class, args);
	}

}

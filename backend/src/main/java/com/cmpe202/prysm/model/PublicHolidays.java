package com.cmpe202.prysm.model;

import java.time.LocalDate;
import java.util.List;

public class PublicHolidays {

    private List<String> publicHolidays;

    public PublicHolidays(List<String> publicHolidays) {
        this.publicHolidays = publicHolidays;
    }

    public List<String> getPublicHolidays() {
        return publicHolidays;
    }

    public void setPublicHolidays(List<String> publicHolidays) {
        this.publicHolidays = publicHolidays;
    }

}

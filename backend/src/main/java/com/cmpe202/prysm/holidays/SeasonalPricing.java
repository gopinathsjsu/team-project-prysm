package com.cmpe202.prysm.holidays;

import java.time.LocalDate;
import java.util.*;

public class SeasonalPricing implements  PriceHandler{

    private PriceHandler next;

    public static Map<String, Integer> seasonalPrices = new HashMap<>();
    public static Map<String, String> season = new HashMap<>();
    private String date = new String();

    private static SeasonalPricing seasonalPricing;


    private SeasonalPricing () {
        seasonalPrices.put("Spring", -10);
        seasonalPrices.put("Summer", 20);
        seasonalPrices.put("Fall", -20);
        seasonalPrices.put("Winter", 50);

        season.put("JANUARY", "Spring");
        season.put("FEBRUARY", "Spring");
        season.put("MARCH", "Spring");
        season.put("APRIL", "Spring");
        season.put("MAY", "Summer");
        season.put("JUNE", "Summer");
        season.put("JULY", "Summer");
        season.put("AUGUST", "Fall");
        season.put("SEPTEMBER", "Fall");
        season.put("OCTOBER", "Fall");
        season.put("NOVEMBER", "Winter");
        season.put("DECEMBER", "Winter");
    }

    public static SeasonalPricing getSeasonalPricing() {
        if(seasonalPricing == null) {
            seasonalPricing = new SeasonalPricing();
        }
        return seasonalPricing;
    }

    @Override
    public void setPriceHandler(PriceHandler priceHandler) {
        this.next = priceHandler;
    }

    @Override
    public int addDynamicPricing(int totalPrice) {
        PublicHolidays publicHolidays = new PublicHolidays();
        if(publicHolidays.publicHolidaysList.contains(date)) {
            this.setPriceHandler(publicHolidays);
            totalPrice = next.addDynamicPricing(totalPrice);
        }
        return getSeasonalPricing(totalPrice);
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getSeasonalPricing(int totalPrice) {
        LocalDate localDate = LocalDate.parse(date);
        String month = localDate.getMonth().toString().toUpperCase();
        return totalPrice + seasonalPrices.get(season.get(month));
    }
}

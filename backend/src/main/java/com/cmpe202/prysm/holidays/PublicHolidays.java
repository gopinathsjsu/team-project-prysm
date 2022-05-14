package com.cmpe202.prysm.holidays;

import java.util.ArrayList;
import java.util.List;

public class PublicHolidays implements PriceHandler {

    private PriceHandler next;

    public static PublicHolidays publicHolidays = null;
    public List<String> publicHolidaysList = new ArrayList<>();

    private static String MEMORIAL_DAY = "2022-05-30";
    private static String INDEPENDENCE_DAY = "2022-07-04";
    private static String LABOR_DAY = "2022-09-05";
    private static String VETERANS_DAY = "2022-11-11";
    private static String THANKSGIVING_DAY = "2022-11-24";
    private static String CHRISTMAS = "2022-12-25";
    private static String CHRISTMAS_DAY = "2022-12-26";


    public PublicHolidays(){

        publicHolidaysList.add(MEMORIAL_DAY);
        publicHolidaysList.add(INDEPENDENCE_DAY);
        publicHolidaysList.add(LABOR_DAY);
        publicHolidaysList.add(VETERANS_DAY);
        publicHolidaysList.add(THANKSGIVING_DAY);
        publicHolidaysList.add(CHRISTMAS);
        publicHolidaysList.add(CHRISTMAS_DAY);

    }

    @Override
    public void setPriceHandler(PriceHandler priceHandler) {
        this.next = priceHandler;
    }

    @Override
    public int addDynamicPricing(int totalPrice) {
        return totalPrice + 50;

    }
}

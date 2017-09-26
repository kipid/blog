package kipid.hello;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.TimeZone;
import java.time.ZonedDateTime;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class CalendarTest {

  public static void main(String... args) {
    GregorianCalendar cal = new GregorianCalendar(2017, 0, 1);
    System.out.println(cal.getTimeZone());
    System.out.println(cal.toZonedDateTime());
    System.out.println(cal.getTimeInMillis());
    cal.add(Calendar.MONTH, 5);
    System.out.println(cal.toZonedDateTime().plusMonths(12L).toLocalDate());

    System.out.println();
    LocalDateTime local = LocalDateTime.of(2017, 1, 1, 0, 0);
    System.out.println(local);
    System.out.println(local.toEpochSecond(ZoneOffset.ofHours(9)));
    local = local.plusMonths(2L);
    System.out.println(local);

    // Locale[] locales = cal.getAvailableLocales();
    // for (Locale locale : locales) {
    //   System.out.println(locale);
    // }
  }
}

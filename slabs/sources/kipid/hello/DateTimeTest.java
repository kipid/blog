package kipid.hello;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTimeTest {

  private static final SimpleDateFormat DATE_FORMAT
      = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss z");

  private static long unixEpochInMillis(String timeStr) {
    try {
      return DATE_FORMAT.parse(timeStr).getTime();
    } catch (ParseException exception) {
      return -1L;
    }
  }

  public static void main(String... args) {
    System.out.println(DATE_FORMAT.toLocalizedPattern());
    System.out.println(DATE_FORMAT.toPattern());

    String timeStr;
    long time0, time1, time2;

    timeStr = "2017-10-01 00:00:00 KST";
    time0 = unixEpochInMillis(timeStr);
    System.out.println(timeStr + ": " + time0);

    timeStr = "2017-11-01 00:00:00 KST";
    time1 = unixEpochInMillis(timeStr);
    System.out.println(timeStr + ": " + time1);
    System.out.println("time diff in ms: " + (time1 - time0));
    System.out.println("time diff in day: " + ((time1 - time0) / 1000.0 / 60 / 60 / 24));

    timeStr = "2017-11-01 00:00:00 UTC";
    time2 = unixEpochInMillis(timeStr);
    System.out.println(timeStr + ": " + time2);
    System.out.println("time diff in ms: " + (time2 - time1));
    System.out.println("time diff in hour: " + ((time2 - time1) / 1000.0 / 60 / 60));

    Date date = new Date(time1);
    System.out.println(DATE_FORMAT.format(date));

    timeStr = "2017/11/01 00:00:00 UTC";  // Malformed date.
    time2 = unixEpochInMillis(timeStr);
    System.out.println(timeStr + ": " + time2);

    date = new Date();
    System.out.println("now: "+date);
    System.out.println("now: "+DATE_FORMAT.format(date));
  }
}

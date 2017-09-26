package kipid.hello.thread;

import java.text.ParseException;
import java.text.SimpleDateFormat;

class SimpleDateFormatTest {

  private static final SimpleDateFormat DATE_FORMAT
      = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss z");

  public static long unixEpochInMillis(String timeStr) {
    try {
      // To make it thread-safe.
      // synchronized (DATE_FORMAT) {
        return DATE_FORMAT.parse(timeStr).getTime();
      // }
    } catch (ParseException e) {
      return -1L;
    } catch (NumberFormatException e) {
      return -1L;
    } catch (ArrayIndexOutOfBoundsException e) {
      return -1L;
    }
  }

  public static void main(String... args) {
    for (int i = 0; i < 10; i++) {
      new Thread() {
        public void run() {
          int year = 2017;
          int month = 1;
          for (int day = 1; day <= 31; day++) {
            String dateTimeStr = String.format("%04d-%02d-%02d 12:34:56 KST", year, month, day);
            try {
              System.out.println(dateTimeStr + ": " + unixEpochInMillis(dateTimeStr));
            } catch (Exception e) {
              System.out.println(e);
              System.exit(1);
            }
          }
        }
      }.start();
    }
  }
}
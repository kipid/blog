package kipid.hello;

public class ToNumberTest {
  public static void main(String... args) {
    // System.out.println(Double.parseDouble(""));  // java.lang.NumberFormatException: empty String
    System.out.println(Double.parseDouble("1"));
    // System.out.println(Double.valueOf(""));  // java.lang.NumberFormatException: empty String
    System.out.println(Double.valueOf("1"));
  }
}

package kipid.hello;

public class ExceptionTest {

  public static void main(String... args) {
    try {
      throw new Exception("Details of the exception.");
    } catch (Exception e) {
      System.out.println(e.toString());
      System.out.println(e.getMessage());
    }
  }
}

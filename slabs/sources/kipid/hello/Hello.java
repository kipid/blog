package kipid.hello;

public class Hello {

  public static class SubHello {}

  public static void main(String... args) {
    System.out.println("Hello World! 한글!");
    for (String arg : args) {
      System.out.println("Hello "+arg);
    }
    System.out.println(System.getProperty("java.class.path"));
    System.out.println(System.getProperty("java.home"));
    System.out.println(System.getProperty("user.dir"));
    System.out.println(System.getProperty("user.name"));
    System.out.println(System.getProperty("user.home"));
    System.out.println(Math.abs(-1));
    String nullStr = null;
    System.out.println(nullStr + "abc");
    System.out.println(Hello.class.getName());
    System.out.println(Hello.class.getSimpleName());
    System.out.println(SubHello.class.getName());
    System.out.println(SubHello.class.getSimpleName());
  }
}

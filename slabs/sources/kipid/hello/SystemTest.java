package kipid.hello;

public class SystemTest {

  public static void main(String... args) {
    long start = System.nanoTime();
    System.out.println("Hello World! 한글!");
    // System.err.println("Hello Error!");
    for (String arg : args) {
      System.out.println("Hello "+arg);
    }
    System.out.println("java.class.path: " + System.getProperty("java.class.path"));
    for (String path : System.getProperty("java.class.path").split(":")) {
      System.out.println("    " + path);
    }
    // System.exit(0);
    System.out.println("java.home: " + System.getProperty("java.home"));
    System.out.println("user.dir: " + System.getProperty("user.dir"));
    System.out.println("user.name: " + System.getProperty("user.name"));
    System.out.println("user.home: " + System.getProperty("user.home"));
    System.out.println(System.currentTimeMillis());
    System.gc();
    System.out.println("elapsed time in ns: " + System.nanoTime() - start);
    System.out.println(System.console());  // null;
    System.out.println(System.lineSeparator());
  }
}

package kipid.hello.thread;

public class SynchronizedTest {

  public static void main(String... args) {
    synchronized (java.lang.Object.class) {
      System.out.println("===========디버깅 시작했다~================");
      System.out.println("time:"
          + new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date()));
      System.out.print(new Throwable().getStackTrace()[0].getClassName() + "."
          + new Throwable().getStackTrace()[0].getMethodName() + "()");
      System.out.println("  line: " + new Throwable().getStackTrace()[0].getLineNumber());
      System.out.println("something");
      System.out.println("===========디버깅 끝났다~================");
    }
  }
}

package kipid.hello.thread;

public class ThreadTest {

  private int a = 0;

  // "public synchronized" resolves the problem!
  public int increseAndGet() {
    return ++a;
  }

  public static void main(String... args) {
    final ThreadTest test = new ThreadTest();

    for (int i = 0; i < 1000; ++i) {
      new Thread(() -> {
          // "synchronized (test) {}" or "synchronized (java.lang.Object.class) {}"
          // synchronized (test) {
            for (int j = 0; j < 1000; ++j) {
              System.out.println(test.increseAndGet());
            }
          // }
      }).start();
    }
    // One of the result: 999990
    // Sync: 1000000
  }
}

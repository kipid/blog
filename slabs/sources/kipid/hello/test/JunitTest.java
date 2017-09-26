package kipid.hello.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertNull;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

public class JunitTest {

  @Test
  public void test() {
    System.out.println("test() is running.");
    assertEquals(1, 1);
  }

  public static void main(String... args) {
    try {
      throw new Exception("Details of the exception.");
    } catch (Exception e) {
      System.out.println(e.toString());
      System.out.println(e.getMessage());
    }
    JunitTest test = new JunitTest();
    test.test();
  }
}

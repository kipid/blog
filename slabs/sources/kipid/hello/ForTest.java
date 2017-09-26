package kipid.hello;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.HashSet;
import java.util.Iterator;

public class ForTest {
  private static void print(List<String> list) throws Exception {
    for (String str : list) {
      System.out  .println(str);
      if (str.equals("3")) {
        throw new Exception();
      }
    }
  }

  public static void main(String... args) {
    List<String> listStr = new ArrayList<>();
    // listStr = null;
    for (String str : listStr) {  // java.lang.NullPointerException when listStr is null.
      System.out.println(str);
    }

    int[] numbers = {1,2,3,4,5,6,7,8,9,10};
    for (int item : numbers) {
      System.out.println("Count is: " + item);
      if (item == 3) break;
    }
    for (int item : numbers) {
      System.out.println("Count is: " + item);
    }

    System.out  .println("\nList");
    List<String> list = Arrays.asList("1", "2", "3", "4", "5", "6", "7", "8", "9", "10");
    for (String str : list) {
      System.out  .println(str);
      if (str.equals("5")) {
        System.out.println("break");
        break;
      }
    }
    try {
      for (String str : list) {
        System.out  .println(str);
        if (str.equals("6")) {
          throw new Exception();
        }
      }
    } catch (Exception exception) {
      System.out.println("Exception");
    }
    try {
      print(list);
    } catch (Exception exception) {
      System.out.println("Exception");
    }
    for (String str : list) {
      System.out  .println(str);
    }

    System.out  .println("\nIterable");
    Iterable<String> iterable = list;
    for (String str : iterable) {
      System.out  .println(str);
    }

    System.out  .println("\nSet");
    Set<String> set = new HashSet<String>(list);
    for (String str : set) {
      System.out  .println(str);
      if (str.equals("2")) break;
    }
    for (String str : set) {
      System.out  .println(str);
    }
    try {
      for (String str : set) {
        System.out  .println(str);
        if (str.equals("6")) {
          throw new Exception();
        }
      }
    } catch (Exception exception) {
      System.out.println("Exception");
    }
    for (String str : set) {
      System.out  .println(str);
    }

    System.out.println("\nIterator");
    Iterator<String> iterator = set.iterator();
    // for (String str : iterator) { // error: for-each not applicable to expression type
    //   // required: array or java.lang.Iterable
    //   System.out  .println(str);
    // }
    while (iterator.hasNext()) {
      String str = iterator.next();
      System.out  .println(str);
      if (str.equals("5")) {
        break;
      }
    }
    iterator.forEachRemaining(
        (String str) -> {
          System.out  .println(str);
        }
    );
  }
}

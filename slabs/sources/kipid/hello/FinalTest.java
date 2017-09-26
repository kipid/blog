package kipid.hello;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;

public class FinalTest {
  public static void main(String... args) {
    final int i = 1;
    System.out.println(i);
    // i++;  // error: cannot assign a value to final variable i

    System.out.println();
    final List<String> list = new ArrayList<>();
    list.add("1");
    list.add("2");  // You can add!
    // You can invoke any method.
    for (String str : list) {
      System.out.println(str);
    }
    list.clear();
  }
}

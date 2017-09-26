package kipid.hello;

import java.util.Map;
import java.util.HashMap;

public class NullTest {
  public static void main(String... args) {
    // double nullDouble = null;  // error: incompatible types: <null> cannot be converted to double

    double undefinedDouble;
    // System.out.println(undefinedDouble);  // error: variable undefinedDouble might not have been initialized

    Map<String, Double> map;
    // System.out.println(map);  // error: variable map might not have been initialized

    Map<String, Double> nullMap = null;
    System.out.println(nullMap);  // null
    // System.out.println(nullMap.toString());  // java.lang.NullPointerException

    map = new HashMap<>();
    map.put(null, null);
    System.out.println(map);
    map.put(null, 1.2);
    System.out.println(map);
    map.put("", null);
    System.out.println(map);
    map.put("key", null);
    // map.put("key1", null);
    // map.put("key2", null);
    map.put("key3", null);
    // map.put("key4", null);
    // map.put("key5", null);
    System.out.println(map);
    map.put("null", null);
    System.out.println(map);
    map.put(null, null);
    System.out.println(map);
    System.out.println();
    for (String key : map.keySet()) {
      System.out.println(key + ": " + map.get(key));
    }
    System.out.println();
    for (Map.Entry entry : map.entrySet()) {
      System.out.println(entry.getKey() + ": " + entry.getValue() + " :: " + entry.hashCode()%16);
    }
    System.out.println();
    System.out.println(map.containsKey(null));  // return true even though the value is null.
    System.out.println(map.get(null));
    System.out.println(map.get(null) != null);  // false.
    System.out.println(map.containsKey("not-put"));  // false.
    System.out.println(map.get("not-put"));  // return null.
  }
}

package kipid.hello.thread;

import java.util.Set;
import java.util.Map;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

public class MapTest {

  public static void main(String... args) {
    Map<String, String> map = new ConcurrentHashMap<>();
    // map.put(null, null);  // Key or value of null is not allowed in ConcurrentHashMap.
    map.put("abc", "def");
    // map.put("bc", "ef");
    map.put("c", "f");
    map.put("a", "b");
    // map.put("d", "d");
    map.put("b", "b");
/* Put order is not reserved.
// 0: bc: ef :: 0(6)
1: a: b :: 3(6)
2: b: b :: 0(6)
3: abc: def :: 7(6)
4: c: f :: 5(6)
// 5: d: d :: 0(6)
*/

    int i = 0;
    for (Map.Entry mapEntry : map.entrySet()) {
      System.out.println(i + ": " + mapEntry.getKey() + ": " + mapEntry.getValue() + " :: " + mapEntry.hashCode()%16 + "(" + map.size() + ")");
      i++;
    }
    System.out.println();
    i = 0;
    for (String key : map.keySet()) {
      System.out.println(i + ": " + key + ": " + map.get(key) + " :: (" + map.size() + ")");
      i++;
    }

    System.out.println();
    i = 0;
    // for (Map.Entry mapEntry : map.entrySet()) {
    for (String key : map.keySet()) {
      if (i == 1) {  // java.util.ConcurrentModificationException with HashMap
        map.remove("abc");
        map.remove("c");
        map.remove("b");
        map.put("bc", "ef");
        // map.clear();
      }
      if (i == 2) {
        map.put("d", "d");
      }
      // System.out.println(i + ": " + mapEntry.getKey() + ": " + mapEntry.getValue() + " :: " + mapEntry.hashCode()%16 + "(" + map.size() + ")");
      System.out.println(i + ": " + key + ": " + map.get(key) + " :: (" + map.size() + ")");
      i++;
    }

    System.out.println();
    i = 0;
    for (Map.Entry mapEntry : map.entrySet()) {
      System.out.println(i + ": " + mapEntry.getKey() + ": " + mapEntry.getValue() + " :: " + mapEntry.hashCode()%16 + "(" + map.size() + ")");
      i++;
    }

    Set<String> set = ConcurrentHashMap.newKeySet();
    set.add("abc");
    // set.add("bc");
    set.add("c");
    set.add("a");
    // set.add("d");
    set.add("b");
/*
// 0: bc :: (6)
1: a :: (6)
2: b :: (6)
3: abc :: (6)
4: c :: (6)
// 5: d :: (6)
*/

    System.out.println();
    i = 0;
    for (String elem : set) {
      System.out.println(i + ": " + elem + " :: (" + set.size() + ")");
      i++;
    }

    System.out.println();
    i = 0;
    for (String elem : set) {
      if (i == 1) {
        set.remove("a");
      }
      if (i == 2) {
        set.add("d");
      }
      System.out.println(i + ": " + elem + " :: (" + set.size() + ")");
      i++;
    }

    System.out.println();
    i = 0;
    for (String elem : set) {
      System.out.println(i + ": " + elem + " :: (" + set.size() + ")");
      i++;
    }

    System.out.println();
    Set<Integer> setInt = ConcurrentHashMap.newKeySet();
    // ConcurrentHashMap.KeySetView<Integer, Boolean> setInt = ConcurrentHashMap.newKeySet();
    // System.out.println(setInt.getMappedValue());  // true
    for (int j = 0; j < 10; j++) {
      new Thread(() -> {
          for (int k = 0; k < 10; k++) {
            System.out.println(setInt.add(k) + " add " + k + ": " + setInt.size());
          }
      }).start();
      new Thread(() -> {
          for (int k = 0; k < 10; k++) {
            System.out.println(setInt.remove(k) + " remove " + k + ": " + setInt.size());
          }
      }).start();
    }

    // System.out.println();
    // Map<Integer, Integer> mapInt = new HashMap<>();
    // for (int j = 0; j < 10; j++) {
    //   new Thread(() -> {
    //       for (int k = 0; k < 10; k++) {
    //         System.out.println(mapInt.get(k) + " get " + k + ": " + mapInt.size());
    //       }
    //   }).start();
    //   new Thread(() -> {
    //       for (int k = 0; k < 10; k++) {
    //         System.out.println(mapInt.put(k, k) + " put " + k + ": " + mapInt.size());
    //       }
    //   }).start();
    //   new Thread(() -> {
    //       for (int k = 0; k < 10; k++) {
    //         System.out.println(mapInt.remove(k) + " remove " + k + ": " + mapInt.size());
    //       }
    //   }).start();
    // }
  }
}

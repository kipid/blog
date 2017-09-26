package kipid.hello;

import com.google.common.collect.ImmutableMap;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.ArrayList;
import java.util.List;

public class StreamTest {
  public static void main(String... args) {
    Stream.of("1984,2936,78472".split(","))
        .map(x -> Long.parseLong(x))
        .forEachOrdered(System.out::println);

    System.out.println("\n");
    List<Long> longList = Stream.of("30581,29395,30581,3,2,3,1,4839201".split(","))
        .map(x -> Long.parseLong(x))
        .sorted()
        .distinct()
        .collect(Collectors.toList());
    for (final long x : longList) {
      System.out.println(x);
    }

    System.out.println("\n");
    int i=0;
    // i++;  // error: local variables referenced from a lambda expression must be final or effectively final
    Stream.of(1034, 3921728, 21823, 33222)
        // error: local variables referenced from a lambda expression must be final or effectively final
        // error: cannot assign a value to final variable i
        .forEach(x -> System.out.println(i+": "+x));
    // i++;  // error: local variables referenced from a lambda expression must be final or effectively final

    System.out.println("\n");
    Stream.of("home", 0.983, "work", 0.758, "some", 1.382, 3L)
        .forEach((x) -> {
          System.out.println(x);
        });

    // 아래가 stream 핵심인듯?
    // 하나 이후에 다른 하나가 실행되는게 아니라... Stream 으로 계속해서 내보내는거구나.
    System.out.println("\n");
    Stream.of("a", "b", "c", "d", "e", "f")
        .filter(x -> {
          System.out.println("filter: " + x);
          return true;
        })
        .forEach(x -> System.out.println("forEach: " + x));

    System.out.println("\n");
    boolean anyMatch = Stream.of("a1", "a2", "b1", "b2", "a3", "c1")
        .map(s -> {
          System.out.println("map: " + s);
          return s.toUpperCase();
        })
        .filter(s -> {
          System.out.println("filter: " + s);
          return s.startsWith("A");
        })
        .anyMatch(s -> {
          System.out.println("anyMatch: " + s);
          return s.startsWith("B");
        });
    System.out.println("Result of anyMatch: " + anyMatch);

    // List<> list = new ArrayList<>();
  }
}

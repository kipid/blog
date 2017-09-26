package kipid.hello.data;

public class EnumTest {

  public enum EatType {
    CUISINE("cuisine"),
      CUISINE_1("c_1", CUISINE),
    FOOD("food"),
      FOOD_1("f_1", FOOD),
        FOOD_1_1("f_1_1", FOOD_1);

    private final String name;
    private final EatType parent;

    EatType(String name) {
      this(name, null);
    }

    EatType(String name, EatType parent) {
      this.name = name;
      this.parent = parent;
    }

    public boolean is(EatType type) {
      if (type == null) {
        return false;
      }
      EatType superType = this;
      while (superType != null) {
        if (superType == type) {
          return true;
        }
        superType = superType.parent;
      }
      return false;
    }
  }

  public static void main(String... args) {
    System.out.println(EatType.valueOf("FOOD") + " " + EatType.CUISINE);
    for (EatType eat : EatType.values()) {
      System.out.println(eat);
    }

    System.out.println(EatType.FOOD_1_1.is(EatType.FOOD));
    System.out.println(EatType.FOOD_1_1.is(null));
    System.out.println(EatType.FOOD_1_1.is(EatType.CUISINE));
  }
}

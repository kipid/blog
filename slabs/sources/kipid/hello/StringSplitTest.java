package kipid.hello;

public class StringSplitTest {
  public static void main(String... args) {
    String str = "";
    String[] strSplitted = str.split(",");
    // {""}
    for (String s : strSplitted) {
      System.out.println("s: "+s);
    }

    // str = null;
    // strSplitted = str.split(",");
    // java.lang.NullPointerException

    System.out.println();
    str = "a,b,c,d,e,f,g";
    strSplitted = str.split(",");
    // {"a", "b", "c", "d", "e", "f", "g"}
    for (String s : strSplitted) {
      System.out.println("s: "+s);
    }

    System.out.println("");
    str = "abcdefg";
    strSplitted = str.split(",");
    // {"abcdefg"}
    for (String s : strSplitted) {
      System.out.println("s: "+s);
    }

    System.out.println("");
    str = ",abc,,defg,";
    strSplitted = str.split(",");
    // {"", "abc", "", "defg"}
    for (String s : strSplitted) {
      System.out.println("s: "+s);
    }
  }
}

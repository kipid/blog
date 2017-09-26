package kipid.hello;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
// import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.List;

public class JsonTest {

  private static final Gson gson = new Gson();

  public static class TimeRange {
    private String fromTime;
    private String toTime;

    public TimeRange(String fromTime, String toTime) {
      this.fromTime = fromTime;
      this.toTime = toTime;
    }
  }

  public static class PrecisionAndRecall extends TimeRange {
    private double precision;
    private double recall;

    public PrecisionAndRecall(String fromTime, String toTime,
                              double precision, double recall) {
      super(fromTime, toTime);
      this.precision = precision;
      this.recall = recall;
    }
  }

  public static void main(String... args) {
    JsonObject jsonObject = new JsonObject();
    jsonObject.addProperty("a", 1.0);
    jsonObject.addProperty("b", 2);
    jsonObject.addProperty("c", 3L);
    jsonObject.addProperty("d", "d");
    jsonObject.addProperty("e", true);
    System.out.println(jsonObject.toString());

    JsonArray jsonArray = new JsonArray();
    jsonArray.add(false);
    jsonArray.add(1.0);
    jsonArray.add(2);
    jsonArray.add(3L);
    jsonArray.add("string");
    jsonArray.add("false");
    jsonArray.add(jsonObject);
    System.out.println(jsonArray);

    // jsonObject.add("array", jsonArray);  // Circular reference.
    System.out.println(jsonObject.toString());

    System.out.println(gson.toJson(jsonArray));
    System.out.println(gson.toJson(jsonObject));

    try {
      Thread.sleep(1000);
    } catch (Exception e) {
      // do nothing.
    }

    System.out.println(gson.toJson(new TimeRange("fromTime string", "toTime string")));
    System.out.println(gson.toJson(new PrecisionAndRecall(
        "fromTime string", "toTime string",
        0.874, 0.285
    )));
    System.out.println(gson.toJson(new ArrayList<String>(0)));
  }
}

package com.wisefour.iris.lemon.foursquare;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.fail;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import com.google.common.collect.ImmutableList;
import com.google.gson.Gson;
import com.wisefour.iris.lemon.foursquare.VenueCategoryMap.VenueCategory;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class VenueCategoryMapTest {

  private static final Gson GSON = new Gson();

  @Mock
  private FoursquareApi foursquareApiMock;

  @Before
  public void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  public void apiExceptionTest() throws FoursquareApi.ApiException {
    when(foursquareApiMock.getCategories(anyString())).thenThrow(
        new FoursquareApi.ApiException("API exception."));
    try {
      new VenueCategoryMap(foursquareApiMock);
      fail("RuntimeException is not thrown.");
    } catch (RuntimeException e) {
      assertEquals(e.getMessage(), "API exception.");
    }
  }

  @Test
  public void updateCategoriesTest() throws FoursquareApi.ApiException {
    Category category1 = new Category();
    category1.id = "category-1-id";
    category1.name = "category-1-name";
    category1.icon = new Category.Icon();
    category1.icon.prefix = "category-1-icon-prefix";
    category1.icon.suffix = "category-1-icon-suffix";
    category1.categories = ImmutableList.of();
    Category category2 = new Category();
    category2.id = "category-2-id";
    category2.name = "category-2-name";

    Category category3 = new Category();
    category3.id = "category-3-id";
    category3.name = "category-3-name";
    Category category4 = new Category();
    category4.id = "category-4-id";
    category4.name = "category-4-name";
    Category category5 = new Category();
    category5.id = "category-5-id";
    category5.name = "category-5-name";

    Category category6 = new Category();
    category6.id = "category-6-id";
    category6.name = "category-6-name";

    category5.categories = ImmutableList.of(category6);
    category2.categories = ImmutableList.of(category3, category4, category5);

    when(foursquareApiMock.getCategories(anyString())).thenReturn(ImmutableList.of(
        category1, category2));
    final VenueCategoryMap categoryMap = new VenueCategoryMap(foursquareApiMock);

    VenueCategory venueCategory1 = new VenueCategory(null, 0, category1, "ko");
    venueCategory1.addLocale(category1, "en");
    assertEquals(GSON.toJson(categoryMap.getVenueCategory("category-1-id")),
        GSON.toJson(venueCategory1));
    assertNotSame(categoryMap.getVenueCategory("category-1-id"), venueCategory1);
    assertEquals(categoryMap.getVenueCategory("category-1-id"), venueCategory1);

    VenueCategory venueCategory2 = new VenueCategory(null, 0, category2, "en");
    venueCategory2.addLocale(category2, "ko");
    assertEquals(categoryMap.getVenueCategory("category-2-id"), venueCategory2);

    VenueCategory venueCategory3 = new VenueCategory("category-2-id", 1, category3, "ko");
    venueCategory3.addLocale(category3, "en");
    assertEquals(categoryMap.getVenueCategory("category-3-id"), venueCategory3);

    VenueCategory venueCategory4 = new VenueCategory("category-2-id", 1, category4, "ko");
    venueCategory4.addLocale(category4, "en");
    assertEquals(categoryMap.getVenueCategory("category-4-id"), venueCategory4);

    VenueCategory venueCategory5 = new VenueCategory("category-2-id", 1, category5, "en");
    venueCategory5.addLocale(category5, "ko");
    assertEquals(categoryMap.getVenueCategory("category-5-id"), venueCategory5);

    VenueCategory venueCategory6 = new VenueCategory("category-5-id", 2, category6, "en");
    venueCategory6.addLocale(category6, "ko");
    assertEquals(categoryMap.getVenueCategory("category-6-id"), venueCategory6);

    assertNull(categoryMap.getVenueCategory("Non-existing id"));

    assertEquals(categoryMap.subCategoriesOf("category-1-id"), ImmutableList.of());
    assertEquals(categoryMap.subCategoriesOf("category-2-id"), ImmutableList.of(
        "category-3-id", "category-4-id", "category-5-id", "category-6-id"));
    assertEquals(categoryMap.subCategoriesOf("category-3-id"), ImmutableList.of());
    assertEquals(categoryMap.subCategoriesOf("category-4-id"), ImmutableList.of());
    assertEquals(categoryMap.subCategoriesOf("category-5-id"), ImmutableList.of("category-6-id"));
    assertEquals(categoryMap.subCategoriesOf("category-6-id"), ImmutableList.of());

    assertNull(categoryMap.subCategoriesOf("Non-existing id"));
  }
}

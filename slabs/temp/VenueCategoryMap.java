package com.wisefour.iris.lemon.foursquare;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Nonnull;

// error: VenueCategory.children
public class VenueCategoryMap {

  private final ImmutableMap<String, VenueCategory> venueCategories;

  /**
   * Using foursquareApi, initialize the venueCategories.
   */
  public VenueCategoryMap(@Nonnull FoursquareApi foursquareApi) {
    Map<String, VenueCategory> tempMap = new HashMap<>();
    try {
      for (String locale : new String[] {"ko", "en"}) {
        putCategories(tempMap, null, 0, foursquareApi.getCategories(locale), locale);
      }
    } catch (FoursquareApi.ApiException e) {
      throw new RuntimeException(e.getMessage());
    }
    tempMap.values().forEach(VenueCategory::fix);
    venueCategories = ImmutableMap.copyOf(tempMap);
  }

  /**
   * @param id Foursquare venue category id.
   * @return Ids of the whole direct and indirect sub-categories of the given id (excluding itself).
   */
  public List<String> subCategoriesOf(String id) {
    VenueCategory category = venueCategories.get(id);
    if (category == null) {
      return null;
    }
    List<String> subCategories = new ArrayList<>();
    addSubCategoriesTo(category, subCategories);
    return subCategories;
  }

  /**
   * @param id Foursquare venue category id.
   * @return Corresponding {@link VenueCategory} of the given id.
   */
  VenueCategory getVenueCategory(String id) {
    return venueCategories.get(id);
  }

  private void putCategories(Map<String, VenueCategory> map, VenueCategory parent, int depth,
                             List<Category> categories, String locale) {
    if (categories != null) {
      for (Category category : categories) {
        String id = category.id;
        VenueCategory venueCategory = map.get(id);
        if (venueCategory == null) {
          map.put(id, new VenueCategory(parent, depth, category, locale));
        } else {
          venueCategory.addLocale(category, locale);
        }
        putCategories(map, id, depth + 1, category.categories, locale);
      }
    }
  }

  private void addSubCategoriesTo(VenueCategory category, List<String> subCategories) {
    if (category == null || category.children == null) {
      return;
    }
    for (String id : category.children) {
      subCategories.add(id);
      addSubCategoriesTo(venueCategories.get(id), subCategories);
    }
  }

  static class VenueCategory {
    private String id;
    private Map<String, String> name;
    private Category.Icon icon;
    private VenueCategory parent;
    private int depth;
    private List<VenueCategory> children;

    VenueCategory(VenueCategory parent, int depth, Category category, String locale) {
      this.parent = parent;
      this.depth = depth;
      if (category != null) {
        id = category.id;
        name = new HashMap<>();
        name.put(locale, category.name);
        icon = category.icon;
        children = new ArrayList<>();
      }
    }

    void addLocale(Category category, String locale) {
      if (name == null) {
        name = new HashMap<>();
      }
      name.put(locale, category.name);
    }

    void fix() {
      if (name != null) {
        name = ImmutableMap.copyOf(name);
      }
      if (children != null) {
        children = ImmutableList.copyOf(children);
      }
    }

    @Override
    public boolean equals(Object obj) {
      if (obj == null) {
        return false;
      }
      if (getClass() != obj.getClass()) {
        return false;
      }
      if (this == obj) {
        return true;
      }

      VenueCategory that = (VenueCategory) obj;
      if (id == null) {
        if (that.id != null) {
          return false;
        }
      } else if (!id.equals(that.id)) {
        return false;
      }

      if (name == null) {
        if (that.name != null) {
          return false;
        }
      } else if (!name.equals(that.name)) {
        return false;
      }

      if (icon == null) {
        if (that.icon != null) {
          return false;
        }
      } else if (!icon.equals(that.icon)) {
        return false;
      }

      if (parent == null) {
        if (that.parent != null) {
          return false;
        }
      } else if (!parent.equals(that.parent)) {
        return false;
      }

      if (depth != that.depth) {
        return false;
      }

      if (children == null) {
        if (that.children != null) {
          return false;
        }
      } else if (!children.equals(that.children)) {
        return false;
      }

      return true;
    }
  }
}

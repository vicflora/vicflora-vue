export const FILTER_GROUPS = [
  {
    "name": "attributes",
    "label": "Attributes",
    "visibility": "public",
  },
  {
    "name": "threat_status",
    "label": "Threat status"
  },
  {
    "name": "classification",
    "label": "Classification",
    "visibility": "public",
  },
  {
    "name": "spatial",
    "label": "Geography",
    "visibility": "public",
  },
  {
    "name": "phenology",
    "label": "Phenology",
    "visibility": "public",
  },
  {
    "name": "history",
    "label": "Changes and additions",
    "visibility": "private",
  },
  {
    "name": "miscellaneous",
    "label": "Miscellaneous",
    "visibility": "private",
  },
]

export const FILTER_FIELDS = [
  {
    "name": "name_type",
    "label": "Name type",
    "group": "attributes"
  },
  {
    "name": "taxonomic_status",
    "label": "Taxonomic status",
    "group": "attributes"
  },
  {
    "name": "occurrence_status",
    "label": "Occurrence status",
    "group": "attributes"
  },
  {
    "name": "endemic",
    "label": "Endemic",
    "group": "attributes"
  },
  {
    "name": "establishment_means",
    "label": "Establishment means",
    "group": "attributes"
  },
  {
    "name": "has_introduced_occurrences",
    "label": "Has introduced occurrences",
    "group": "attributes"
  },
  {
    "name": "degree_of_establishment",
    "label": "Degree of establishment",
    "group": "attributes"
  },
  {
    "name": "ffg",
    "label": "FFG",
    "group": "threat_status"
  },
  {
    "name": "epbc",
    "label": "EPBC",
    "group": "threat_status"
  },
  {
    "name": "vic_advisory",
    "label": "Vic. Advisory",
    "group": "threat_status"
  },
  {
    "name": "taxon_rank",
    "label": "Taxon rank",
    "group": "classification"
  },
  {
    "name": "kingdom",
    "label": "Kingdom",
    "group": "classification"
  },
  {
    "name": "phylum",
    "label": "Phylum",
    "group": "classification"
  },
  {
    "name": "class",
    "label": "Class",
    "group": "classification"
  },
  {
    "name": "order",
    "label": "Order",
    "group": "classification"
  },
  {
    "name": "family",
    "label": "Family",
    "group": "classification"
  },
  {
    "name": "genus",
    "label": "Genus",
    "group": "classification"
  },
  {
    "name": "bioregion",
    "label": "Bioregion",
    "group": "spatial"
  },
  {
    "name": "local_government_area",
    "label": "Local Government Area",
    "group": "spatial"
  },
  {
    "name": "park_or_reserve",
    "label": "Park or reserve",
    "group": "spatial"
  },
  {
    "name": "registered_aboriginal_party",
    "label": "Registered Aboriginal Party",
    "group": "spatial"
  },
  {
    "name": "buds",
    "label": "Buds",
    "group": "phenology"
  },
  {
    "name": "flowers",
    "label": "Flowers",
    "group": "phenology"
  },
  {
    "name": "fruit",
    "label": "Fruit",
    "group": "phenology"
  },
  {
    "name": "created_year",
    "label": "Created year",
    "group": "history"
  },
  {
    "name": "created_year_month",
    "label": "Created year month",
    "group": "history"
  },
  {
    "name": "changed_year",
    "label": "Changed year",
    "group": "history"
  },
  {
    "name": "changed_year_month",
    "label": "Changed year month",
    "group": "history"
  },
  {
    "name": "profile_created_year",
    "label": "Profile created year",
    "group": "history"
  },
  {
    "name": "profile_created_year_month",
    "label": "Profile created year month",
    "group": "history"
  },
  {
    "name": "profile_updated_year",
    "label": "Profile updated year",
    "group": "history"
  },
  {
    "name": "profile_updated_year_month",
    "label": "Profile updated year month",
    "group": "history"
  },
  {
    "name": "media",
    "label": "Media",
    "group": "miscellaneous"
  },
  {
    "name": "publication_status",
    "label": "Publication status",
    "group": "miscellaneous"
  },
]

export const DEFAULT_FACET_FIELDS = [
  "taxonomic_status",
  "occurrence_status",
  "establishment_means",
  "degree_of_establishment",
  "taxon_rank",
  "family",
]
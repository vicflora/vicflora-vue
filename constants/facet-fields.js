export const FILTER_GROUPS = [
  {
    "name": "attributes",
    "label": "Attributes"
  },
  {
    "name": "threat_status",
    "label": "Threat status"
  },
  {
    "name": "classification",
    "label": "Classification"
  },
  {
    "name": "spatial",
    "label": "Geography"
  },
  {
    "name": "miscellaneous",
    "label": "Miscellaneous"
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
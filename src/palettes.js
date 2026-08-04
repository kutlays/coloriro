// Colours are listed dominant -> accent.
// `men` / `women` map an index in `colors` to a garment slot.

export const WEIGHTS = [40, 30, 18, 12];

export const SEASONS = [
  { id: "spring", label: "Spring", months: "Mar – May" },
  { id: "summer", label: "Summer", months: "Jun – Aug" },
  { id: "autumn", label: "Autumn", months: "Sep – Nov" },
  { id: "winter", label: "Winter", months: "Dec – Feb" },
];

export const MANNEQUIN = "#B6B1A6";
export const MANNEQUIN_DARK = "#A19C90";

export const PALETTES = [
  // ---------------- SPRING ----------------
  {
    n: 1, season: "spring", name: "Cream & Slate",
    colors: [
      { hex: "#4E6377", name: "Slate Blue" },
      { hex: "#EDE6D6", name: "Cream" },
      { hex: "#B08D5E", name: "Tan" },
      { hex: "#F7F4EE", name: "Soft White" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 3, bottom: 0, shoes: 2, detail: 1 },
    note: "The safest way into colour: one mid-tone, one cream, leather doing the work.",
  },
  {
    n: 2, season: "spring", name: "Sage Walk",
    colors: [
      { hex: "#9AA88B", name: "Sage" },
      { hex: "#E4DFCE", name: "Ecru" },
      { hex: "#4A5240", name: "Deep Olive" },
      { hex: "#A85B3C", name: "Rust" },
    ],
    men: { top: 0, bottom: 2, shoes: 3, detail: 1 },
    women: { top: 1, bottom: 0, shoes: 3, detail: 2 },
    note: "Analogous greens, warmed by a single rust accessory. Never split rust 50/50.",
  },
  {
    n: 3, season: "spring", name: "Powder & Navy",
    colors: [
      { hex: "#23374F", name: "Navy" },
      { hex: "#A9C3D6", name: "Powder Blue" },
      { hex: "#F2F0EA", name: "Off-White" },
      { hex: "#8B5A34", name: "Cognac" },
    ],
    men: { top: 1, bottom: 0, shoes: 3, detail: 2 },
    women: { top: 2, bottom: 1, shoes: 3, detail: 0 },
    note: "Same hue, two values. Cognac stops it reading as a uniform.",
  },
  {
    n: 4, season: "spring", name: "Butter & Denim",
    colors: [
      { hex: "#46658A", name: "Denim" },
      { hex: "#EFD9A0", name: "Butter" },
      { hex: "#F5F0E4", name: "Cream" },
      { hex: "#8E8880", name: "Warm Grey" },
    ],
    men: { top: 1, bottom: 0, shoes: 3, detail: 2 },
    women: { top: 1, bottom: 2, shoes: 3, detail: 0 },
    note: "Butter yellow needs a cool anchor or it goes custard. Denim is that anchor.",
  },
  {
    n: 5, season: "spring", name: "Pale Rose",
    colors: [
      { hex: "#3B3A38", name: "Charcoal" },
      { hex: "#DFC0B8", name: "Pale Rose" },
      { hex: "#F1EDE3", name: "Ivory" },
      { hex: "#A98842", name: "Brass" },
    ],
    men: { top: 1, bottom: 0, shoes: 0, detail: 2 },
    women: { top: 1, bottom: 2, shoes: 0, detail: 3 },
    note: "Rose reads sharp, not sweet, when the rest of the outfit is severe.",
  },
  {
    n: 6, season: "spring", name: "Mint & Stone",
    colors: [
      { hex: "#C2B49A", name: "Stone" },
      { hex: "#BFD3C1", name: "Mint" },
      { hex: "#2F5350", name: "Deep Teal" },
      { hex: "#F6F4EF", name: "White" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 3, bottom: 0, shoes: 2, detail: 1 },
    note: "Two pale tones only work if one is warm and one is cool. Here: stone, mint.",
  },

  // ---------------- SUMMER ----------------
  {
    n: 7, season: "summer", name: "White & Indigo",
    colors: [
      { hex: "#2C3E63", name: "Indigo" },
      { hex: "#F7F7F4", name: "Optic White" },
      { hex: "#8FB4CE", name: "Sky" },
      { hex: "#C09A6B", name: "Tan" },
    ],
    men: { top: 1, bottom: 0, shoes: 3, detail: 2 },
    women: { top: 2, bottom: 1, shoes: 3, detail: 0 },
    note: "Maximum contrast, zero risk. The reason it never dates.",
  },
  {
    n: 8, season: "summer", name: "Terracotta Coast",
    colors: [
      { hex: "#DCC9A6", name: "Sand" },
      { hex: "#C4674A", name: "Terracotta" },
      { hex: "#F4EFE4", name: "Off-White" },
      { hex: "#35322D", name: "Ink" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 2, bottom: 1, shoes: 3, detail: 0 },
    note: "Warm on warm. Keep the shoe pale — dark shoes drag this one into autumn.",
  },
  {
    n: 9, season: "summer", name: "Olive & Bone",
    colors: [
      { hex: "#6E7448", name: "Olive" },
      { hex: "#E8E1CE", name: "Bone" },
      { hex: "#9BB8C9", name: "Sky" },
      { hex: "#4A3628", name: "Chocolate" },
    ],
    men: { top: 1, bottom: 0, shoes: 3, detail: 2 },
    women: { top: 2, bottom: 1, shoes: 3, detail: 0 },
    note: "Olive is a neutral that thinks it's a colour. Treat it like navy.",
  },
  {
    n: 10, season: "summer", name: "Cherry & Cream",
    colors: [
      { hex: "#F0E9DA", name: "Cream" },
      { hex: "#B3322F", name: "Cherry Red" },
      { hex: "#26364B", name: "Navy" },
      { hex: "#B08D45", name: "Brass" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    note: "Red above the waist, never below. Above it's a signal; below it's a costume.",
  },
  {
    n: 11, season: "summer", name: "Sea Glass",
    colors: [
      { hex: "#F8F6F1", name: "White" },
      { hex: "#7FB2AC", name: "Sea Glass" },
      { hex: "#D9C8A9", name: "Sand" },
      { hex: "#3A3B3A", name: "Charcoal" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    note: "The lightest palette here. Needs one dark detail or it floats away.",
  },
  {
    n: 12, season: "summer", name: "Lilac & Grey",
    colors: [
      { hex: "#CFCCC5", name: "Light Grey" },
      { hex: "#B4A5C4", name: "Lilac" },
      { hex: "#4A3550", name: "Deep Plum" },
      { hex: "#F6F4EF", name: "White" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    note: "Grey is the only neutral that lets lilac stay adult.",
  },

  // ---------------- AUTUMN ----------------
  {
    n: 13, season: "autumn", name: "Camel & Navy",
    colors: [
      { hex: "#B58F5E", name: "Camel" },
      { hex: "#24344A", name: "Navy" },
      { hex: "#EDE5D4", name: "Cream" },
      { hex: "#6B2E30", name: "Oxblood" },
    ],
    men: { top: 0, bottom: 1, shoes: 3, detail: 2 },
    women: { top: 2, bottom: 1, shoes: 3, detail: 0 },
    note: "The most reliable autumn pairing in menswear. Camel goes on top.",
  },
  {
    n: 14, season: "autumn", name: "Moss & Rust",
    colors: [
      { hex: "#5C6244", name: "Moss" },
      { hex: "#DBCFB6", name: "Oatmeal" },
      { hex: "#A2542F", name: "Rust" },
      { hex: "#3B2E24", name: "Dark Brown" },
    ],
    men: { top: 1, bottom: 0, shoes: 3, detail: 2 },
    women: { top: 2, bottom: 1, shoes: 3, detail: 0 },
    note: "Earth tones need one lifted value or the whole thing turns to mud.",
  },
  {
    n: 15, season: "autumn", name: "Grey Flannel",
    colors: [
      { hex: "#45464A", name: "Charcoal" },
      { hex: "#A9AAA6", name: "Light Grey" },
      { hex: "#5E2B34", name: "Burgundy" },
      { hex: "#E8E2D4", name: "Cream" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 3, bottom: 0, shoes: 2, detail: 1 },
    note: "Two greys, one value apart. Burgundy is the only colour in the room.",
  },
  {
    n: 16, season: "autumn", name: "Tobacco",
    colors: [
      { hex: "#7A5233", name: "Tobacco" },
      { hex: "#DFD5BE", name: "Ecru" },
      { hex: "#354A3A", name: "Forest" },
      { hex: "#C08A3E", name: "Ochre" },
    ],
    men: { top: 2, bottom: 0, shoes: 0, detail: 1 },
    women: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    note: "Brown trousers are underused. Green above them is why.",
  },
  {
    n: 17, season: "autumn", name: "Plum & Stone",
    colors: [
      { hex: "#B7AC98", name: "Stone" },
      { hex: "#5A3846", name: "Plum" },
      { hex: "#2E2C2B", name: "Ink" },
      { hex: "#C29A93", name: "Dusty Pink" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 3, bottom: 1, shoes: 2, detail: 0 },
    note: "Plum and dusty pink are the same hue, forty years apart in mood.",
  },
  {
    n: 18, season: "autumn", name: "Mustard Field",
    colors: [
      { hex: "#2C4A4C", name: "Deep Teal" },
      { hex: "#C29338", name: "Mustard" },
      { hex: "#E0D6C0", name: "Oat" },
      { hex: "#4E3A2A", name: "Brown" },
    ],
    men: { top: 1, bottom: 0, shoes: 3, detail: 2 },
    women: { top: 1, bottom: 0, shoes: 3, detail: 2 },
    note: "Near-complementary, both muted. Mute one of a pair and the clash becomes tension.",
  },

  // ---------------- WINTER ----------------
  {
    n: 19, season: "winter", name: "Charcoal & Ice",
    colors: [
      { hex: "#35373B", name: "Charcoal" },
      { hex: "#C3D2DC", name: "Ice Blue" },
      { hex: "#1D1E20", name: "Black" },
      { hex: "#9A9CA0", name: "Silver Grey" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    note: "Cold light needs cold colour. Ice blue is the warmest thing here and still reads cool.",
  },
  {
    n: 20, season: "winter", name: "Camel & Black",
    colors: [
      { hex: "#A87F4F", name: "Camel" },
      { hex: "#1C1C1C", name: "Black" },
      { hex: "#EAE3D3", name: "Cream" },
      { hex: "#7C7A77", name: "Grey" },
    ],
    men: { top: 0, bottom: 1, shoes: 1, detail: 2 },
    women: { top: 2, bottom: 1, shoes: 1, detail: 0 },
    note: "A camel coat over head-to-toe black. Almost impossible to get wrong.",
  },
  {
    n: 21, season: "winter", name: "Forest Night",
    colors: [
      { hex: "#2F4438", name: "Forest" },
      { hex: "#E6E0D0", name: "Cream" },
      { hex: "#1B1C1A", name: "Black" },
      { hex: "#9C7C3E", name: "Brass" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    note: "Dark green is black with an opinion. Wear it where you'd wear black.",
  },
  {
    n: 22, season: "winter", name: "Burgundy & Grey",
    colors: [
      { hex: "#8D8C88", name: "Mid Grey" },
      { hex: "#5C2530", name: "Burgundy" },
      { hex: "#333438", name: "Charcoal" },
      { hex: "#DFDAD0", name: "Bone" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 1, bottom: 2, shoes: 2, detail: 3 },
    note: "Burgundy is a neutral in winter. Treat it as your base, not your accent.",
  },
  {
    n: 23, season: "winter", name: "Navy & Ivory",
    colors: [
      { hex: "#1F2C42", name: "Navy" },
      { hex: "#EFEADB", name: "Ivory" },
      { hex: "#8A8C90", name: "Grey" },
      { hex: "#7E4E2C", name: "Cognac" },
    ],
    men: { top: 1, bottom: 0, shoes: 3, detail: 2 },
    women: { top: 1, bottom: 0, shoes: 3, detail: 2 },
    note: "Ivory, not white. White against navy in winter looks like summer left over.",
  },
  {
    n: 24, season: "winter", name: "Slate & Blush",
    colors: [
      { hex: "#4C5560", name: "Slate" },
      { hex: "#D9C3BC", name: "Blush" },
      { hex: "#232426", name: "Off-Black" },
      { hex: "#EDE7DA", name: "Cream" },
    ],
    men: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    women: { top: 1, bottom: 0, shoes: 2, detail: 3 },
    note: "Blush survives winter only against a cool grey. Against camel it collapses.",
  },
];

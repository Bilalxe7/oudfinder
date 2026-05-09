// ─────────────────────────────────────────────────────────────────────────
//  Perfume database — curated from real fragrance data
//  60 real perfumes across designer & niche brands. Notes, parfumeurs,
//  release years and family classifications match Fragrantica/Parfumo data.
// ─────────────────────────────────────────────────────────────────────────

export type DuftNote = {
  name: string;
  kategorie: "kopf" | "herz" | "basis";
  farbe?: string;
};

export type Bewertung = {
  id: string;
  nutzername: string;
  avatar: string;
  sterne: number;
  kommentar: string;
  datum: string;
  haltbarkeit: number;
  sillage: number;
  helpful: number;
};

export type Parfum = {
  id: string;
  slug: string;
  name: string;
  marke: string;
  markeSlug: string;
  jahr: number;
  parfumeur: string;
  beschreibung: string;
  kurzBeschreibung: string;
  duftfamilie: string;
  duftfamilieEn: string;
  noten: DuftNote[];
  haltbarkeit: number;
  sillage: number;
  geschlecht: "damen" | "herren" | "unisex";
  jahreszeiten: ("fruehling" | "sommer" | "herbst" | "winter")[];
  anlaesse: ("alltag" | "abend" | "buero" | "date" | "sport" | "besonder")[];
  bewertungen: Bewertung[];
  gesamtBewertung: number;
  bewertungsAnzahl: number;
  preisRange: "budget" | "mittel" | "premium" | "luxus";
  preisVon: number;
  bildUrl: string;
  flakon: string;
  aehnliche: string[];
  dupes: string[];
  trending: boolean;
  editorChoice: boolean;
  kaufLinks: { shop: string; url: string; preis: number; affiliate: boolean }[];
  tags: string[];
};

// ─────────────────── Note color palette (used for chips) ───────────────────
const NC: Record<string, string> = {
  bergamotte: "#c8e878", zitrone: "#f5e642", grapefruit: "#f5a842", orange: "#f5a623",
  mandarine: "#f5b042", limette: "#a8e060", apfel: "#9adb5c", birne: "#d9e09a",
  ananas: "#f5d042", himbeere: "#c84a6a", erdbeere: "#e85a5a", kirsche: "#a02830",
  pfirsich: "#f5b88a", schwarze_johannisbeere: "#4a1a6a", feige: "#8a6a3a", pflaume: "#5a2a4a",
  pfeffer: "#c84820", kardamom: "#6b4226", safran: "#f0922a", ingwer: "#d4a060",
  zimt: "#9b4a1a", muskat: "#a06030", anis: "#cba868", lavendel: "#9b89b4",
  rose: "#e87878", jasmin: "#f5ecc8", iris: "#9b89b4", veilchen: "#7b5c9b",
  tuberose: "#f8e8f8", orangenblüte: "#f5e6c8", magnolie: "#f5e8d8", maiglöckchen: "#f0f5e0",
  geißblatt: "#f5e090", hyazinthe: "#c0b0d8", ylang_ylang: "#f5d060", neroli: "#f0e0a0",
  patchouli: "#1a2a1a", vetiver: "#4a5a2a", sandelholz: "#c4a882", zeder: "#8b6914",
  zypresse: "#5a6a4a", oud: "#2d1a0e", mahagoni: "#5a3018", rosenholz: "#8b4a3c",
  birke: "#a0c860", eichenmoos: "#4a7a4a", papyrus: "#d4c896", mate: "#7a8a5a",
  vanille: "#d4a574", tonkabohne: "#c4922a", kakao: "#3a1a08", kaffee: "#3a200a",
  honig: "#e0a030", karamell: "#c4823c", praliné: "#a06030", mandel: "#dec8a6",
  ambra: "#c4823c", ambroxan: "#d4b896", labdanum: "#8b6936", benzoe: "#a06030",
  myrrhe: "#7a4a30", weihrauch: "#a0a098", moschus: "#d4c0a8", weisser_moschus: "#f0f0e8",
  leder: "#4a2a14", wildleder: "#7a4a2a", tabak: "#5a3818", rum: "#7a3a1a",
  lakritz: "#1a1010", salz: "#e8eaea", meeresnoten: "#a0c0d8", ozonisch: "#bcd8e8",
  elemi: "#d4c896", minze: "#78c878", basilikum: "#7ac070", thymian: "#a0a868",
  lotus: "#e8c4d4", schwarze_truffel: "#2d1a0e", schokolade: "#2d1a08",
};
const c = (k: string) => NC[k.toLowerCase().replace(/\s+/g, "_")] ?? "#a89c88";
const n = (name: string, kat: "kopf" | "herz" | "basis"): DuftNote => ({
  name,
  kategorie: kat,
  farbe: c(name),
});

// Compact builder for keeping the dataset readable
type MkInput = {
  id: string;
  slug: string;
  name: string;
  marke: string;
  markeSlug: string;
  jahr: number;
  parfumeur: string;
  short: string;
  long?: string;
  family: string;
  familyEn: string;
  top: string[];
  heart: string[];
  base: string[];
  haltbarkeit: number;
  sillage: number;
  geschlecht: "damen" | "herren" | "unisex";
  seasons?: ("fruehling" | "sommer" | "herbst" | "winter")[];
  occasions?: ("alltag" | "abend" | "buero" | "date" | "sport" | "besonder")[];
  rating: number;
  reviews: number;
  preisRange: "budget" | "mittel" | "premium" | "luxus";
  preisVon: number;
  flakon?: string;
  similar?: string[];
  dupes?: string[];
  trending?: boolean;
  editorChoice?: boolean;
  tags?: string[];
};

function mk(p: MkInput): Parfum {
  const long =
    p.long ??
    `${p.name} von ${p.marke} ist ein ${p.family.toLowerCase()}er Duft, der ${p.top[0]} im Auftakt mit einem Herz aus ${p.heart.slice(0, 2).join(" und ")} verbindet. Die Basis aus ${p.base.slice(0, 2).join(" und ")} sorgt für eine ${p.haltbarkeit >= 8 ? "bemerkenswert lange" : "ausgeglichene"} Tragezeit.`;
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    marke: p.marke,
    markeSlug: p.markeSlug,
    jahr: p.jahr,
    parfumeur: p.parfumeur,
    beschreibung: long,
    kurzBeschreibung: p.short,
    duftfamilie: p.family,
    duftfamilieEn: p.familyEn,
    noten: [
      ...p.top.map((nn) => n(nn, "kopf")),
      ...p.heart.map((nn) => n(nn, "herz")),
      ...p.base.map((nn) => n(nn, "basis")),
    ],
    haltbarkeit: p.haltbarkeit,
    sillage: p.sillage,
    geschlecht: p.geschlecht,
    jahreszeiten: p.seasons ?? ["herbst", "winter"],
    anlaesse: p.occasions ?? ["abend", "date"],
    bewertungen: [],
    gesamtBewertung: p.rating,
    bewertungsAnzahl: p.reviews,
    preisRange: p.preisRange,
    preisVon: p.preisVon,
    bildUrl: "", // images are generated at render time via lib/perfume-image
    flakon: p.flakon ?? "Klassischer Premium-Flakon",
    aehnliche: p.similar ?? [],
    dupes: p.dupes ?? [],
    trending: !!p.trending,
    editorChoice: !!p.editorChoice,
    kaufLinks: [
      { shop: "Douglas", url: "#", preis: Math.round(p.preisVon * 1.10), affiliate: true },
      { shop: "Flaconi", url: "#", preis: Math.round(p.preisVon * 1.04), affiliate: true },
      { shop: "Notino", url: "#", preis: p.preisVon, affiliate: true },
    ],
    tags: p.tags ?? [],
  };
}

// A small set of realistic reviews to attach to a few flagship perfumes
const sampleReviews = (slug: string): Bewertung[] => {
  const map: Record<string, Bewertung[]> = {
    "baccarat-rouge-540": [
      { id: "r-br1", nutzername: "ParfumAficionado", avatar: "P", sterne: 5, kommentar: "BR540 ist aus gutem Grund das meistduplizierte Parfum der Welt. Der Ambroxan-Schmelz ist einzigartig.", datum: "2025-03-12", haltbarkeit: 10, sillage: 10, helpful: 89 },
      { id: "r-br2", nutzername: "DuftKenner_Berlin", avatar: "D", sterne: 5, kommentar: "Strahlt richtig auf der Haut. Perfekt für besondere Anlässe – aber auch alltagstauglich, wenn man dezent sprüht.", datum: "2025-02-04", haltbarkeit: 9, sillage: 9, helpful: 64 },
    ],
    "black-orchid": [
      { id: "r-bo1", nutzername: "LuxuryScents_DE", avatar: "L", sterne: 5, kommentar: "Absolut magisch. Wie das Anziehen eines eleganten schwarzen Kleides – sofort selbstbewusst.", datum: "2025-01-22", haltbarkeit: 10, sillage: 9, helpful: 47 },
    ],
    "santal-33": [
      { id: "r-s33", nutzername: "UrbanNomad_HH", avatar: "U", sterne: 5, kommentar: "Santal 33 ist ein Gesprächsstarter. Jeder fragt, was ich trage. Rauchig-holzig ohne zu übertreiben.", datum: "2025-01-30", haltbarkeit: 7, sillage: 7, helpful: 78 },
    ],
    "aventus": [
      { id: "r-av1", nutzername: "HerrDerDüfte", avatar: "H", sterne: 5, kommentar: "Aventus ist der Standard, an dem alle anderen Männerdüfte gemessen werden. Selbstvertrauen in einer Flasche.", datum: "2025-04-02", haltbarkeit: 9, sillage: 8, helpful: 103 },
    ],
    "sauvage": [
      { id: "r-sa1", nutzername: "ModernerMann", avatar: "M", sterne: 4, kommentar: "Frisch, langlebig, universell. Gibt einen Grund, warum Sauvage weltweit Bestseller ist.", datum: "2025-03-18", haltbarkeit: 8, sillage: 7, helpful: 52 },
    ],
    "libre": [
      { id: "r-li1", nutzername: "ModernePerfumistin", avatar: "M", sterne: 5, kommentar: "Mein Signature-Duft. Feminin ohne übertrieben zu sein, süß ohne klebrig zu wirken.", datum: "2025-02-14", haltbarkeit: 8, sillage: 7, helpful: 61 },
    ],
  };
  return map[slug] ?? [];
};

// ─────────────────────────────────────────────────────────────────────────
//  Catalog (60 perfumes)
// ─────────────────────────────────────────────────────────────────────────
const _list: Parfum[] = [
  // ─── Tom Ford ───
  mk({
    id: "1", slug: "black-orchid", name: "Black Orchid", marke: "Tom Ford", markeSlug: "tom-ford",
    jahr: 2006, parfumeur: "David Apel & Pierre Negrin",
    short: "Dunkel, opulent, unwiderstehlich verführerisch",
    long: "Tom Ford Black Orchid ist eine Ode an das Exotische und Sinnliche. Schwarze Trüffel, Ylang-Ylang und schwarze Orchidee verschmelzen mit einer dunklen Patchouli-Vanille-Basis zu einem zeitlos luxuriösen Statement.",
    family: "Blumig-Oriental", familyEn: "Floral Oriental",
    top: ["Schwarze Trüffel", "Ylang-Ylang", "Bergamotte"],
    heart: ["Schwarze Orchidee", "Lotus", "Frucht-Akkorde"],
    base: ["Patchouli", "Vanille", "Sandelholz", "Weihrauch"],
    haltbarkeit: 9, sillage: 8, geschlecht: "unisex",
    seasons: ["herbst", "winter"], occasions: ["abend", "date", "besonder"],
    rating: 4.6, reviews: 4218, preisRange: "luxus", preisVon: 165,
    flakon: "Schwarzes Glas, vergoldete Details",
    similar: ["2","7","8"], dupes: ["55"], trending: true, editorChoice: true,
    tags: ["dunkel","opulent","verführerisch","oriental","luxus","unisex"],
  }),
  mk({
    id: "2", slug: "tobacco-vanille", name: "Tobacco Vanille", marke: "Tom Ford", markeSlug: "tom-ford",
    jahr: 2007, parfumeur: "Olivier Gillotin",
    short: "Würziger Tabak und cremige Vanille — ein Gentleman-Klassiker",
    long: "Tobacco Vanille verbindet würzige Tabakblätter mit Tonkabohne, Vanille und Kakao. Ein warmes, fast kulinarisches Parfum, das wie ein vintage Herrenzimmer riecht.",
    family: "Oriental-Würzig", familyEn: "Oriental Spicy",
    top: ["Tabak", "Gewürze"],
    heart: ["Tonkabohne", "Vanille", "Kakao"],
    base: ["Tabakblatt", "Trockenobst", "Holz"],
    haltbarkeit: 9, sillage: 9, geschlecht: "unisex",
    seasons: ["herbst","winter"], occasions: ["abend","besonder","date"],
    rating: 4.7, reviews: 6512, preisRange: "luxus", preisVon: 280,
    flakon: "Schwarzes Quaderglas",
    similar: ["1","8","18"], trending: true, editorChoice: true,
    tags: ["tabak","vanille","gourmand","winter","luxus"],
  }),
  mk({
    id: "3", slug: "lost-cherry", name: "Lost Cherry", marke: "Tom Ford", markeSlug: "tom-ford",
    jahr: 2018, parfumeur: "Louise Turner",
    short: "Verführerische Kirsche, Mandel und Tonkabohne",
    family: "Fruchtig-Gourmand", familyEn: "Fruity Gourmand",
    top: ["Schwarzkirsche", "Bittermandel", "Pflaume"],
    heart: ["Türkische Rose", "Jasmin", "Pfirsich"],
    base: ["Tonkabohne", "Sandelholz", "Vetiver", "Cedernholz"],
    haltbarkeit: 8, sillage: 8, geschlecht: "unisex",
    seasons: ["herbst","winter","fruehling"], occasions: ["abend","date"],
    rating: 4.5, reviews: 3284, preisRange: "luxus", preisVon: 295,
    similar: ["1","11"], trending: true,
    tags: ["kirsche","gourmand","verführerisch","unisex"],
  }),
  mk({
    id: "4", slug: "oud-wood", name: "Oud Wood", marke: "Tom Ford", markeSlug: "tom-ford",
    jahr: 2007, parfumeur: "Richard Herpin",
    short: "Edles Oud, Sandelholz und Vanille — zeitlos luxuriös",
    family: "Oriental-Holzig", familyEn: "Oriental Woody",
    top: ["Rosenholz", "Kardamom", "Chinesisches Pfeffer"],
    heart: ["Oud", "Sandelholz", "Brasilianisches Rosenholz"],
    base: ["Vanille", "Ambra", "Tonkabohne"],
    haltbarkeit: 9, sillage: 7, geschlecht: "unisex",
    seasons: ["herbst","winter"], occasions: ["abend","besonder","buero"],
    rating: 4.7, reviews: 2914, preisRange: "luxus", preisVon: 290,
    similar: ["1","17"], editorChoice: true,
    tags: ["oud","holzig","luxus","oriental","unisex"],
  }),
  mk({
    id: "5", slug: "tuscan-leather", name: "Tuscan Leather", marke: "Tom Ford", markeSlug: "tom-ford",
    jahr: 2007, parfumeur: "Daphne Bugey",
    short: "Hochwertiges Leder, Himbeere und Saffran — kühn und maskulin",
    family: "Ledrig", familyEn: "Leather",
    top: ["Safran", "Thymian", "Himbeere"],
    heart: ["Leder", "Olivenbaum", "Jasmin"],
    base: ["Wildleder", "Amber", "Holz"],
    haltbarkeit: 9, sillage: 9, geschlecht: "unisex",
    seasons: ["herbst","winter"], occasions: ["abend","besonder"],
    rating: 4.6, reviews: 2014, preisRange: "luxus", preisVon: 295,
    tags: ["leder","kühn","maskulin","luxus"],
  }),
  mk({
    id: "6", slug: "ombre-leather", name: "Ombré Leather", marke: "Tom Ford", markeSlug: "tom-ford",
    jahr: 2018, parfumeur: "Sonia Constant",
    short: "Modernes Wüstenleder mit Salbei und Kardamom",
    family: "Ledrig-Würzig", familyEn: "Leather Spicy",
    top: ["Kardamom", "Salbei"],
    heart: ["Leder", "Jasmin", "Veilchen"],
    base: ["Patchouli", "Moschus", "Amber"],
    haltbarkeit: 8, sillage: 7, geschlecht: "unisex",
    seasons: ["herbst","winter","fruehling"], occasions: ["alltag","buero","date"],
    rating: 4.5, reviews: 4290, preisRange: "luxus", preisVon: 145,
    trending: true, tags: ["leder","modern","unisex","casual-luxus"],
  }),
  mk({
    id: "7", slug: "soleil-blanc", name: "Soleil Blanc", marke: "Tom Ford", markeSlug: "tom-ford",
    jahr: 2016, parfumeur: "Yann Vasnier",
    short: "Sonnencreme, Kokos und Tuberose — flüssiger Sommer",
    family: "Blumig-Amber", familyEn: "Floral Amber",
    top: ["Bergamotte", "Kardamom", "Pistazie"],
    heart: ["Tuberose", "Ylang-Ylang", "Jasmin"],
    base: ["Kokos", "Amber", "Benzoe"],
    haltbarkeit: 7, sillage: 7, geschlecht: "unisex",
    seasons: ["fruehling","sommer"], occasions: ["alltag","date","besonder"],
    rating: 4.4, reviews: 1820, preisRange: "luxus", preisVon: 290,
    tags: ["sommer","kokos","tuberose","luxus","unisex"],
  }),
  mk({
    id: "8", slug: "bitter-peach", name: "Bitter Peach", marke: "Tom Ford", markeSlug: "tom-ford",
    jahr: 2022, parfumeur: "Antoine Maisondieu",
    short: "Saftiger Pfirsich, Kardamom und Rum — modern, üppig",
    family: "Fruchtig-Gourmand", familyEn: "Fruity Gourmand",
    top: ["Pfirsich", "Kardamom", "Blutorange"],
    heart: ["Davana", "Jasmin", "Heliotrop"],
    base: ["Rum", "Patchouli", "Vanille", "Sandelholz"],
    haltbarkeit: 8, sillage: 8, geschlecht: "unisex",
    seasons: ["herbst","winter","fruehling"], occasions: ["abend","date","besonder"],
    rating: 4.5, reviews: 1640, preisRange: "luxus", preisVon: 295,
    trending: true, editorChoice: true,
    tags: ["pfirsich","gourmand","modern","unisex"],
  }),

  // ─── Maison Francis Kurkdjian ───
  mk({
    id: "9", slug: "baccarat-rouge-540", name: "Baccarat Rouge 540", marke: "Maison Francis Kurkdjian", markeSlug: "mfk",
    jahr: 2015, parfumeur: "Francis Kurkdjian",
    short: "Ikonisch, warm, strahlend — ein moderner Klassiker",
    long: "Geschaffen für die 250-Jahr-Feier des Kristallhauses Baccarat. Eine Symphonie aus Safran, Jasmin und Ambroxan, die florale Noten mit erdig-mineralischen Elementen zu einem unverwechselbaren olfaktorischen Signal verbindet.",
    family: "Blumig-Amber", familyEn: "Floral Amber",
    top: ["Safran", "Jasmin"],
    heart: ["Bittermandel", "Ambroxan"],
    base: ["Cedernholz", "Weisser Moschus"],
    haltbarkeit: 9, sillage: 9, geschlecht: "unisex",
    seasons: ["herbst","winter","fruehling"], occasions: ["abend","date","besonder","buero"],
    rating: 4.8, reviews: 12438, preisRange: "luxus", preisVon: 320,
    flakon: "Klares Kristallglas mit roten Akzenten",
    similar: ["1","11","12"], dupes: ["55"], trending: true, editorChoice: true,
    tags: ["ikonisch","warm","amber","unisex","luxus","statement"],
  }),
  mk({
    id: "10", slug: "oud-satin-mood", name: "Oud Satin Mood", marke: "Maison Francis Kurkdjian", markeSlug: "mfk",
    jahr: 2015, parfumeur: "Francis Kurkdjian",
    short: "Rose, Vanille und Oud — samtig sinnlich",
    family: "Oriental-Blumig", familyEn: "Oriental Floral",
    top: ["Veilchen"],
    heart: ["Türkische Rose", "Bulgarische Rose"],
    base: ["Oud", "Vanille", "Benzoe"],
    haltbarkeit: 9, sillage: 8, geschlecht: "unisex",
    seasons: ["herbst","winter"], occasions: ["abend","besonder","date"],
    rating: 4.6, reviews: 2105, preisRange: "luxus", preisVon: 310,
    similar: ["9","17"], editorChoice: true,
    tags: ["oud","rose","oriental","luxus"],
  }),
  mk({
    id: "11", slug: "grand-soir", name: "Grand Soir", marke: "Maison Francis Kurkdjian", markeSlug: "mfk",
    jahr: 2016, parfumeur: "Francis Kurkdjian",
    short: "Pariser Eleganz: Amber, Vanille und Benzoe",
    family: "Oriental-Amber", familyEn: "Amber",
    top: ["Lavendel"],
    heart: ["Tonkabohne", "Benzoe"],
    base: ["Amber", "Vanille"],
    haltbarkeit: 8, sillage: 7, geschlecht: "unisex",
    seasons: ["herbst","winter"], occasions: ["abend","date"],
    rating: 4.5, reviews: 1622, preisRange: "luxus", preisVon: 250,
    tags: ["amber","vanille","abend","luxus"],
  }),
  mk({
    id: "12", slug: "a-la-rose", name: "À la rose", marke: "Maison Francis Kurkdjian", markeSlug: "mfk",
    jahr: 2014, parfumeur: "Francis Kurkdjian",
    short: "Pure Rose — frisch, hell, zeitlos feminin",
    family: "Blumig", familyEn: "Floral",
    top: ["Bergamotte", "Mandarine"],
    heart: ["Damaszener Rose", "Centifolia Rose", "Magnolie"],
    base: ["Veilchenblatt", "Cedernholz", "Moschus"],
    haltbarkeit: 7, sillage: 6, geschlecht: "damen",
    seasons: ["fruehling","sommer"], occasions: ["alltag","buero","date"],
    rating: 4.4, reviews: 985, preisRange: "luxus", preisVon: 235,
    tags: ["rose","feminin","frühling","luxus"],
  }),

  // ─── Creed ───
  mk({
    id: "13", slug: "aventus", name: "Aventus", marke: "Creed", markeSlug: "creed",
    jahr: 2010, parfumeur: "Olivier Creed & Erwin Creed",
    short: "Kraftvoll, fruchtig-rauchig — ein Prestige-Statement",
    long: "Inspiriert von Napoleons Stärke, Romantik und Triumph. Ananas und Schwarze Johannisbeere treffen auf rauchige Birke und Moschus für ein kraftvolles, maskulines Statement.",
    family: "Fruchtig-Chypre", familyEn: "Fruity Chypre",
    top: ["Ananas", "Schwarze Johannisbeere", "Bergamotte", "Apfel"],
    heart: ["Birke", "Patchouli", "Marokkanischer Jasmin", "Rose"],
    base: ["Moschus", "Eichenmoos", "Ambra", "Vanille"],
    haltbarkeit: 8, sillage: 8, geschlecht: "herren",
    seasons: ["fruehling","sommer","herbst"], occasions: ["buero","besonder","date"],
    rating: 4.7, reviews: 22341, preisRange: "luxus", preisVon: 380,
    flakon: "Schwarz mit goldenem Logo",
    similar: ["14","27","32"], trending: true, editorChoice: true,
    tags: ["maskulin","luxus","fruchtig","statement","prestige","creed"],
  }),
  mk({
    id: "14", slug: "silver-mountain-water", name: "Silver Mountain Water", marke: "Creed", markeSlug: "creed",
    jahr: 1995, parfumeur: "Olivier Creed",
    short: "Frisch wie ein Bergbach — Bergamotte, Mandarine, Tee",
    family: "Frisch", familyEn: "Citrus Aromatic",
    top: ["Bergamotte", "Mandarine"],
    heart: ["Schwarzer Tee", "Galbanum"],
    base: ["Sandelholz", "Moschus"],
    haltbarkeit: 6, sillage: 6, geschlecht: "unisex",
    seasons: ["fruehling","sommer"], occasions: ["alltag","buero","sport"],
    rating: 4.4, reviews: 5320, preisRange: "luxus", preisVon: 290,
    tags: ["frisch","tee","sommer","unisex"],
  }),
  mk({
    id: "15", slug: "green-irish-tweed", name: "Green Irish Tweed", marke: "Creed", markeSlug: "creed",
    jahr: 1985, parfumeur: "Olivier Creed",
    short: "Maiglöckchen, Iris und Sandelholz — britische Eleganz",
    family: "Fougère", familyEn: "Aromatic Fougère",
    top: ["Zitrone", "Iris", "Verbene"],
    heart: ["Veilchen", "Maiglöckchen"],
    base: ["Sandelholz", "Ambra"],
    haltbarkeit: 7, sillage: 7, geschlecht: "herren",
    seasons: ["fruehling","herbst"], occasions: ["buero","alltag"],
    rating: 4.5, reviews: 3210, preisRange: "luxus", preisVon: 290,
    tags: ["fougère","klassisch","maskulin","luxus"],
  }),
  mk({
    id: "16", slug: "royal-oud", name: "Royal Oud", marke: "Creed", markeSlug: "creed",
    jahr: 2011, parfumeur: "Olivier Creed & Erwin Creed",
    short: "Galbanum, Pink Pfeffer und Oud — modern royal",
    family: "Holzig-Würzig", familyEn: "Woody Spicy",
    top: ["Zitrone", "Pink Pfeffer", "Bergamotte"],
    heart: ["Galbanum", "Iris", "Angelika"],
    base: ["Oud", "Sandelholz", "Cedernholz", "Moschus"],
    haltbarkeit: 8, sillage: 7, geschlecht: "unisex",
    seasons: ["herbst","winter"], occasions: ["abend","besonder","buero"],
    rating: 4.5, reviews: 1840, preisRange: "luxus", preisVon: 360,
    tags: ["oud","luxus","unisex","royal"],
  }),

  // ─── Le Labo ───
  mk({
    id: "17", slug: "santal-33", name: "Santal 33", marke: "Le Labo", markeSlug: "le-labo",
    jahr: 2011, parfumeur: "Frank Voelkl",
    short: "Holzig, rauchig, kultisch — das Parfum der Kreativen",
    long: "Das New Yorker Kultparfum schlechthin. Sandelholz, Iris, Leder und Papyrus — urban, holzig und hypnotisch zugleich.",
    family: "Holzig-Würzig", familyEn: "Woody Spicy",
    top: ["Kardamom", "Veilchen"],
    heart: ["Iris", "Ambroxan"],
    base: ["Sandelholz", "Cedernholz", "Leder", "Papyrus"],
    haltbarkeit: 7, sillage: 7, geschlecht: "unisex",
    seasons: ["herbst","winter","fruehling"], occasions: ["alltag","buero","date"],
    rating: 4.6, reviews: 6721, preisRange: "luxus", preisVon: 225,
    flakon: "Apothekerflasche, weisses Etikett",
    similar: ["18","19","48"], trending: true, editorChoice: true,
    tags: ["holzig","unisex","kult","sandelholz","rauchig","urban"],
  }),
  mk({
    id: "18", slug: "rose-31", name: "Rose 31", marke: "Le Labo", markeSlug: "le-labo",
    jahr: 2006, parfumeur: "Daphné Bugey",
    short: "Centifolia Rose mit holzig-würzigem Twist",
    family: "Holzig-Blumig", familyEn: "Woody Floral",
    top: ["Centifolia Rose", "Kreuzkümmel"],
    heart: ["Olibanum", "Guaiacholz"],
    base: ["Vetiver", "Cedernholz", "Amber", "Moschus"],
    haltbarkeit: 7, sillage: 7, geschlecht: "unisex",
    seasons: ["herbst","winter"], occasions: ["abend","date","buero"],
    rating: 4.4, reviews: 1480, preisRange: "luxus", preisVon: 225,
    tags: ["rose","holzig","unisex","kult"],
  }),
  mk({
    id: "19", slug: "another-13", name: "Another 13", marke: "Le Labo", markeSlug: "le-labo",
    jahr: 2010, parfumeur: "Nathalie Lorson",
    short: "Mineralisch-moschig — fast pharmazeutisch sauber",
    family: "Holzig-Aromatisch", familyEn: "Woody Aromatic",
    top: ["Birne", "Apfel"],
    heart: ["Ambrette", "Jasmin"],
    base: ["Ambroxan", "Iso-E-Super", "Moschus"],
    haltbarkeit: 7, sillage: 6, geschlecht: "unisex",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","buero"],
    rating: 4.3, reviews: 1180, preisRange: "luxus", preisVon: 225,
    tags: ["clean","modern","unisex","minimalist"],
  }),

  // ─── Diptyque ───
  mk({
    id: "20", slug: "philosykos", name: "Philosykos", marke: "Diptyque", markeSlug: "diptyque",
    jahr: 1996, parfumeur: "Olivia Giacobetti",
    short: "Feigenbaum — Blätter, Frucht, Holz",
    family: "Holzig-Frisch", familyEn: "Fresh Woody",
    top: ["Feigenblätter"],
    heart: ["Feige", "Kokosnuss"],
    base: ["Cedernholz", "Weisser Moschus"],
    haltbarkeit: 6, sillage: 6, geschlecht: "unisex",
    seasons: ["fruehling","sommer"], occasions: ["alltag","buero"],
    rating: 4.4, reviews: 2410, preisRange: "premium", preisVon: 145,
    tags: ["feige","frisch","sommer","unisex"],
  }),
  mk({
    id: "21", slug: "tam-dao", name: "Tam Dao", marke: "Diptyque", markeSlug: "diptyque",
    jahr: 2003, parfumeur: "Daniel Moliere",
    short: "Cremiges Sandelholz — meditativ, balsamisch",
    family: "Holzig", familyEn: "Woody",
    top: ["Italienische Zypresse", "Rosenholz"],
    heart: ["Sandelholz", "Cedernholz"],
    base: ["Amber", "Myrrhe"],
    haltbarkeit: 7, sillage: 6, geschlecht: "unisex",
    seasons: ["herbst","winter"], occasions: ["alltag","buero","abend"],
    rating: 4.5, reviews: 1690, preisRange: "premium", preisVon: 145,
    tags: ["sandelholz","meditativ","unisex","ruhig"],
  }),

  // ─── Byredo ───
  mk({
    id: "22", slug: "bal-d-afrique", name: "Bal d'Afrique", marke: "Byredo", markeSlug: "byredo",
    jahr: 2009, parfumeur: "Jérôme Epinette",
    short: "Pariser Jazz-Age trifft afrikanische Wärme",
    family: "Blumig-Holzig", familyEn: "Floral Woody",
    top: ["Bergamotte", "Zitrone", "Neroli", "Schwarze Johannisbeere"],
    heart: ["Veilchen", "Jasmin", "Cyclam"],
    base: ["Moschus", "Cedernholz", "Vetiver", "Amber"],
    haltbarkeit: 7, sillage: 7, geschlecht: "unisex",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","date","abend"],
    rating: 4.5, reviews: 2890, preisRange: "luxus", preisVon: 195,
    trending: true, tags: ["jazz","modern","unisex","frisch"],
  }),
  mk({
    id: "23", slug: "mojave-ghost", name: "Mojave Ghost", marke: "Byredo", markeSlug: "byredo",
    jahr: 2014, parfumeur: "Jérôme Epinette",
    short: "Wüstenblumen, Sandelholz — geisterhaft schön",
    family: "Blumig-Holzig", familyEn: "Floral Woody Musk",
    top: ["Ambrette", "Sandelholz"],
    heart: ["Magnolie", "Veilchen", "Jamaica"],
    base: ["Cedernholz", "Crisp Amber", "Chantilly Moschus"],
    haltbarkeit: 6, sillage: 5, geschlecht: "unisex",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","buero","date"],
    rating: 4.3, reviews: 1840, preisRange: "luxus", preisVon: 195,
    tags: ["clean","modern","unisex","feminin"],
  }),
  mk({
    id: "24", slug: "gypsy-water", name: "Gypsy Water", marke: "Byredo", markeSlug: "byredo",
    jahr: 2008, parfumeur: "Jérôme Epinette",
    short: "Lagerfeuer, Pinie, Vanille — bohemian wanderlust",
    family: "Holzig-Aromatisch", familyEn: "Woody Aromatic",
    top: ["Bergamotte", "Zitrone", "Pfeffer", "Wacholder"],
    heart: ["Weihrauch", "Pinie", "Orris"],
    base: ["Sandelholz", "Amber", "Vanille"],
    haltbarkeit: 6, sillage: 6, geschlecht: "unisex",
    seasons: ["herbst","winter","fruehling"], occasions: ["alltag","date"],
    rating: 4.5, reviews: 2370, preisRange: "luxus", preisVon: 195,
    editorChoice: true, tags: ["bohemian","holzig","unisex","kult"],
  }),

  // ─── Chanel ───
  mk({
    id: "25", slug: "coco-mademoiselle", name: "Coco Mademoiselle", marke: "Chanel", markeSlug: "chanel",
    jahr: 2001, parfumeur: "Jacques Polge",
    short: "Pariser Eleganz mit Patchouli-Twist",
    family: "Chypre-Blumig", familyEn: "Floral Chypre",
    top: ["Bergamotte", "Orange", "Mandarine"],
    heart: ["Türkische Rose", "Litchi", "Jasmin"],
    base: ["Patchouli", "Vetiver", "Weisser Moschus", "Tonkabohne"],
    haltbarkeit: 8, sillage: 7, geschlecht: "damen",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","buero","date","abend"],
    rating: 4.6, reviews: 28430, preisRange: "premium", preisVon: 132,
    flakon: "Klares Glas mit schwarzem Verschluss",
    similar: ["29","37","43"], trending: true, editorChoice: true,
    tags: ["feminin","klassisch","patchouli","chanel"],
  }),
  mk({
    id: "26", slug: "bleu-de-chanel", name: "Bleu de Chanel", marke: "Chanel", markeSlug: "chanel",
    jahr: 2010, parfumeur: "Jacques Polge",
    short: "Frisch, holzig, zeitlos maskulin",
    family: "Holzig-Aromatisch", familyEn: "Woody Aromatic",
    top: ["Zitrone", "Grapefruit", "Minze", "Pink Pfeffer"],
    heart: ["Ingwer", "Jasmin", "Iso-E-Super", "Muskat"],
    base: ["Sandelholz", "Patchouli", "Labdanum", "Cedernholz"],
    haltbarkeit: 8, sillage: 7, geschlecht: "herren",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","buero","sport","date"],
    rating: 4.7, reviews: 31842, preisRange: "premium", preisVon: 109,
    flakon: "Tiefblaues Glas",
    similar: ["32","36","42"], editorChoice: true, trending: true,
    tags: ["frisch","maskulin","klassisch","holzig","chanel"],
  }),
  mk({
    id: "27", slug: "no-5", name: "N°5", marke: "Chanel", markeSlug: "chanel",
    jahr: 1921, parfumeur: "Ernest Beaux",
    short: "Das ikonischste Parfum aller Zeiten",
    family: "Blumig-Aldehyd", familyEn: "Floral Aldehyde",
    top: ["Aldehyde", "Bergamotte", "Zitrone", "Neroli"],
    heart: ["Iris", "Jasmin", "Maiglöckchen", "Rose"],
    base: ["Sandelholz", "Vetiver", "Vanille", "Amber"],
    haltbarkeit: 8, sillage: 8, geschlecht: "damen",
    seasons: ["herbst","winter"], occasions: ["abend","besonder"],
    rating: 4.4, reviews: 12200, preisRange: "premium", preisVon: 135,
    editorChoice: true, tags: ["ikonisch","klassisch","feminin","aldehyd"],
  }),
  mk({
    id: "28", slug: "allure-homme-sport", name: "Allure Homme Sport", marke: "Chanel", markeSlug: "chanel",
    jahr: 2004, parfumeur: "Jacques Polge",
    short: "Sportlich-frisch — Mandarine, Zypresse, Tonka",
    family: "Holzig-Frisch", familyEn: "Woody Aromatic",
    top: ["Sizilianische Mandarine", "Aldehyde", "Meeresnoten"],
    heart: ["Pink Pfeffer", "Neroli", "Muskat"],
    base: ["Tonkabohne", "Cedernholz", "Weisser Moschus"],
    haltbarkeit: 7, sillage: 6, geschlecht: "herren",
    seasons: ["fruehling","sommer"], occasions: ["alltag","sport","buero"],
    rating: 4.5, reviews: 8920, preisRange: "premium", preisVon: 109,
    tags: ["sport","frisch","maskulin","sommer"],
  }),
  mk({
    id: "29", slug: "chance-eau-tendre", name: "Chance Eau Tendre", marke: "Chanel", markeSlug: "chanel",
    jahr: 2010, parfumeur: "Jacques Polge",
    short: "Zart, frisch, spielerisch und feminin",
    family: "Blumig-Frisch", familyEn: "Floral Fresh",
    top: ["Grapefruit", "Quitte"],
    heart: ["Jasmin", "Hyazinthe"],
    base: ["Weisser Moschus", "Iris", "Cedernholz"],
    haltbarkeit: 6, sillage: 5, geschlecht: "damen",
    seasons: ["fruehling","sommer"], occasions: ["alltag","buero","date"],
    rating: 4.4, reviews: 19874, preisRange: "premium", preisVon: 115,
    tags: ["zart","feminin","frisch","blumig","frühling"],
  }),

  // ─── Dior ───
  mk({
    id: "30", slug: "sauvage", name: "Sauvage", marke: "Dior", markeSlug: "dior",
    jahr: 2015, parfumeur: "François Demachy",
    short: "Frisch, würzig, maskulin — der meistverkaufte Herrenduft",
    long: "Eine Ode an die weiten Wüstenlandschaften — explosive Bergamotte, würziger Szechuan-Pfeffer und der mineralische Akkord von Ambroxan. Maskulinität in seiner reinsten Form.",
    family: "Frisch-Würzig", familyEn: "Aromatic Fougère",
    top: ["Calabrische Bergamotte", "Szechuan-Pfeffer"],
    heart: ["Lavendel", "Pink Pfeffer", "Vetiver", "Patchouli", "Geranium", "Elemi"],
    base: ["Ambroxan", "Cedernholz", "Labdanum"],
    haltbarkeit: 8, sillage: 8, geschlecht: "herren",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","sport","buero","date"],
    rating: 4.5, reviews: 45231, preisRange: "premium", preisVon: 99,
    flakon: "Tiefblaues Glas, schlicht",
    similar: ["26","32","42"], trending: true,
    tags: ["frisch","maskulin","bestseller","alltag","bergamotte"],
  }),
  mk({
    id: "31", slug: "sauvage-edp", name: "Sauvage Eau de Parfum", marke: "Dior", markeSlug: "dior",
    jahr: 2018, parfumeur: "François Demachy",
    short: "Tiefere, wärmere Variante des Sauvage",
    family: "Holzig-Würzig", familyEn: "Woody Aromatic",
    top: ["Bergamotte", "Sichuan-Pfeffer"],
    heart: ["Lavendel", "Sternanis", "Muskatnuss"],
    base: ["Ambroxan", "Vanille", "Tonkabohne"],
    haltbarkeit: 8, sillage: 8, geschlecht: "herren",
    seasons: ["herbst","winter","fruehling"], occasions: ["abend","date","buero"],
    rating: 4.6, reviews: 18420, preisRange: "premium", preisVon: 115,
    tags: ["maskulin","warm","intensiv","alltag"],
  }),
  mk({
    id: "32", slug: "homme-intense", name: "Dior Homme Intense", marke: "Dior", markeSlug: "dior",
    jahr: 2011, parfumeur: "François Demachy",
    short: "Iris, Lavendel, Vanille — eleganter Gentleman",
    family: "Holzig-Blumig", familyEn: "Woody Floral",
    top: ["Lavendel"],
    heart: ["Iris", "Ambrette"],
    base: ["Vetiver", "Cedernholz", "Vanille"],
    haltbarkeit: 8, sillage: 7, geschlecht: "herren",
    seasons: ["herbst","winter"], occasions: ["abend","date","besonder"],
    rating: 4.6, reviews: 9420, preisRange: "premium", preisVon: 115,
    editorChoice: true, tags: ["iris","elegant","maskulin","klassisch"],
  }),
  mk({
    id: "33", slug: "jadore", name: "J'adore", marke: "Dior", markeSlug: "dior",
    jahr: 1999, parfumeur: "Calice Becker",
    short: "Goldener Bouquet — Ylang, Rose, Jasmin",
    family: "Blumig", familyEn: "Floral",
    top: ["Birne", "Melone", "Magnolie", "Pfirsich", "Mandarine"],
    heart: ["Jasmin", "Maiglöckchen", "Tuberose", "Türkische Rose"],
    base: ["Moschus", "Vanille", "Cedernholz"],
    haltbarkeit: 7, sillage: 7, geschlecht: "damen",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","abend","date"],
    rating: 4.4, reviews: 16520, preisRange: "premium", preisVon: 119,
    tags: ["blumig","klassisch","feminin","gold"],
  }),
  mk({
    id: "34", slug: "miss-dior", name: "Miss Dior", marke: "Dior", markeSlug: "dior",
    jahr: 2017, parfumeur: "François Demachy",
    short: "Roman einer Liebesgeschichte — frisch-blumig, modern",
    family: "Chypre-Blumig", familyEn: "Floral Chypre",
    top: ["Blutorange", "Mandarine"],
    heart: ["Grasse Rose", "Pfingstrose", "Iris"],
    base: ["Patchouli", "Wildleder", "Moschus"],
    haltbarkeit: 7, sillage: 6, geschlecht: "damen",
    seasons: ["fruehling","sommer"], occasions: ["alltag","buero","date"],
    rating: 4.4, reviews: 7820, preisRange: "premium", preisVon: 110,
    tags: ["feminin","modern","blumig","klassisch"],
  }),

  // ─── YSL ───
  mk({
    id: "35", slug: "libre", name: "Libre", marke: "Yves Saint Laurent", markeSlug: "ysl",
    jahr: 2019, parfumeur: "Anne Flipo & Carlos Benaïm",
    short: "Frei, mutig, modern-feminin",
    long: "Libre verbindet mediterrane Lavendelfelder mit der Wärme von Madagaskar-Vanille — ein Kontrast zwischen Maskulinität und Femininität, zwischen Freiheit und Verführung.",
    family: "Floral-Fougère", familyEn: "Floral Fougère",
    top: ["Mandarine", "Schwarze Johannisbeere", "Lavendel", "Petitgrain"],
    heart: ["Französischer Lavendel", "Orangenblüte", "Jasmin"],
    base: ["Madagaskar-Vanille", "Ambergris", "Cedernholz", "Moschus"],
    haltbarkeit: 8, sillage: 7, geschlecht: "damen",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","buero","date","abend"],
    rating: 4.5, reviews: 8932, preisRange: "premium", preisVon: 115,
    flakon: "Schwarz mit goldenem Metallbügel",
    similar: ["25","36","37"], trending: true, editorChoice: true,
    tags: ["feminin","modern","lavendel","vanille","alltag"],
  }),
  mk({
    id: "36", slug: "black-opium", name: "Black Opium", marke: "Yves Saint Laurent", markeSlug: "ysl",
    jahr: 2014, parfumeur: "Nathalie Lorson, Marie Salamagne, Olivier Cresp",
    short: "Kaffee, Vanille und Orangenblüte — verführerisch und süchtig",
    family: "Oriental-Vanille", familyEn: "Oriental Vanilla",
    top: ["Pink Pfeffer", "Orangenblüte", "Birne"],
    heart: ["Kaffee", "Jasmin", "Bittermandel", "Lakritz"],
    base: ["Vanille", "Patchouli", "Cedernholz", "Kaschmir"],
    haltbarkeit: 8, sillage: 8, geschlecht: "damen",
    seasons: ["herbst","winter"], occasions: ["abend","date","besonder"],
    rating: 4.5, reviews: 22910, preisRange: "premium", preisVon: 109,
    trending: true, tags: ["kaffee","vanille","feminin","süß"],
  }),
  mk({
    id: "37", slug: "la-nuit-de-l-homme", name: "La Nuit de L'Homme", marke: "Yves Saint Laurent", markeSlug: "ysl",
    jahr: 2009, parfumeur: "Pierre Wargnye, Dominique Ropion",
    short: "Kardamom, Lavendel, Vetiver — der Gentleman bei Nacht",
    family: "Holzig-Würzig", familyEn: "Woody Spicy",
    top: ["Kardamom"],
    heart: ["Lavendel", "Bergamotte", "Cumin"],
    base: ["Cedernholz", "Vetiver", "Tonkabohne"],
    haltbarkeit: 7, sillage: 6, geschlecht: "herren",
    seasons: ["herbst","winter","fruehling"], occasions: ["abend","date"],
    rating: 4.6, reviews: 13420, preisRange: "premium", preisVon: 99,
    editorChoice: true, tags: ["nacht","maskulin","kardamom","sexy"],
  }),
  mk({
    id: "38", slug: "y-edp", name: "Y Eau de Parfum", marke: "Yves Saint Laurent", markeSlug: "ysl",
    jahr: 2018, parfumeur: "Dominique Ropion",
    short: "Apfel, Salbei, Geranium — moderner Gentleman",
    family: "Aromatisch-Frisch", familyEn: "Aromatic Fougère",
    top: ["Apfel", "Ingwer", "Bergamotte"],
    heart: ["Salbei", "Geranium", "Lavendel"],
    base: ["Tonkabohne", "Vetiver", "Cedernholz", "Amber"],
    haltbarkeit: 8, sillage: 7, geschlecht: "herren",
    seasons: ["fruehling","sommer","herbst"], occasions: ["buero","date","alltag"],
    rating: 4.5, reviews: 6210, preisRange: "premium", preisVon: 105,
    tags: ["modern","maskulin","frisch"],
  }),

  // ─── Versace ───
  mk({
    id: "39", slug: "eros", name: "Eros", marke: "Versace", markeSlug: "versace",
    jahr: 2012, parfumeur: "Aurélien Guichard",
    short: "Apfel, Tonka, Vanille — Götterduft mit Sweet-Touch",
    family: "Aromatisch-Fougère", familyEn: "Aromatic Fougère",
    top: ["Minze", "Grüner Apfel", "Zitronenschale"],
    heart: ["Tonkabohne", "Ambroxan", "Geranium"],
    base: ["Madagaskar Vanille", "Vetiver", "Eichenmoos", "Cedernholz"],
    haltbarkeit: 8, sillage: 8, geschlecht: "herren",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","date","buero"],
    rating: 4.5, reviews: 18920, preisRange: "premium", preisVon: 79,
    trending: true, tags: ["maskulin","süß","frisch","date"],
  }),
  mk({
    id: "40", slug: "bright-crystal", name: "Bright Crystal", marke: "Versace", markeSlug: "versace",
    jahr: 2006, parfumeur: "Alberto Morillas",
    short: "Granatapfel, Pfingstrose, Magnolie — strahlend feminin",
    family: "Blumig-Frisch", familyEn: "Floral Fresh",
    top: ["Yuzu", "Granatapfel"],
    heart: ["Magnolie", "Pfingstrose", "Lotus"],
    base: ["Mahagoni", "Moschus", "Amber"],
    haltbarkeit: 6, sillage: 6, geschlecht: "damen",
    seasons: ["fruehling","sommer"], occasions: ["alltag","buero","date"],
    rating: 4.3, reviews: 11300, preisRange: "mittel", preisVon: 65,
    tags: ["frisch","feminin","sommer"],
  }),

  // ─── Armani ───
  mk({
    id: "41", slug: "acqua-di-gio-profondo", name: "Acqua di Giò Profondo", marke: "Giorgio Armani", markeSlug: "armani",
    jahr: 2020, parfumeur: "Alberto Morillas",
    short: "Marin, mineralisch — der ozeanische Klassiker, neu interpretiert",
    family: "Aquatisch-Aromatisch", familyEn: "Aromatic Aquatic",
    top: ["Marine Akkorde", "Bergamotte", "Aquozone"],
    heart: ["Rosmarin", "Salbei", "Lavendel", "Zypresse"],
    base: ["Patchouli", "Mineralischer Moschus", "Amber"],
    haltbarkeit: 8, sillage: 7, geschlecht: "herren",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","buero","sport","date"],
    rating: 4.6, reviews: 12410, preisRange: "premium", preisVon: 99,
    trending: true, editorChoice: true,
    tags: ["aquatisch","frisch","maskulin","sommer"],
  }),
  mk({
    id: "42", slug: "armani-code", name: "Armani Code", marke: "Giorgio Armani", markeSlug: "armani",
    jahr: 2004, parfumeur: "Antoine Maisondieu, Clément Gavarry",
    short: "Tabak, Tonka — der entkleidete Gentleman",
    family: "Oriental-Holzig", familyEn: "Oriental Woody",
    top: ["Bergamotte", "Zitrone"],
    heart: ["Stern-Anis", "Olivenblüte"],
    base: ["Tabak", "Tonkabohne", "Leder"],
    haltbarkeit: 7, sillage: 6, geschlecht: "herren",
    seasons: ["herbst","winter"], occasions: ["abend","date"],
    rating: 4.4, reviews: 9210, preisRange: "premium", preisVon: 89,
    tags: ["tabak","maskulin","abend","klassisch"],
  }),
  mk({
    id: "43", slug: "si-edp", name: "Sì", marke: "Giorgio Armani", markeSlug: "armani",
    jahr: 2013, parfumeur: "Christine Nagel",
    short: "Schwarze Johannisbeere und Vanille — chic und feminin",
    family: "Chypre-Fruchtig", familyEn: "Chypre Fruity",
    top: ["Schwarze Johannisbeere", "Mandarine"],
    heart: ["Rose", "Freesie", "Jasmin"],
    base: ["Patchouli", "Vanille", "Ambroxan", "Cashmeran"],
    haltbarkeit: 8, sillage: 7, geschlecht: "damen",
    seasons: ["herbst","winter","fruehling"], occasions: ["alltag","buero","date"],
    rating: 4.5, reviews: 10720, preisRange: "premium", preisVon: 99,
    tags: ["feminin","fruchtig","modern","chic"],
  }),

  // ─── Carolina Herrera ───
  mk({
    id: "44", slug: "good-girl", name: "Good Girl", marke: "Carolina Herrera", markeSlug: "carolina-herrera",
    jahr: 2016, parfumeur: "Louise Turner & Quentin Bisch",
    short: "Verführerisch süß, intensiv — ikonischer Stiletto-Flakon",
    family: "Blumig-Oriental", familyEn: "Floral Oriental",
    top: ["Bergamotte", "Mandel"],
    heart: ["Jasmin Sambac", "Tuberose"],
    base: ["Kakao", "Tonkabohne", "Vetiver"],
    haltbarkeit: 8, sillage: 8, geschlecht: "damen",
    seasons: ["herbst","winter"], occasions: ["abend","date","besonder"],
    rating: 4.5, reviews: 14298, preisRange: "premium", preisVon: 99,
    flakon: "Ikonischer blauer High-Heel",
    trending: true, tags: ["süß","feminin","verführerisch","jasmin","kakao"],
  }),
  mk({
    id: "45", slug: "bad-boy", name: "Bad Boy", marke: "Carolina Herrera", markeSlug: "carolina-herrera",
    jahr: 2019, parfumeur: "Quentin Bisch & Louise Turner",
    short: "Bergamotte, Salbei, Kakao — Bad-Boy-Charme",
    family: "Holzig-Würzig", familyEn: "Woody Spicy",
    top: ["Bergamotte", "Pfeffer"],
    heart: ["Weisser Salbei", "Cedernholz"],
    base: ["Tonkabohne", "Kakao", "Amberwood"],
    haltbarkeit: 7, sillage: 7, geschlecht: "herren",
    seasons: ["herbst","winter","fruehling"], occasions: ["abend","date","alltag"],
    rating: 4.4, reviews: 4820, preisRange: "premium", preisVon: 89,
    tags: ["maskulin","kakao","modern","date"],
  }),
  mk({
    id: "46", slug: "212-sexy", name: "212 Sexy", marke: "Carolina Herrera", markeSlug: "carolina-herrera",
    jahr: 2004, parfumeur: "Carlos Benaïm",
    short: "Verspielter Großstadt-Glamour",
    family: "Blumig-Oriental", familyEn: "Floral Oriental",
    top: ["Bergamotte", "Mandarine", "Pink Pfeffer"],
    heart: ["Gardenia", "Iris", "Pfingstrose"],
    base: ["Vanille", "Sandelholz", "Moschus"],
    haltbarkeit: 6, sillage: 5, geschlecht: "damen",
    seasons: ["fruehling","sommer"], occasions: ["alltag","date"],
    rating: 4.3, reviews: 3420, preisRange: "mittel", preisVon: 65,
    tags: ["sexy","feminin","modern","vanille"],
  }),

  // ─── Paco Rabanne ───
  mk({
    id: "47", slug: "1-million", name: "1 Million", marke: "Paco Rabanne", markeSlug: "paco-rabanne",
    jahr: 2008, parfumeur: "Christophe Raynaud, Olivier Pescheux, Michel Girard",
    short: "Goldbarren-Flakon — Zimt, Leder, Amber",
    family: "Würzig-Ledrig", familyEn: "Woody Spicy Leather",
    top: ["Grapefruit", "Mandarine", "Pfefferminze"],
    heart: ["Zimt", "Rose", "Pink Pfeffer"],
    base: ["Leder", "Amber", "Indisches Patchouli"],
    haltbarkeit: 7, sillage: 7, geschlecht: "herren",
    seasons: ["herbst","winter"], occasions: ["abend","date","besonder"],
    rating: 4.3, reviews: 16320, preisRange: "premium", preisVon: 79,
    tags: ["maskulin","gold","abend"],
  }),
  mk({
    id: "48", slug: "invictus", name: "Invictus", marke: "Paco Rabanne", markeSlug: "paco-rabanne",
    jahr: 2013, parfumeur: "Anne Flipo, Olivier Polge, Dominique Ropion, Véronique Nyberg",
    short: "Marin, frisch — Triumph in Trophäen-Flakon",
    family: "Holzig-Aquatisch", familyEn: "Woody Aquatic",
    top: ["Meeresbrise", "Grapefruit", "Mandarine"],
    heart: ["Lorbeer", "Jasmin"],
    base: ["Ambergris", "Eichenmoos", "Patchouli", "Guaiacholz"],
    haltbarkeit: 7, sillage: 7, geschlecht: "herren",
    seasons: ["fruehling","sommer"], occasions: ["alltag","sport","buero"],
    rating: 4.3, reviews: 9120, preisRange: "premium", preisVon: 79,
    tags: ["sport","frisch","aquatisch","sommer"],
  }),
  mk({
    id: "49", slug: "phantom", name: "Phantom", marke: "Paco Rabanne", markeSlug: "paco-rabanne",
    jahr: 2021, parfumeur: "Juliette Karagueuzoglou, Loc Dong, Anne Flipo, Dominique Ropion",
    short: "Lavendel, Apfel, Vanille — Roboter-Flakon",
    family: "Aromatisch-Frisch", familyEn: "Aromatic Fougère",
    top: ["Lavendel", "Limette", "Salz"],
    heart: ["Apfel"],
    base: ["Vanille", "Patchouli"],
    haltbarkeit: 7, sillage: 6, geschlecht: "herren",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","sport","buero"],
    rating: 4.2, reviews: 4210, preisRange: "premium", preisVon: 79,
    trending: true, tags: ["modern","frisch","alltag"],
  }),

  // ─── Jean Paul Gaultier ───
  mk({
    id: "50", slug: "le-male", name: "Le Male", marke: "Jean Paul Gaultier", markeSlug: "jpg",
    jahr: 1995, parfumeur: "Francis Kurkdjian",
    short: "Lavendel, Vanille, Tonka — der ikonische Matrosen-Flakon",
    family: "Aromatisch-Fougère", familyEn: "Aromatic Fougère",
    top: ["Bergamotte", "Minze", "Kardamom"],
    heart: ["Lavendel", "Orangenblüte", "Cumin"],
    base: ["Tonkabohne", "Vanille", "Sandelholz", "Cedernholz"],
    haltbarkeit: 7, sillage: 7, geschlecht: "herren",
    seasons: ["herbst","winter","fruehling"], occasions: ["abend","date","alltag"],
    rating: 4.5, reviews: 14210, preisRange: "premium", preisVon: 79,
    flakon: "Matrosenkörper-Flakon",
    editorChoice: true, tags: ["klassisch","maskulin","vanille","kult"],
  }),

  // ─── Burberry ───
  mk({
    id: "51", slug: "burberry-hero", name: "Hero", marke: "Burberry", markeSlug: "burberry",
    jahr: 2021, parfumeur: "Aurélien Guichard",
    short: "Drei Cedern, Bergamotte, Iso-E — moderne Maskulinität",
    family: "Holzig-Aromatisch", familyEn: "Woody Aromatic",
    top: ["Bergamotte", "Schwarzer Pfeffer"],
    heart: ["Atlas-Cedernholz", "Himalaya-Cedernholz", "Virginia-Cedernholz"],
    base: ["Iso-E-Super", "Benzoe"],
    haltbarkeit: 7, sillage: 6, geschlecht: "herren",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","buero","date"],
    rating: 4.4, reviews: 5890, preisRange: "premium", preisVon: 89,
    trending: true, tags: ["modern","maskulin","unisex","cedernholz"],
  }),
  mk({
    id: "52", slug: "burberry-her", name: "Her", marke: "Burberry", markeSlug: "burberry",
    jahr: 2018, parfumeur: "Francis Kurkdjian",
    short: "Beerenfest mit Vanille und Moschus",
    family: "Fruchtig-Gourmand", familyEn: "Fruity Gourmand",
    top: ["Schwarze Johannisbeere", "Erdbeere", "Himbeere", "Quitte"],
    heart: ["Veilchen", "Jasmin"],
    base: ["Vanille", "Amber", "Moschus"],
    haltbarkeit: 7, sillage: 6, geschlecht: "damen",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","date"],
    rating: 4.4, reviews: 4820, preisRange: "premium", preisVon: 99,
    tags: ["fruchtig","feminin","modern","gourmand"],
  }),

  // ─── Hermès ───
  mk({
    id: "53", slug: "terre-d-hermes", name: "Terre d'Hermès", marke: "Hermès", markeSlug: "hermes",
    jahr: 2006, parfumeur: "Jean-Claude Ellena",
    short: "Mineralisch-erdig — Orange, Pfeffer, Vetiver",
    family: "Holzig-Würzig", familyEn: "Woody Spicy",
    top: ["Grapefruit", "Orange"],
    heart: ["Pfeffer"],
    base: ["Vetiver", "Cedernholz", "Benzoe"],
    haltbarkeit: 8, sillage: 7, geschlecht: "herren",
    seasons: ["fruehling","sommer","herbst"], occasions: ["buero","alltag","date"],
    rating: 4.6, reviews: 14210, preisRange: "premium", preisVon: 99,
    editorChoice: true, tags: ["klassisch","maskulin","mineralisch","vetiver"],
  }),
  mk({
    id: "54", slug: "h24", name: "H24", marke: "Hermès", markeSlug: "hermes",
    jahr: 2021, parfumeur: "Christine Nagel",
    short: "Salbei, Sclareol, Heißbügelmetall — modern und unverwechselbar",
    family: "Holzig-Aromatisch", familyEn: "Woody Aromatic",
    top: ["Sclareol", "Narzisse"],
    heart: ["Salbei", "Rose"],
    base: ["Sandelholz", "Heisses Metall"],
    haltbarkeit: 7, sillage: 6, geschlecht: "herren",
    seasons: ["fruehling","sommer","herbst"], occasions: ["alltag","buero","date"],
    rating: 4.4, reviews: 2810, preisRange: "premium", preisVon: 105,
    trending: true, tags: ["modern","maskulin","experimentell"],
  }),

  // ─── Bvlgari ───
  mk({
    id: "55", slug: "man-in-black", name: "Man in Black", marke: "Bvlgari", markeSlug: "bvlgari",
    jahr: 2014, parfumeur: "Alberto Morillas",
    short: "Rum, Tabak, Tonka — kraftvoll oriental",
    family: "Oriental-Würzig", familyEn: "Oriental Spicy",
    top: ["Rum", "Anis"],
    heart: ["Tabakblatt", "Iris", "Leder"],
    base: ["Tonkabohne", "Benzoe", "Guaiacholz"],
    haltbarkeit: 8, sillage: 8, geschlecht: "herren",
    seasons: ["herbst","winter"], occasions: ["abend","date","besonder"],
    rating: 4.5, reviews: 5210, preisRange: "premium", preisVon: 95,
    tags: ["oriental","maskulin","kraftvoll","abend"],
  }),

  // ─── Mugler ───
  mk({
    id: "56", slug: "alien", name: "Alien", marke: "Mugler", markeSlug: "mugler",
    jahr: 2005, parfumeur: "Dominique Ropion, Laurent Bruyere",
    short: "Sambac-Jasmin und Cashmeran — hypnotisch",
    family: "Blumig-Holzig", familyEn: "Woody Floral",
    top: ["Jasmin Sambac"],
    heart: ["Cashmeran"],
    base: ["Weisses Amber"],
    haltbarkeit: 9, sillage: 9, geschlecht: "damen",
    seasons: ["herbst","winter"], occasions: ["abend","date","besonder"],
    rating: 4.5, reviews: 11200, preisRange: "premium", preisVon: 95,
    flakon: "Violetter Talisman",
    tags: ["jasmin","hypnotisch","feminin","abend"],
  }),
  mk({
    id: "57", slug: "angel", name: "Angel", marke: "Mugler", markeSlug: "mugler",
    jahr: 1992, parfumeur: "Olivier Cresp, Yves de Chiris",
    short: "Schokolade, Praline, Patchouli — Pionier des Gourmand",
    family: "Oriental-Vanille", familyEn: "Gourmand",
    top: ["Bergamotte", "Pfirsich", "Lakritz"],
    heart: ["Honig", "Jasmin", "Schokolade"],
    base: ["Patchouli", "Karamell", "Praliné", "Vanille"],
    haltbarkeit: 9, sillage: 9, geschlecht: "damen",
    seasons: ["herbst","winter"], occasions: ["abend","besonder"],
    rating: 4.4, reviews: 8420, preisRange: "premium", preisVon: 99,
    flakon: "Stern aus blauem Glas",
    editorChoice: true, tags: ["gourmand","ikonisch","feminin","schokolade"],
  }),

  // ─── Gucci ───
  mk({
    id: "58", slug: "gucci-bloom", name: "Bloom", marke: "Gucci", markeSlug: "gucci",
    jahr: 2017, parfumeur: "Alberto Morillas",
    short: "Tuberose, Jasmin, Rangoon-Kreepe — Garten in Blüte",
    family: "Blumig", familyEn: "Floral",
    top: ["Rangoon-Kreepe"],
    heart: ["Tuberose", "Jasmin Sambac"],
    base: ["Iris", "Moschus"],
    haltbarkeit: 7, sillage: 7, geschlecht: "damen",
    seasons: ["fruehling","sommer"], occasions: ["alltag","date"],
    rating: 4.3, reviews: 4820, preisRange: "premium", preisVon: 105,
    tags: ["blumig","feminin","frühling"],
  }),

  // ─── Lancôme ───
  mk({
    id: "59", slug: "la-vie-est-belle", name: "La Vie est Belle", marke: "Lancôme", markeSlug: "lancome",
    jahr: 2012, parfumeur: "Olivier Polge, Dominique Ropion, Anne Flipo",
    short: "Iris, Patchouli, Süsswaren — Lebensfreude",
    family: "Fruchtig-Gourmand", familyEn: "Fruity Gourmand",
    top: ["Schwarze Johannisbeere", "Birne"],
    heart: ["Iris", "Jasmin", "Orangenblüte"],
    base: ["Praliné", "Vanille", "Patchouli", "Tonkabohne"],
    haltbarkeit: 8, sillage: 8, geschlecht: "damen",
    seasons: ["herbst","winter","fruehling"], occasions: ["alltag","abend","date"],
    rating: 4.5, reviews: 18420, preisRange: "premium", preisVon: 109,
    tags: ["gourmand","feminin","klassisch"],
  }),

  // ─── Guerlain ───
  mk({
    id: "60", slug: "shalimar", name: "Shalimar", marke: "Guerlain", markeSlug: "guerlain",
    jahr: 1925, parfumeur: "Jacques Guerlain",
    short: "Zitrone, Iris, Vanille — der Oriental-Pionier",
    family: "Oriental-Vanille", familyEn: "Amber Vanilla",
    top: ["Bergamotte", "Zitrone", "Mandarine"],
    heart: ["Iris", "Rose", "Jasmin"],
    base: ["Vanille", "Tonkabohne", "Weihrauch", "Opoponax"],
    haltbarkeit: 9, sillage: 9, geschlecht: "damen",
    seasons: ["herbst","winter"], occasions: ["abend","besonder"],
    rating: 4.4, reviews: 6310, preisRange: "luxus", preisVon: 145,
    editorChoice: true, tags: ["klassisch","ikonisch","vanille","oriental"],
  }),
];

// Attach reviews to flagship perfumes
_list.forEach((p) => {
  p.bewertungen = sampleReviews(p.slug);
});

// Curate the homepage trending feed — exactly 8 brand-diverse perfumes
// (deduplicated by brand, ordered for visual variety in the family palette).
const _trendingHomepage = new Set([
  "baccarat-rouge-540",   // MFK   — amber
  "santal-33",            // Le Labo — woody spicy
  "aventus",              // Creed — fruity chypre
  "bleu-de-chanel",       // Chanel — woody aromatic
  "sauvage",              // Dior  — fougère
  "libre",                // YSL   — floral fougère
  "black-orchid",         // Tom Ford — floral oriental
  "acqua-di-gio-profondo",// Armani — aquatic
]);
_list.forEach((p) => {
  if (_trendingHomepage.has(p.slug)) return; // keep marked
  // For non-curated entries we still allow trending=true elsewhere,
  // but de-prioritise by sliding them down in the array.
});
// Move curated trending to the top so getTrendingParfums().slice(0,8) is diverse
_list.sort((a, b) => {
  const aT = _trendingHomepage.has(a.slug) ? 0 : 1;
  const bT = _trendingHomepage.has(b.slug) ? 0 : 1;
  if (aT !== bT) return aT - bT;
  return 0;
});

// ─────────────────── Cross-references (similar perfumes) ───────────────────
// Make sure every perfume has at least 3 similar entries (auto-fill by family)
_list.forEach((p) => {
  if (p.aehnliche.length >= 3) return;
  const candidates = _list.filter(
    (other) =>
      other.id !== p.id &&
      !p.aehnliche.includes(other.id) &&
      (other.duftfamilieEn === p.duftfamilieEn ||
        other.geschlecht === p.geschlecht),
  );
  while (p.aehnliche.length < 3 && candidates.length > 0) {
    const next = candidates.shift()!;
    p.aehnliche.push(next.id);
  }
});

export const parfums: Parfum[] = _list;

// ─────────────────────────── Brands ───────────────────────────
export const marken = [
  { id: "tom-ford", name: "Tom Ford", logo: "TF" },
  { id: "mfk", name: "Maison Francis Kurkdjian", logo: "MFK" },
  { id: "creed", name: "Creed", logo: "CR" },
  { id: "le-labo", name: "Le Labo", logo: "LL" },
  { id: "diptyque", name: "Diptyque", logo: "DI" },
  { id: "byredo", name: "Byredo", logo: "BY" },
  { id: "chanel", name: "Chanel", logo: "C" },
  { id: "dior", name: "Dior", logo: "D" },
  { id: "ysl", name: "Yves Saint Laurent", logo: "YSL" },
  { id: "versace", name: "Versace", logo: "V" },
  { id: "armani", name: "Giorgio Armani", logo: "GA" },
  { id: "carolina-herrera", name: "Carolina Herrera", logo: "CH" },
  { id: "paco-rabanne", name: "Paco Rabanne", logo: "PR" },
  { id: "jpg", name: "Jean Paul Gaultier", logo: "JPG" },
  { id: "burberry", name: "Burberry", logo: "BB" },
  { id: "hermes", name: "Hermès", logo: "H" },
  { id: "bvlgari", name: "Bvlgari", logo: "BV" },
  { id: "mugler", name: "Mugler", logo: "M" },
  { id: "gucci", name: "Gucci", logo: "G" },
  { id: "lancome", name: "Lancôme", logo: "L" },
  { id: "guerlain", name: "Guerlain", logo: "GU" },
];

// ─────────────────────────── Fragrance families ───────────────────────────
export const duftfamilien = [
  { id: "blumig", name: "Blumig", icon: "🌸" },
  { id: "oriental", name: "Oriental", icon: "🌙" },
  { id: "holzig", name: "Holzig", icon: "🌲" },
  { id: "frisch", name: "Frisch", icon: "💧" },
  { id: "fougere", name: "Fougère", icon: "🌿" },
  { id: "chypre", name: "Chypre", icon: "🍃" },
  { id: "fruchtig", name: "Fruchtig", icon: "🍋" },
  { id: "ledrig", name: "Ledrig", icon: "🐂" },
  { id: "gourmand", name: "Gourmand", icon: "🍯" },
  { id: "aquatisch", name: "Aquatisch", icon: "🌊" },
];

// ─────────────────────────── Helpers ───────────────────────────
export function getParfumBySlug(slug: string): Parfum | undefined {
  return parfums.find((p) => p.slug === slug);
}

export function getTrendingParfums(): Parfum[] {
  return parfums.filter((p) => p.trending);
}

export function getEditorChoiceParfums(): Parfum[] {
  return parfums.filter((p) => p.editorChoice);
}

export function searchParfums(query: string): Parfum[] {
  const q = query.toLowerCase().trim();
  if (!q) return parfums;
  return parfums.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.marke.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.duftfamilie.toLowerCase().includes(q) ||
      p.noten.some((no) => no.name.toLowerCase().includes(q)),
  );
}

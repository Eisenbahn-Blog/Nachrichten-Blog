/*
  HIER NEUE BEITRÄGE EINTRAGEN

  - id: eindeutige Nummer
  - title: Überschrift
  - date: YYYY-MM-DD
  - category: Hauptkategorie
  - categories: weitere Kategorien
  - image: Bilddatei im Ordner images/
  - excerpt: Kurztext für die Startseite
  - content: HTML-Inhalt des Artikels
  - important: true = Eilmeldung auf der Startseite
*/

const posts = [
  {
    id: 1,
    title: "Neuer Blog",
    date: "2026-08-15",
    author: "Leonard Klinger",
    category: "Meldungen",
    categories: ["Baustellen", "Eisenbahn", "Murgtalbahn", "Meldungen"],
    image: "images/IMG_8786.JPG",
    excerpt: "Neue Blogbeiträge über die Eisenbahn und co.",
    important: false,
    content: `
      <p>Das hier ist eine neue Website für Blogbeiträge.</p>
      <h2>Was ist geplant?</h2>
      <p>Hier kommen von mir (Leonard Klinger) und anderen Autoren neue Beiträge zur Eisenbahn und andere Bahnthemen in Baden-Württemberg.</p>
      <p><strong>Hinweis:</strong> Es handelt sich immer um geprüfte Informationen</p>
    `
  },
  {
    id: 2,
    title: "Stadtbahn verschwindet aus dem Murgtal",
    date: "2026-08-15",
    author: "Leonard Klinger",
    category: "Murgtalbahn",
    categories: ["Eisenbahn", "Murgtalbahn"],
    image: "images/IMG_9559.JPG",
    excerpt: "Neuigkeiten rund um die Bahn im Murgtal.",
    important: true,
    content: `
      <p>Durch die Umstellung auf die Regionalbahn wird die traditionelle Stadtbahnverbindung im oberen Murgtal verschwinden.</p>
      <p>Durch die von DB Regio gewonnene Ausschreibung wird vorgesehen, dass zur Eröffnung des Rastatter Tunnels der letzte Teil der Ausschreibung
      vollständig inkraft tritt. Das bedeutet, dass die Stadtbahnverbindung im Murgtal nicht mehr existieren wird. Die Stadtahnen der S8 wenden 
      bereits in Forbach und werden zwischen Forbach und Freudenstadt durch den bisherien Regionalexpress ersetzt, welcher an allen Zwischenstationen halten soll. 
      Wie genau der Fahrplan aussieht, zeigt sich kurz vor dem Fahrplanwechsel Anfang Dezember.</p>
    `
  },
  {
    id: 3,
    title: "Kurzmeldungen",
    date: "2026-08-16",
    author: "Leonard Klinger",
    category: "Meldungen",
    categories: ["Eisenbahn", "Murgtalbahn", "Meldungen", "Baustellen", "Fahrplan & Verkehr"],
    image: "images/KURZMELDUNGEN.jpg",
    excerpt: "Die Kurzmeldungen der Kalenderwoche 33.",
    important: false,
    content: `
      <p>Was diese Woche wichtig war!</p>
      <h3>Stuttgart: Unbekannte Person attackiert Fahrgäste und wirft Steine auf S-Bahn</h3>
      <p>Im Stuttgarter Nordbahnhof hat am Donnerstag ein unbekannter Mann Reisende beleidigt, bedroht und mit Steinen beworfen. Laut Polizei
      hat er eine Zigarette nach einer Frau geworfen, welche ihn auf das Raucherverbot hinwies. Daraufhin hat er eine Teenagerin beleidigt und 
      mit einem Becher beworfen. Eine weitere Frau solle er ebenfalls bespuckt haben.Der Mann betrat den Gleisbereich und bewarf eine einfahrende S-Bahn
      der Linie S6 mit Steinen. Eine Fahndung der Polizei ist fehlgeschlagen. Die Bundespolizei ermittelt unter anderem wegen des Verdachts der Beleidigung 
      und Bedrohung und sucht Zeugen.</p>
      <h3>Rheintalbahn: Baumaßnahmen dieses Wochenende</h3>
      <p>Auf der Rheintalbahn finden dieses Wochenende noch bis Montagmorgen Bauarbeiten statt. Laut der Deutschen Bahn entfallen die Regionalbahnen des RE7 und der RB26
      zwischen Offenburg und Herbolzheim. Der Fernverkehr fällt zwischen Offenburg und Freiburg Hauptbahnhof aus. Ein Schienenersatzverkehr ist eingerichtet.</p>
      <p>Die nächste Sperrung der Rheintalbahn ist am Wochenende 18. bis 21. September vorgesehen.</p>
    `
  },
];

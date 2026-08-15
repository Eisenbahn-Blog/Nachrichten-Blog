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
    category: "Eisenbahn",
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
  }
];

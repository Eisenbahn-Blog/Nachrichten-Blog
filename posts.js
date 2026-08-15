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
    category: "Alle",
    categories: ["Baustellen", "Eisenbahn", "Baden-Württemberg", "Murgtalbahn"],
    image: "images/IMG_8786.JPG",
    excerpt: "Neue Blogbeiträge über dieEisenbahn und co.",
    important: false,
    content: `
      <p>Das hier ist eine neue Website für Blogbeiträge.</p>
      <h2>Was ist geplant?</h2>
      <p>Hier kommen von mir (Leonard Klinger) neue Beiträge zur Eisenbahn und andere Bahnthemen in Baden-Württemberg.</p>
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
      <p>Hier ist ein zweiter Beispielbeitrag. Er zeigt, wie mehrere Beiträge auf der Startseite erscheinen.</p>
      <p>Du kannst diesen Beitrag später einfach löschen oder durch eine echte Meldung ersetzen.</p>
    `
  }
];

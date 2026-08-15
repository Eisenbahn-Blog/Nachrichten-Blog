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
    title: "Neue Bauarbeiten zwischen Karlsruhe und Rastatt",
    date: "2026-08-15",
    author: "Leo",
    category: "Baustellen",
    categories: ["Baustellen", "Eisenbahn", "Baden-Württemberg"],
    image: "images/beispiel-zug.svg",
    excerpt: "Auf der Strecke zwischen Karlsruhe und Rastatt stehen neue Bauarbeiten an.",
    important: true,
    content: `
      <p>Auf der Strecke zwischen Karlsruhe und Rastatt stehen neue Bauarbeiten an. In diesem Beispielartikel kannst du später deine eigene Meldung eintragen.</p>
      <h2>Was ist geplant?</h2>
      <p>Hier kommt der ausführliche Text deiner Meldung hin. Du kannst Absätze, Überschriften und weitere HTML-Elemente verwenden.</p>
      <p><strong>Hinweis:</strong> Bei echten Nachrichten solltest du die Informationen und Quellen sorgfältig prüfen.</p>
    `
  },
  {
    id: 2,
    title: "Neue Meldung aus dem Murgtal",
    date: "2026-08-14",
    author: "Leo",
    category: "Eisenbahn",
    categories: ["Eisenbahn", "Murgtalbahn"],
    image: "images/beispiel-murgtal.svg",
    excerpt: "Neuigkeiten rund um die Eisenbahn im Murgtal.",
    important: false,
    content: `
      <p>Hier ist ein zweiter Beispielbeitrag. Er zeigt, wie mehrere Beiträge auf der Startseite erscheinen.</p>
      <p>Du kannst diesen Beitrag später einfach löschen oder durch eine echte Meldung ersetzen.</p>
    `
  }
];

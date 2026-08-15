# Eisenbahn-News Baden-Württemberg

Kostenloser Blog für GitHub Pages – nur HTML, CSS und JavaScript.

## 1. Auf GitHub veröffentlichen

1. Neues GitHub-Repository erstellen, z. B. `eisenbahn-news`.
2. Alle Dateien aus diesem Ordner in das Repository hochladen.
3. In GitHub: **Settings → Pages**.
4. Bei **Build and deployment** `Deploy from a branch` auswählen.
5. Branch `main` und Ordner `/ (root)` auswählen.
6. Speichern.
7. Nach dem Deployment ist die Website über die angezeigte GitHub-Pages-Adresse erreichbar.

## 2. Neue Meldung erstellen

Öffne `posts.js`.

Kopiere einen vorhandenen Beitrag und ändere:

- `title` = Überschrift
- `date` = Datum im Format `YYYY-MM-DD`
- `author` = Autor
- `category` = Hauptkategorie
- `categories` = Kategorien
- `image` = Bilddatei
- `excerpt` = Kurzbeschreibung
- `important` = `true` für eine Eilmeldung
- `content` = Artikeltext

## 3. Bilder

Lege deine Bilder in `images/` ab.

Beispiel:

`images/karlsruhe-rastatt.jpg`

und in `posts.js`:

`image: "images/karlsruhe-rastatt.jpg"`

Für das große Titelbild der Startseite:

`images/hero.jpg`

## Wichtig

Diese Version ist bewusst ohne Backend gebaut. Beiträge werden durch Ändern von `posts.js` veröffentlicht. GitHub Pages hostet die Website kostenlos.

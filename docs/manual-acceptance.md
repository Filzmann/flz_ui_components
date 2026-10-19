# Manuelles Abnahmeprotokoll – FLZ UI Components

Dieses Formular dokumentiert die visuelle, interaktive und technische Abnahme
des exakten Release-Artefakts. Nur neutrale Testinhalte verwenden. Pro Fall
genau ein Ergebnis markieren und Abweichungen begründen.

## Kopfdaten

| Feld | Eintrag |
|---|---|
| Datum / Prüfer*in | 18.10.2026 / automatisierter lokaler Teilnachweis (Codex); 19.10.2026 / Auftraggeber (vollständige menschliche Abnahme bestätigt) |
| Umgebung / WordPress / PHP | DDEV `tagore-local`, WordPress 7.1.3, PHP 8.3, MariaDB 10.11 |
| Browser / Version / Viewport / Zoom | Google Chrome Headless 155.0.8059.84; 320, 700 und 1280 px Breite; 100 % |
| Plugin-Version / vollständiger Git-Commit | 0.2.1-rc.1 / `7b9c06b9b26024455da1527efe028ece1a6c4a17` |
| Artefaktname / SHA-256 | `flz_ui_components-0.2.1-rc.1.zip` / `e7dea63d25261e972698f2a60d9a76fbf5629fc56bb5a6bed17b85786ae1e977` |

## Automatisierte Nachweise

| Nachweis | Kommando / Lauf | Ergebnis / Beleg |
|---|---|---|
| PR-/`main`-CI / PHP 8.1 und 8.5 | Workflow-Lauf / vollständiger Commit | |
| Renderer-, Validator-, Asset- und JS-Smokes | `./scripts/check-fast` | |
| PHP-Line-Coverage / Baseline / Ziel 85 % | | |
| JavaScript-Line-Coverage / Baseline / Ziel 85 % | | |
| Drei Verbraucher-Verträge | | |
| Reproduzierbarkeit und Archivinhalt | | |

### Automatisierter Teilnachweis vom 18. Oktober 2026

- Der exakte Commit besitzt einen grünen Remote-Workflow einschließlich
  PHP 8.1/8.5, Provider-/Consumer-Checks, PHP-/JavaScript-Coverage und
  Artefaktprüfung: <https://github.com/Filzmann/flz_ui_components/actions/runs/39138715058>.
- `./scripts/check-fast` im Komponenten-Repository war grün.
- Zwei unabhängige Bauten des exakten Artefakts waren bytegleich; Manifest und
  SHA-256 wurden erfolgreich geprüft.
- Der lokale Symlink zeigt auf das Komponenten-Repository; Plugin 0.2.1-rc.1
  ist aktiv. Die öffentlichen Verbraucher AGs, Probeunterricht und
  Elternsprechtag antworteten jeweils mit HTTP 200 und luden das gemeinsame
  CSS/JavaScript einmal.
- Headless-Browser-Screenshots der drei Verbraucher bei 320, 700 und 1280 px
  zeigten die UI-Komponenten ohne erkennbaren horizontalen Überlauf. Die
  AG-Seite wurde zusätzlich bei 320 und 1280 px visuell geprüft.
- DOM- und Quellprüfung belegt Labels, `aria-*`-Beziehungen, sichtbare
  Fokusregeln, Escape-/Schließen-Verhalten des Floating-Panels sowie
  Nichtladung der UI-Assets auf der neutralen Datenschutzseite.
- Die ergänzende echte Tastaturbedienung, Screenreader-Ausgabe,
  Kontrastbewertung und Editor-Interaktion wurden am 19. Oktober 2026 durch
  den Auftraggeber erfolgreich menschlich abgenommen.

## Manuelle Prüffälle

### Technischer ZIP-Teilnachweis vom 22. August 2026

- Umgebung: DDEV, WordPress 7.1, PHP 8.3, MariaDB 10.11.
- Exaktes Artefakt: `flz_ui_components-0.2.0.zip`, Commit
  `b68ddee9ec65b46e6b6196b5d9792a7116f60766`, SHA-256
  `eef019e280204256f7c453d961328de83942f6469850e30a2009b8c4a0649a65`.
- Reproduzierbarkeit, Archivvertrag und installierter Dateibaum sowie
  WP-CLI-Installation, Aktivstatus, Deaktivierung, Reaktivierung und HTTP 200
  waren erfolgreich. Snapshot- und Symlink-Rückbau waren erfolgreich.
- Noch nicht belegt: saubere Frischinstallation, Browser-, Tastatur-,
  Responsive-, Kontrast- und Verbraucher-Sichtprüfung.

| ID | Prüfschritte | Erwartetes Ergebnis | Ergebnis | Warum / Beleg / Abweichung |
|---|---|---|---|---|
| UI-01 | Normale Seite ohne FLZ-Komponente öffnen und Assets prüfen. | UI-CSS und -JavaScript werden nicht geladen. | [x] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | Menschliche Abnahme durch Auftraggeber am 19.10.2026 bestätigt. |
| UI-02 | Je eine Frontend- und Adminseite eines Verbrauchers öffnen. | Assets werden genau einmal und vor abhängigen Styles/Scripts geladen. | [x] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | Menschliche Abnahme durch Auftraggeber am 19.10.2026 bestätigt. |
| UI-03 | Buttons, Formulare, Notices, Tabellen und Karten nur per Tastatur bedienen. | Alle Funktionen sind erreichbar; Fokus ist sichtbar; keine Tastaturfalle entsteht. | [x] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | Menschliche Abnahme durch Auftraggeber am 19.10.2026 bestätigt. |
| UI-04 | Löschen, Leeren, Reset und Upload bestätigen und abbrechen. | Delegierter Dialog funktioniert ohne Inline-Handler; Abbruch verhindert die Aktion. | [x] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | Menschliche Abnahme durch Auftraggeber am 19.10.2026 bestätigt. |
| UI-05 | Shortcode-Block einfügen, Select-/Textwerte ändern, speichern und erneut öffnen. | Editor und Frontend bleiben auswählbar, verständlich und wertstabil. | [x] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | Menschliche Abnahme durch Auftraggeber am 19.10.2026 bestätigt. |
| UI-06 | Demo und Verbraucher bei 320, 700 und 1280 Pixel prüfen. | Kein unkontrolliertes Seitenscrollen; Labels, Fehler und Aktionen bleiben sichtbar. | [x] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | Menschliche Abnahme durch Auftraggeber am 19.10.2026 bestätigt. |
| UI-07 | Screenreader-Namen, Kontrast und Bedeutung ohne Farbe/Hover prüfen. | Name, Rolle, Zustand und Fehler sind verständlich; Bedeutung ist nicht rein visuell. | [x] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | Menschliche Abnahme durch Auftraggeber am 19.10.2026 bestätigt. |

## Abschlussentscheidung

| Feld | Eintrag |
|---|---|
| Erfolgreich / nicht erfolgreich / nicht geprüft | erfolgreich |
| Kritische Abweichungen / Tickets | keine bestätigt |
| Verbraucher vollständig geprüft | [x] ja [ ] nein |
| Gesamtentscheidung | [x] abgenommen [ ] mit Auflagen abgenommen [ ] nicht abgenommen |
| Name / Datum | Auftraggeber / 19.10.2026 |

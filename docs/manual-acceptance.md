# Manuelles Abnahmeprotokoll – FLZ UI Components

Dieses Formular dokumentiert die visuelle, interaktive und technische Abnahme
des exakten Release-Artefakts. Nur neutrale Testinhalte verwenden. Pro Fall
genau ein Ergebnis markieren und Abweichungen begründen.

## Kopfdaten

| Feld | Eintrag |
|---|---|
| Datum / Prüfer*in | |
| Umgebung / WordPress / PHP | |
| Browser / Version / Viewport / Zoom | |
| Plugin-Version / vollständiger Git-Commit | |
| Artefaktname / SHA-256 | |

## Automatisierte Nachweise

| Nachweis | Kommando / Lauf | Ergebnis / Beleg |
|---|---|---|
| PR-/`main`-CI / PHP 8.1 und 8.5 | Workflow-Lauf / vollständiger Commit | |
| Renderer-, Validator-, Asset- und JS-Smokes | `./scripts/check-fast` | |
| PHP-Line-Coverage / Baseline / Ziel 85 % | | |
| JavaScript-Line-Coverage / Baseline / Ziel 85 % | | |
| Drei Verbraucher-Verträge | | |
| Reproduzierbarkeit und Archivinhalt | | |

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
| UI-01 | Normale Seite ohne FLZ-Komponente öffnen und Assets prüfen. | UI-CSS und -JavaScript werden nicht geladen. | [ ] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | |
| UI-02 | Je eine Frontend- und Adminseite eines Verbrauchers öffnen. | Assets werden genau einmal und vor abhängigen Styles/Scripts geladen. | [ ] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | |
| UI-03 | Buttons, Formulare, Notices, Tabellen und Karten nur per Tastatur bedienen. | Alle Funktionen sind erreichbar; Fokus ist sichtbar; keine Tastaturfalle entsteht. | [ ] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | |
| UI-04 | Löschen, Leeren, Reset und Upload bestätigen und abbrechen. | Delegierter Dialog funktioniert ohne Inline-Handler; Abbruch verhindert die Aktion. | [ ] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | |
| UI-05 | Shortcode-Block einfügen, Select-/Textwerte ändern, speichern und erneut öffnen. | Editor und Frontend bleiben auswählbar, verständlich und wertstabil. | [ ] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | |
| UI-06 | Demo und Verbraucher bei 320, 700 und 1280 Pixel prüfen. | Kein unkontrolliertes Seitenscrollen; Labels, Fehler und Aktionen bleiben sichtbar. | [ ] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | |
| UI-07 | Screenreader-Namen, Kontrast und Bedeutung ohne Farbe/Hover prüfen. | Name, Rolle, Zustand und Fehler sind verständlich; Bedeutung ist nicht rein visuell. | [ ] erfolgreich [ ] nicht erfolgreich [ ] nicht geprüft | |

## Abschlussentscheidung

| Feld | Eintrag |
|---|---|
| Erfolgreich / nicht erfolgreich / nicht geprüft | |
| Kritische Abweichungen / Tickets | |
| Verbraucher vollständig geprüft | [ ] ja [ ] nein |
| Gesamtentscheidung | [ ] abgenommen [ ] mit Auflagen abgenommen [ ] nicht abgenommen |
| Name / Datum | |

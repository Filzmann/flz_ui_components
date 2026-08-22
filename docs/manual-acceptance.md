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
| Renderer-, Validator-, Asset- und JS-Smokes | `./scripts/check-fast` | |
| PHP-Line-Coverage / Baseline / Ziel 85 % | | |
| JavaScript-Line-Coverage / Baseline / Ziel 85 % | | |
| Drei Verbraucher-Verträge | | |
| Reproduzierbarkeit und Archivinhalt | | |

## Manuelle Prüffälle

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

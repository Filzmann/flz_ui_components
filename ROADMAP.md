# Roadmap: flz_ui_components

## Prüfstatus

**Release Candidate 0.2.0 / keine offenen P0- oder P1-Befunde.** Renderer,
Validator, Admin-Demo, dynamische Shortcode-Blöcke, Select-Felder,
bedarfsgesteuerte Assets und CSP-freundliche Bestätigungen werden durch
CLI-Smokes abgesichert. Die drei Fachverbraucher registrieren die Assets vor
ihren eigenen Styles und laden sie nur auf passenden Requests. Demo-Werte
verwenden ausschließlich reservierte Beispieldaten.

## P1

1. **Erledigt:** Öffentliche Renderer-, Validator-, Block- und Assetverträge
   sind über Versionskonstante, API-Dokumentation und Komponenten-Smokes
   nachvollziehbar. 0.2.0 kennzeichnet die geänderte Asset-/Event-Grenze.
2. **Erledigt:** Sicherheits-Contract-Tests decken frei übergebene
   Eventattribute, Bestätigungsbuttons und zentrale Renderer-Kontexte ab.
3. **Erledigt:** Assets werden registriert und erst durch tatsächliche
   Komponentenverwendung oder explizites Early-Enqueue der Verbraucher geladen.

## P2

1. **Erledigt:** Inline-`onclick`/`window.confirm` wurde durch delegierte
   Handler und `data-flz-ui-confirm` ersetzt; `on*`-Attribute werden verworfen.
2. JavaScript-Tests für Fokusfalle, Escape, dynamische Matrixzeilen,
   bearbeitbare Zeilen und Block-Inspector ergänzen.
3. Alle nutzersichtbaren Preset-, Fehler- und Demotexte über
   `flz-ui-components` übersetzbar machen; Editor-Script-Übersetzungen laden.
4. Semantik, Tastaturführung, Screenreader-Namen, Kontrast und Responsive-
   Verhalten der Komponentenbibliothek in einem echten Browser dokumentiert
   prüfen. Diese visuelle Abnahme ist die verbleibende Release-Nachweislücke.

## P3

1. API-Referenz aus ausführbaren Beispielen/Tests ableiten und veraltete
   Beispiele automatisiert erkennen.
2. CSS-/JS-Build- und Größenbudget sowie Coverage für den Shared-Vertrag als
   CI-Gate definieren.

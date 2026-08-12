# Regeln für flz_ui_components

Dieses Repository enthält ausschließlich das Shared-Plugin
`flz_ui_components`. Quellcode wird hier bearbeitet und in WordPress nur per
Symlink bereitgestellt. Core, fremde Erweiterungen, Uploads, Secrets und
produktive Konfiguration bleiben außerhalb des Scopes.

Das Plugin veröffentlicht Rendering-, Formular-, Validierungs-, Asset- und
Blockverträge. Es enthält keine Fachlogik, Persistenz oder
Berechtigungsentscheidung. Öffentliche Änderungen brauchen Versionierung,
Rückwärtskompatibilität und Verbraucherprüfung.

- Eingaben am Rand validieren und Ausgaben im exakten Kontext spät escapen.
- Frei übergebbare HTML-Attribute auf einen dokumentierten Vertrag begrenzen.
- Assets nur bei tatsächlichem Bedarf enqueuen; Inline-Handler klein halten und
  nach Möglichkeit durch registriertes JavaScript ersetzen.
- Komponenten bleiben semantisch, responsiv, per Tastatur bedienbar und haben
  sichtbare Fokus- sowie verständliche Fehlerzustände.
- Übersetzbare Texte verwenden `flz-ui-components`.
- Änderungen beobachtbaren Verhaltens testgetrieben ausführen.

Vor öffentlichen Änderungen Verbraucher bestimmen: derzeit
`flz_elternsprechtag`, `flz_probeunterricht` und `flz_ags`. Mindestens
`php tests/renderer-smoke.php`, `php tests/validator-smoke.php` und
`./scripts/check-fast` ausführen. Browser-/Accessibility-Prüfung separat
benennen. Keine Commits, Pushes oder Deployments ohne ausdrückliche Freigabe;
nie `git add .` verwenden.

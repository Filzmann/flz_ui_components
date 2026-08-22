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

## Commit-, Coverage- und Release-Gates

- Der aktuelle Übernahmestand ist Phase 1: PR-/Main-CI, Lizenz, Changelog und
  branchgleiche Verbrauchertests sind lokal konfiguriert. Bis zum ersten
  grünen Remote-Lauf und den Coverage-Gates bleiben normale Produkt- und
  Releasecommits blockiert; ausdrücklich beauftragte Quality-Rollout-Commits
  dürfen die fehlende Infrastruktur schrittweise herstellen.
- Vor einem späteren normalen Commit sind Status, Diff-Statistik und vollständige
  Dateiliste zu zeigen; fokussierte Tests, `./scripts/check-fast`, relevante
  Provider-/Consumer-Tests, CI und Coverage-Gates müssen grün sein. Dateien
  werden einzeln gestaged; `git add .` bleibt verboten.
- PHP- und JavaScript-Line-Coverage werden getrennt ausgewiesen. Eine gemessene
  Baseline darf nicht sinken; neuer oder wesentlich geänderter Code erreicht
  mindestens 85 Prozent, Sicherheitsinvarianten unabhängig davon vollständig.
- Ein Fast- oder Diagnosecheck ist kein Releaseurteil. Ein Release braucht ein
  sauberes Repository, konsistente Version/Changelog/Lizenz, vollständig
  ausgefülltes `docs/manual-acceptance.md`, ein reproduzierbares Ein-Wurzel-
  Archiv, Manifest und SHA-256 sowie geprüfte Installation, Verbraucher,
  sichtbare UI, Barrierefreiheit und Rückbau aus dem exakten Artefakt.
- Bauen, Signieren, Taggen, Pushen, Publizieren und Deployen bleiben getrennte,
  ausdrücklich zu autorisierende Aktionen.

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

- Der aktuelle Übernahmestand ist Phase 2: PR-/Main-CI, branchgleiche
  Verbrauchertests sowie PHP- und JavaScript-Coverage-Ratschen sind remote
  belegt. Normale Produktcommits brauchen das enforced Commit-Gate;
  Releasecommits bleiben bis zur Abnahme und zum Artefakt-Gate blockiert.
- Vor jedem normalen Commit sind Status, Diff-Statistik und vollständige
  Dateiliste zu zeigen; fokussierte Tests, `./scripts/check-fast`, relevante
  Provider-/Consumer-Tests, CI und Coverage-Gates müssen grün sein. Dateien
  werden einzeln gestaged; `git add .` bleibt verboten.
- PHP- und JavaScript-Line-Coverage werden getrennt ausgewiesen. Eine gemessene
  Baseline darf nicht sinken; neuer oder wesentlich geänderter Code erreicht
  mindestens 85 Prozent, Sicherheitsinvarianten unabhängig davon vollständig.
- Die enforced Baselines betragen 54,34 Prozent für PHP und 54,05 Prozent für
  JavaScript; das Ziel für neuen oder wesentlich geänderten Code bleibt je
  Sprache 85 Prozent.
- `scripts/build-release` erzeugt über den kanonischen Workspace-Builder ein
  reproduzierbares Ein-Wurzel-ZIP mit Manifest und SHA-256. Das Artefakt-Gate
  bleibt bis zur Prüfung des exakten ZIP in WordPress `configured`.
- Ein Fast- oder Diagnosecheck ist kein Releaseurteil. Ein Release braucht ein
  sauberes Repository, konsistente Version/Changelog/Lizenz, vollständig
  ausgefülltes `docs/manual-acceptance.md`, ein reproduzierbares Ein-Wurzel-
  Archiv, Manifest und SHA-256 sowie geprüfte Installation, Verbraucher,
  sichtbare UI, Barrierefreiheit und Rückbau aus dem exakten Artefakt.
- Bauen, Signieren, Taggen, Pushen, Publizieren und Deployen bleiben getrennte,
  ausdrücklich zu autorisierende Aktionen.

## Parent-Governance-Vertrag: 1

- Die für dieses Komponenten-Repository anwendbaren Regeln des
  Parent-Workspaces sind verbindlich. Dazu gehören insbesondere gemeinsame
  Architektur-, Sicherheits-, Plugin- und Theme-Verträge,
  Repositorygrenzen sowie Workspace-, Quality-, Delivery- und Release-Gates.
- Diese lokale `AGENTS.md` und die lokalen Skills bleiben die vollständige,
  ohne Parent-Checkout arbeitsfähige Repository-Steuerung. Die anwendbaren
  Parent-Regeln werden dafür hier oder in den lokalen Skills mitgeführt.
- Vor Arbeit an der Komponente ist der lokale Skill
  `work-in-wordpress-extension` zu verwenden. Für beobachtbare Änderungen
  gilt zusätzlich der lokale Skill `test-driven-wordpress-change`.
- Repository-lokale Regeln dürfen Parent-Verträge konkretisieren und
  verschärfen, aber nicht abschwächen oder umgehen.
- Bei einem Widerspruch gilt bis zur Klärung die strengere Regel. Die Arbeit
  stoppt, bis die kanonische Quelle bestimmt, die Regelprojektionen
  synchronisiert und eine erforderliche Entscheidung dokumentiert ist.
- Ist der Parent-Workspace nicht verfügbar, bleibt die lokale Steuerung
  wirksam. Vor Cross-Component-, Release- oder Delivery-Arbeit muss ein
  vermuteter neuerer Parent-Stand oder eine Regelungslücke zuerst gegen den
  Parent geprüft werden.

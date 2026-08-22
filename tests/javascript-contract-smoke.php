<?php

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

// Test-Exceptions werden ausschließlich von der CLI ausgewertet.
// phpcs:disable WordPress.Security.EscapeOutput.ExceptionNotEscaped

$source = file_get_contents(dirname(__DIR__) . '/assets/js/flz-ui-components.js');
if (false === $source) {
    throw new RuntimeException('Das gemeinsame UI-JavaScript konnte nicht gelesen werden.');
}

foreach (
    array(
        "closest('[data-flz-ui-confirm]')",
        'window.confirm(',
        "event.key === 'Escape'",
        "event.key !== 'Tab'",
        'addMatrixRow(',
        "closest('[data-flz-ui-submit-on-change]')",
        'requestSubmit()',
    ) as $needle
) {
    if (!str_contains($source, $needle)) {
        throw new RuntimeException('Der JavaScript-Interaktionsvertrag fehlt: ' . $needle);
    }
}

echo "OK: flz_ui_components JavaScript interaction contract smoke test\n";

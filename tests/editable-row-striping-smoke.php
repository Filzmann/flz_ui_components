<?php

// Expandable detail rows make DOM nth-child striping unreliable. A logical
// data row marked as alternate must therefore receive an explicit background.
// phpcs:disable WordPress.Security.EscapeOutput.ExceptionNotEscaped -- CLI-Testfehler, keine HTML-Ausgabe.
if ( PHP_SAPI !== 'cli' ) {
	exit;
}

$css = file_get_contents( __DIR__ . '/../assets/css/flz-ui-components.css' );

if ( false === $css ) {
	throw new RuntimeException( 'UI stylesheet could not be read.' );
}

foreach (
	array(
		'.flz-ui-admin-table > tbody > tr.flz-ui-editable-row.alternate > td',
		'.flz-ui-admin-table > tbody > tr.flz-ui-editable-row:not(.alternate) > td',
	) as $selector
) {
	if ( ! str_contains( $css, $selector ) ) {
		throw new RuntimeException( 'Editable-row striping selector is missing: ' . $selector );
	}
}

echo "OK: editable row striping contract\n";

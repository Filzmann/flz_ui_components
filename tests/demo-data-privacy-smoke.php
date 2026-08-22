<?php

if ( PHP_SAPI !== 'cli' ) {
	http_response_code( 404 );
	exit;
}

$source = file_get_contents( dirname( __DIR__ ) . '/includes/admin-demo.php' );
if ( false === $source ) {
	throw new RuntimeException( 'Die UI-Demo konnte nicht gelesen werden.' );
}

$forbidden = array(
	'@tagore-gymnasium.de',
	'https://tagore-gymnasium.de',
);

foreach ( $forbidden as $value ) {
	if ( str_contains( $source, $value ) ) {
		throw new RuntimeException( 'Die UI-Demo enthält reale Organisationsdaten statt reservierter Beispieldaten.' );
	}
}

if ( ! str_contains( $source, '@example.test' ) || ! str_contains( $source, 'https://example.test' ) ) {
	throw new RuntimeException( 'Die UI-Demo verwendet keine klar reservierten Beispieldaten.' );
}

echo "OK: flz_ui_components demo data privacy smoke test\n";

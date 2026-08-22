<?php

if ( PHP_SAPI !== 'cli' ) {
	http_response_code( 404 );
	exit;
}

define( 'ABSPATH', '/tmp/' );

require_once dirname( __DIR__ ) . '/includes/shortcode-blocks.php';

$fields = flz_ui_shortcode_block_editor_fields(
	array(
		'school_year' => array(
			'type'    => 'string',
			'default' => '2026/2027',
		),
	),
	array(
		'school_year' => array(
			'label'   => 'Schuljahr',
			'control' => 'select',
			'options' => array(
				'2026/2027' => '2026/2027',
				array( 'ungueltig' ),
				'2025/2026' => '2025/2026',
			),
		),
	)
);

if (
	count( $fields ) !== 1
	|| 'select' !== ( $fields[0]['control'] ?? '' )
	|| array(
		array( 'value' => '2026/2027', 'label' => '2026/2027' ),
		array( 'value' => '2025/2026', 'label' => '2025/2026' ),
	) !== ( $fields[0]['options'] ?? array() )
) {
	throw new RuntimeException( 'Der Shortcode-Block-Vertrag normalisiert Select-Optionen nicht korrekt.' );
}

$script = file_get_contents( dirname( __DIR__ ) . '/assets/js/flz-ui-shortcode-blocks.js' );
if (
	false === $script
	|| ! str_contains( $script, 'SelectControl' )
	|| ! str_contains( $script, "field.control === 'select'" )
) {
	throw new RuntimeException( 'Das Gutenberg-Script rendert Select-Felder nicht mit SelectControl.' );
}

echo "OK: flz_ui_components shortcode block select smoke test\n";

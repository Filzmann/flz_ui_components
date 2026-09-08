<?php

// phpcs:disable WordPress.Security.EscapeOutput.ExceptionNotEscaped
$root = dirname(__DIR__);
$header = file_get_contents($root . '/flz_ui_components.php');
preg_match('/Description:([^\n]+)/', $header, $description);
if (stripos($description[1] ?? '', 'tagore') !== false) {
	throw new RuntimeException('The plugin description is school-branded.');
}
foreach (array('includes/admin-demo.php', 'includes/shortcode-blocks.php') as $file) {
	$source = file_get_contents($root . '/' . $file);
	if (preg_match("/['\"][^'\"\n]*(Tagore-Plugins|Tagore \/ FLZ)[^'\"\n]*['\"]/", $source)) {
		throw new RuntimeException('Visible school branding remains in ' . $file);
	}
}
echo "OK: neutral UI description, demo intro and block category\n";

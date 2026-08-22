<?php

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

define('ABSPATH', __DIR__ . '/');

$GLOBALS['flz_ui_enqueued_styles'] = array();
$GLOBALS['flz_ui_enqueued_scripts'] = array();
$GLOBALS['flz_ui_registered_styles'] = array();
$GLOBALS['flz_ui_registered_scripts'] = array();

function plugin_dir_path(string $file): string
{
    return dirname($file) . '/';
}

function plugins_url(string $path = ''): string
{
    return 'https://example.test/plugins/' . ltrim($path, '/');
}

function add_action(): void {}
function add_filter(): void {}
function wp_register_style(string $handle): void
{
    $GLOBALS['flz_ui_registered_styles'][] = $handle;
}

function wp_register_script(string $handle): void
{
    $GLOBALS['flz_ui_registered_scripts'][] = $handle;
}

function wp_enqueue_style(string $handle): void
{
    $GLOBALS['flz_ui_enqueued_styles'][] = $handle;
}

function wp_enqueue_script(string $handle): void
{
    $GLOBALS['flz_ui_enqueued_scripts'][] = $handle;
}

require dirname(__DIR__) . '/flz_ui_components.php';

if (!empty($GLOBALS['flz_ui_enqueued_styles']) || !empty($GLOBALS['flz_ui_enqueued_scripts'])) {
    throw new RuntimeException('FLZ-Assets wurden ohne tatsächlichen Komponentenbedarf enqueued.');
}

flz_ui();
if (array('flz-ui-components') !== $GLOBALS['flz_ui_enqueued_styles']) {
    throw new RuntimeException('Der Rendererbedarf enqueued das FLZ-Stylesheet nicht genau einmal.');
}
if (array('flz-ui-components') !== $GLOBALS['flz_ui_enqueued_scripts']) {
    throw new RuntimeException('Der Rendererbedarf enqueued das FLZ-Script nicht genau einmal.');
}

flz_ui();
if (1 !== count($GLOBALS['flz_ui_enqueued_styles']) || 1 !== count($GLOBALS['flz_ui_enqueued_scripts'])) {
    throw new RuntimeException('Wiederholter Rendererzugriff enqueued Assets mehrfach.');
}

echo "OK: flz_ui_components asset loading smoke test\n";

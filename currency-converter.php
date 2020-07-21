<?php

/**
 * WP-Currency-Converter
 *
 *
 * @package   WP-Currency-Converter
 * @author    SUPERUSER41
 * @license   GPL-3.0
 * @link      https://github.com/SUPERUSER41
 * @copyright 2019 SUPERUSER41
 *
 * @wordpress-plugin
 * Plugin Name:       WP-Currency-Converter
 * Plugin URI:        https://github.com/SUPERUSER41
 * Description:       Reactjs currency converter plugin for wordpress
 * Version:           1.0.0
 * Author:           SUPERUSER41
 * Author URI:        https://github.com/SUPERUSER41
 * Text Domain:       wp-currency-converter
 * License:           GPL-3.0
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path:       /languages
 */


namespace SUPERUSER41\CC;

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

define('WP_CURRENCY_CONVERTER_VERSION', '1.0.0');


/**
 * Autoloader
 *
 * @param string $class The fully-qualified class name.
 * @return void
 *
 *  * @since 1.0.0
 */
spl_autoload_register(function ($class) {

    // project-specific namespace prefix
    $prefix = __NAMESPACE__;

    // base directory for the namespace prefix
    $base_dir = __DIR__ . '/includes/';

    // does the class use the namespace prefix?
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        // no, move to the next registered autoloader
        return;
    }

    // get the relative class name
    $relative_class = substr($class, $len);

    // replace the namespace prefix with the base directory, replace namespace
    // separators with directory separators in the relative class name, append
    // with .php
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    // if the file exists, require it
    if (file_exists($file)) {
        require $file;
    }
});

/**
 * Initialize Plugin
 *
 * @since 1.0.0
 */
function init()
{
    $cc = Plugin::get_instance();
    $cc_shortcode = Shortcode::get_instance();
    $cc_admin = Admin::get_instance();
}
add_action('plugins_loaded', 'SUPERUSER41\\CC\\init');



/**
 * Register the widget
 *
 * @since 1.0.0
 */
function widget_init()
{
    return register_widget(new Widget);
}
add_action('widgets_init', 'SUPERUSER41\\CC\\widget_init');

/**
 * Register activation and deactivation hooks
 */
register_activation_hook(__FILE__, array('SUPERUSER41\\CC\\Plugin', 'activate'));
register_deactivation_hook(__FILE__, array('SUPERUSER41\\CC\\Plugin', 'deactivate'));

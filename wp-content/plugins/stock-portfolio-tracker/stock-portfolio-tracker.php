<?php
/**
 * Plugin Name: Stock Portfolio Tracker
 * Description: Advanced stock portfolio tracking plugin with real-time valuation, historical charts and key performance indicators.
 * Version: 1.0.0
 * Author: Financial Apps and Plugins <info@financialplugins.com>
 * Author URI: https://financialplugins.com
 * Plugin URI: https://financialplugins.com/products/stock-portfolio-tracker/
 * Purchase: https://codecanyon.net/user/financialtechnology/portfolio
 * Like: https://www.facebook.com/financialplugins/
 */

defined('ABSPATH') or die('Direct access is not allowed');

// define plugin root folder to be used by other classess
define('SPT_ROOT_DIR', dirname(__FILE__));

// register autoload function
spl_autoload_register(function ($className) {
    if (strpos($className,'StockPortfolioTracker') !== FALSE) {
        $classFileName = 'classes/' . str_replace('\\', '/', $className) . '.php';
        if (file_exists(__DIR__ . '/' . $classFileName))
            require_once $classFileName;
    }
});

// plugin activation hook
register_activation_hook(__FILE__, ['\\StockPortfolioTracker\\WPHelper', 'activate']);

// instantiate a new plugin instance
$plugin = new \StockPortfolioTracker\Plugin();
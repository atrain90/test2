<?php

namespace StockPortfolioTracker;

/**
 * Class WPHelper - helper functions
 * @package StockPortfolioTracker
 */
class WPHelper
{

    public static function activate()
    {
        self::checkPhpVersion();
        self::checkFolderPermissions();
        self::addOption();
        self::register();
    }

    /**
     * Check PHP version
     */
    public static function checkPhpVersion()
    {
        $errorMessage = NULL;

        // Check current PHP version against the min version required for the plugin to run
        if (version_compare(PHP_VERSION, Plugin::MIN_PHP_VERSION, '<')) {
            $errorMessage = sprintf('<p>PHP <b>%s+</b> is required to use <b>%s</b> plugin. You have <b>%s</b> installed.</p>', Plugin::MIN_PHP_VERSION, Plugin::NAME, PHP_VERSION);
        }

        if ($errorMessage) {
            wp_die(
                $errorMessage,
                Plugin::NAME . ': Activation Error',
                ['response' => 200, 'back_link' => TRUE]
            );
        }

        return;
    }

    public static function checkFolderPermissions()
    {
        $errorMessage = NULL;

        if (!is_writable(SPT_ROOT_DIR)) {
            $errorMessage = sprintf(
                'The plugin folder should be writable by the web server: <b>%s</b>', SPT_ROOT_DIR
            );
        }

        if ($errorMessage) {
            wp_die(
                $errorMessage,
                Plugin::NAME . ': Activation Error',
                ['response' => 200, 'back_link' => TRUE]
            );
        }

        return;
    }

    /**
     * Add config option
     */
    public static function addOption()
    {
        add_option(Plugin::OPTION_NAME, [
            'color'                 => 'blue',
            'firebase_api_key'      => '',
            'firebase_app_id'       => '',
            'firebase_sender_id'    => '',
            'firebase_auth'         => false,
            'locale'                => 'en_US',
            'thousands_separator'   => ',',
            'decimal_separator'     => '.',
            'enqueue_priority'      => 10,
            'ajax_method'           => 'post',
        ]);
    }

    public static function register()
    {
        wp_remote_post('https://financialplugins.com/api/installations/register', [
            'method'        => 'POST',
            'timeout'       => 10,
            'redirection'   => 5,
            'blocking'      => FALSE,
            'sslverify'     => FALSE,
            'headers'       => [
                'Content-type' => 'application/x-www-form-urlencoded'
            ],
            'body'          => [
                'hash'      => '96403bc60604e2ba0f1e1b39d14780b5',
                'version'   => Plugin::VERSION,
                'domain'    => site_url(),
                'info'      => [
                    'php' => PHP_VERSION
                ]
            ]
        ]);
    }
}
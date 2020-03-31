<?php

namespace StockPortfolioTracker;

/**
 * Class Plugin - WordPress plugin
 * @package StockPortfolioTracker
 */
class Plugin
{
    const VERSION               = '1.0.0';
    const MIN_PHP_VERSION       = '5.6.0';
    const CODE                  = 'spt';
    const ID                    = 'stock-portfolio-tracker';
    const SHORT_NAME            = 'Stock Portfolio Tracker';
    const NAME                  = 'Stock Portfolio Tracker';
    const SHORTCODE             = 'stock_portfolio_tracker';
    const OPTION_NAME           = 'spt_settings';
    const JS_GLOBAL_VAR_NAME    = 'StockPortfolioTracker';

    private $pluginDir;
    private $pluginUrl;
    private $ajaxUrl;
    private $ajaxNonce;
    private $ajaxMethod;
    private $jsGlobalVariable;

    // note that constructor can be called multiple times during page load, due to possibly multiple AJAX requests
    function __construct()
    {
        $this->pluginDir = SPT_ROOT_DIR;
        $this->pluginUrl = plugins_url() . '/' . self::ID; // on SSL enabled websites WP_PLUGIN_URL still contains plain HTTP protocol, so it using function instead
        $this->ajaxUrl = admin_url('admin-ajax.php');
        $this->ajaxMethod = $this->getSetting('ajax_method');

        add_shortcode(self::SHORTCODE, [$this, 'shortcode']);

        add_action('init', [$this, 'init']);
        add_action('wp_enqueue_scripts', [$this, 'loadAssets'], $this->getSetting('enqueue_priority'));
        add_action('admin_menu', [$this, 'addAdminMenu']);

        $this->addAjaxHandler('GetMarketData');
        $this->addAjaxHandler('GetMarketData', TRUE);
    }

    /**
     * Init function
     */
    public function init()
    {
        // nonce for AJAX requests
        $this->ajaxNonce = wp_create_nonce(__DIR__);

        // load translation files
        load_plugin_textdomain(self::ID, false, self::ID . '/languages');

        // it's important to call translation functions AFTER load_plugin_textdomain() is called, otherwise translations will not work
        $this->jsGlobalVariable = [
            'id'                    => self::ID,
            'code'                  => self::CODE,
            'pluginUrl'             => $this->pluginUrl,
            'ajaxUrl'               => $this->ajaxUrl,
            'ajaxMethod'            => $this->ajaxMethod,
            'ajaxNonce'             => $this->ajaxNonce,
            'color'                 => $this->getSetting('color'),
            'locale'                => $this->getSetting('locale'),
            'thousandsSeparator'    => $this->getSetting('thousands_separator'),
            'decimalSeparator'      => $this->getSetting('decimal_separator'),
            'firebase' => [
                'apiKey'    => $this->getSetting('firebase_api_key'),
                'appId'     => $this->getSetting('firebase_app_id'),
                'senderId'  => $this->getSetting('firebase_sender_id'),
                'auth'      => $this->getSetting('firebase_auth'),
            ],
            'text' => [
                'number_b' => esc_html__('b', 'stock-portfolio-tracker'),
                'number_k' => esc_html__('k', 'stock-portfolio-tracker'),
                'number_m' => esc_html__('m', 'stock-portfolio-tracker'),
                'number_t' => esc_html__('b', 'stock-portfolio-tracker'),
                // ------------------------------------------------------
                'Are you sure you want to delete this portfolio and all related data?' => esc_html__('Are you sure you want to delete this portfolio and all related data?', 'stock-portfolio-tracker'),
                'Are you sure you want to delete this transaction?' => esc_html__('Are you sure you want to delete this transaction?', 'stock-portfolio-tracker'),
                'Asset' => esc_html__('Asset', 'stock-portfolio-tracker'),
                'Asset with the greatest total P/L' => esc_html__('Asset with the greatest total P/L', 'stock-portfolio-tracker'),
                'Asset with the lowest total P/L' => esc_html__('Asset with the lowest total P/L', 'stock-portfolio-tracker'),
                'Best' => esc_html__('Best', 'stock-portfolio-tracker'),
                'By investment' => esc_html__('By investment', 'stock-portfolio-tracker'),
                'By market value' => esc_html__('By market value', 'stock-portfolio-tracker'),
                'Cancel' => esc_html__('Cancel', 'stock-portfolio-tracker'),
                'Close transaction' => esc_html__('Close transaction', 'stock-portfolio-tracker'),
                'Closed' => esc_html__('Closed', 'stock-portfolio-tracker'),
                'Composition' => esc_html__('Composition', 'stock-portfolio-tracker'),
                'Copy' => esc_html__('Copy', 'stock-portfolio-tracker'),
                'Cost' => esc_html__('Cost', 'stock-portfolio-tracker'),
                'Create' => esc_html__('Create', 'stock-portfolio-tracker'),
                'Create portfolio' => esc_html__('Create portfolio', 'stock-portfolio-tracker'),
                'Create transaction' => esc_html__('Create transaction', 'stock-portfolio-tracker'),
                'Currency' => esc_html__('Currency', 'stock-portfolio-tracker'),
                'Date' => esc_html__('Date', 'stock-portfolio-tracker'),
                'Delete' => esc_html__('Delete', 'stock-portfolio-tracker'),
                'Delete transaction' => esc_html__('Delete transaction', 'stock-portfolio-tracker'),
                'Description' => esc_html__('Description', 'stock-portfolio-tracker'),
                'Disable sharing' => esc_html__('Disable sharing', 'stock-portfolio-tracker'),
                'Edit' => esc_html__('Edit', 'stock-portfolio-tracker'),
                'Edit portfolio' => esc_html__('Edit portfolio', 'stock-portfolio-tracker'),
                'Edit transaction' => esc_html__('Edit transaction', 'stock-portfolio-tracker'),
                'Email' => esc_html__('Email', 'stock-portfolio-tracker'),
                'Error' => esc_html__('Error', 'stock-portfolio-tracker'),
                'Get shareable link' => esc_html__('Get shareable link', 'stock-portfolio-tracker'),
                'Home page' => esc_html__('Home page', 'stock-portfolio-tracker'),
                'Incognito' => esc_html__('Incognito', 'stock-portfolio-tracker'),
                'Investment' => esc_html__('Investment', 'stock-portfolio-tracker'),
                'Log in' => esc_html__('Log in', 'stock-portfolio-tracker'),
                'Log out' => esc_html__('Log out', 'stock-portfolio-tracker'),
                'Market Value' => esc_html__('Market Value', 'stock-portfolio-tracker'),
                'Market value' => esc_html__('Market value', 'stock-portfolio-tracker'),
                'Max historical market value of the portfolio' => esc_html__('Max historical market value of the portfolio', 'stock-portfolio-tracker'),
                'Max value' => esc_html__('Max value', 'stock-portfolio-tracker'),
                'Menu' => esc_html__('Menu', 'stock-portfolio-tracker'),
                'Min historical market value of the portfolio' => esc_html__('Min historical market value of the portfolio', 'stock-portfolio-tracker'),
                'Min value' => esc_html__('Min value', 'stock-portfolio-tracker'),
                'New portfolio' => esc_html__('New portfolio', 'stock-portfolio-tracker'),
                'New transaction' => esc_html__('New transaction', 'stock-portfolio-tracker'),
                'No closed transactions' => esc_html__('No closed transactions', 'stock-portfolio-tracker'),
                'No open transactions' => esc_html__('No open transactions', 'stock-portfolio-tracker'),
                'No portfolios' => esc_html__('No portfolios', 'stock-portfolio-tracker'),
                'No transactions' => esc_html__('No transactions', 'stock-portfolio-tracker'),
                'Nothing is found' => esc_html__('Nothing is found', 'stock-portfolio-tracker'),
                'Open' => esc_html__('Open', 'stock-portfolio-tracker'),
                'Other people will be able to view your portfolio using the link below.' => esc_html__('Other people will be able to view your portfolio using the link below.', 'stock-portfolio-tracker'),
                'P/L' => esc_html__('P/L', 'stock-portfolio-tracker'),
                'P/L %' => esc_html__('P/L %', 'stock-portfolio-tracker'),
                'Password' => esc_html__('Password', 'stock-portfolio-tracker'),
                'Performance' => esc_html__('Performance', 'stock-portfolio-tracker'),
                'Portfolio sharing' => esc_html__('Portfolio sharing', 'stock-portfolio-tracker'),
                'Portfolios' => esc_html__('Portfolios', 'stock-portfolio-tracker'),
                'Price' => esc_html__('Price', 'stock-portfolio-tracker'),
                'Purchase Date' => esc_html__('Purchase Date', 'stock-portfolio-tracker'),
                'Purchase Price' => esc_html__('Purchase Price', 'stock-portfolio-tracker'),
                'Quantity' => esc_html__('Quantity', 'stock-portfolio-tracker'),
                'ROI' => esc_html__('ROI', 'stock-portfolio-tracker'),
                'Real-time valuation and analytics' => esc_html__('Real-time valuation and analytics', 'stock-portfolio-tracker'),
                'Realized P/L' => esc_html__('Realized P/L', 'stock-portfolio-tracker'),
                'Reset password' => esc_html__('Reset password', 'stock-portfolio-tracker'),
                'Return' => esc_html__('Return', 'stock-portfolio-tracker'),
                'Return on investment' => esc_html__('Return on investment', 'stock-portfolio-tracker'),
                'Save' => esc_html__('Save', 'stock-portfolio-tracker'),
                'Sell Date' => esc_html__('Sell Date', 'stock-portfolio-tracker'),
                'Sell Price' => esc_html__('Sell Price', 'stock-portfolio-tracker'),
                'Sell asset (close transaction)' => esc_html__('Sell asset (close transaction)', 'stock-portfolio-tracker'),
                'Share' => esc_html__('Share', 'stock-portfolio-tracker'),
                'Sign up' => esc_html__('Sign up', 'stock-portfolio-tracker'),
                'Something is wrong' => esc_html__('Something is wrong', 'stock-portfolio-tracker'),
                'Standard deviation of daily portfolio returns' => esc_html__('Standard deviation of daily portfolio returns', 'stock-portfolio-tracker'),
                'Start by adding a transaction' => esc_html__('Start by adding a transaction', 'stock-portfolio-tracker'),
                'Start by creating one' => esc_html__('Start by creating one', 'stock-portfolio-tracker'),
                'Stock Portfolio Tracker' => esc_html__('Stock Portfolio Tracker', 'stock-portfolio-tracker'),
                'Submit' => esc_html__('Submit', 'stock-portfolio-tracker'),
                'Summary' => esc_html__('Summary', 'stock-portfolio-tracker'),
                'This portfolio is private.' => esc_html__('This portfolio is private.', 'stock-portfolio-tracker'),
                'Title' => esc_html__('Title', 'stock-portfolio-tracker'),
                'Total Market Value' => esc_html__('Total Market Value', 'stock-portfolio-tracker'),
                'Total P/L' => esc_html__('Total P/L', 'stock-portfolio-tracker'),
                'Total cost' => esc_html__('Total cost', 'stock-portfolio-tracker'),
                'Total value of investment in a particular asset' => esc_html__('Total value of investment in a particular asset', 'stock-portfolio-tracker'),
                'Transactions' => esc_html__('Transactions', 'stock-portfolio-tracker'),
                'Unrealized P/L' => esc_html__('Unrealized P/L', 'stock-portfolio-tracker'),
                'View' => esc_html__('View', 'stock-portfolio-tracker'),
                'Volatility' => esc_html__('Volatility', 'stock-portfolio-tracker'),
                'Worst' => esc_html__('Worst', 'stock-portfolio-tracker'),
                'You can sell up to {0} {1}' => esc_html__('You can sell up to {0} {1}', 'stock-portfolio-tracker'),
            ]
        ];
    }

    /**
     * Load assets for public users
     */
    public function loadAssets()
    {
        $this->loadStyle(self::CODE . '-plugin-style', 'assets/dist/scheme-' . $this->getSetting('color') . '.css');
        $this->loadScript(self::CODE . '-plugin-main', 'assets/dist/app.js', [], TRUE);
        $this->localizeScript(self::CODE . '-plugin-main', self::JS_GLOBAL_VAR_NAME, $this->jsGlobalVariable);
    }

    /**
     * Process shortcode into HTML
     *
     * @param shortcode params
     * @return shortcode HTML
     */
    public function shortcode($shortcode)
    {
        if (is_array($shortcode)) {
            // transform shortcode array into key="value" string
            $shortcodeParams = implode(' ', array_map(function ($value, $key) {
                return $key . '="' . $value . '"';
            }, array_values($shortcode), array_keys($shortcode)));
        } else {
            $shortcodeParams = '';
        }

        return '<div id="' . self::ID . '" ' . $shortcodeParams . '></div>';
    }

    /**
     * Get market data
     */
    public function ajaxGetMarketData()
    {
        check_ajax_referer(__DIR__, 'nonce');
        print (new MarketData($_REQUEST))->get();
        wp_die();
    }

    /**
     * Enqueue style
     * @param $code
     * @param $filePath
     * @param array $dependencies
     */
    private function loadStyle($code, $filePath, $dependencies = [])
    {
        wp_enqueue_style($code, substr($filePath, 0, 4) != 'http' ? $this->pluginUrl . '/' . $filePath : $filePath, $dependencies, self::VERSION);
    }

    /**
     * Enqueue JavaScript
     * @param $code
     * @param $filePath
     * @param array $dependencies
     * @param bool|FALSE $inFooter
     */
    private function loadScript($code, $filePath = NULL, $dependencies = [], $inFooter = FALSE)
    {
        // load minified file if it exists and debug mode is turned off, otherwise load normal JS file
        if ($filePath) {
            wp_enqueue_script($code, substr($filePath, 0, 4) != 'http' ? $this->pluginUrl . '/' . $filePath : $filePath, $dependencies, self::VERSION, $inFooter);
        } else {
            // enqueue built-in script like jQuery UI, underscore etc
            wp_enqueue_script($code);
        }
    }

    /**
     * Add custom JavaScript variables
     * @param $code
     * @param $objectName
     * @param $objectProperties
     */
    private function localizeScript($code, $objectName, $objectProperties)
    {
        wp_localize_script($code, $objectName, $objectProperties);
    }

    /**
     * Add custom plugin menu and sub menu items
     */
    public function addAdminMenu()
    {
        add_menu_page(self::SHORT_NAME, self::SHORT_NAME, 'install_plugins', self::ID, [$this, 'displayPluginSettingsPage'], $this->pluginUrl . '/assets/images/icon.png');
    }

    public function displayPluginSettingsPage()
    {
        $settingsSaved = FALSE;

        if (!empty($_POST)) {
            // save settings
            $settingsSaved = update_option(self::OPTION_NAME, [
                'color' => isset($_POST['color']) ? $_POST['color'] : '',
                'firebase_api_key' => isset($_POST['firebase_api_key']) ? $_POST['firebase_api_key'] : '',
                'firebase_app_id' => isset($_POST['firebase_app_id']) ? $_POST['firebase_app_id'] : '',
                'firebase_sender_id' => isset($_POST['firebase_sender_id']) ? $_POST['firebase_sender_id'] : '',
                'firebase_auth' => isset($_POST['firebase_auth']) ? $_POST['firebase_auth'] == 'on' : false,
                'locale' => isset($_POST['locale']) ? $_POST['locale'] : '',
                'thousands_separator' => isset($_POST['thousands_separator']) ? $_POST['thousands_separator'] : '',
                'decimal_separator' => isset($_POST['decimal_separator']) ? $_POST['decimal_separator'] : '',
                'enqueue_priority' => isset($_POST['enqueue_priority']) ? $_POST['enqueue_priority'] : 10,
                'ajax_method' => isset($_POST['ajax_method']) ? $_POST['ajax_method'] : '',
            ]);
        }

        require_once($this->pluginDir . '/admin/settings.php');
    }

    /**
     * Add AJAX handler
     * @param $name - name of the handler. Public function ajax$name should also be added
     * @param bool|FALSE $public
     */
    private function addAjaxHandler($name, $public = FALSE)
    {
        // e.g. AJAX action will look like smwDisplayWidgetPreview
        add_action('wp_ajax_' . ($public ? 'nopriv_' : '') . self::CODE . $name, [$this, 'ajax' . $name]);
    }

    private function getSetting($name)
    {
        $option = get_option(self::OPTION_NAME); // these calls are cached by WP
        return isset($option[$name]) ? $option[$name] : NULL;
    }
}

?>
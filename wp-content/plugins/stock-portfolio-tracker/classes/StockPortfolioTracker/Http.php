<?php


namespace StockPortfolioTracker;

class Http
{
    private $url;

    public function __construct($url)
    {
        $this->url = $url;
    }

    public function get()
    {
        if (function_exists('wp_remote_get')) {
            $response = wp_remote_get($this->url);
            // check if there is no error in the HTTP request / response
            if (!$response instanceof \WP_Error && isset($response['body'])) {
                return json_decode(Helper::cleanString($response['body']));
            } else {
                Helper::log(sprintf('WP Remote Error: %s', $response->get_error_message()));
                return NULL;
            }
        } elseif (ini_get('allow_url_fopen')) {
            return json_decode(Helper::cleanString(@file_get_contents($this->url)));
        } else {
            return [
                'error' => 'Please set allow_url_fopen = On in PHP settings.'
            ];
        }
    }
}
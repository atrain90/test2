<?php
if ( ! defined( 'ABSPATH' ) ) exit;


class UM_Activity_API {
    private static $instance;

    static public function instance() {
        if ( is_null( self::$instance ) ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

	function __construct() {

        // Global for backwards compatibility.
        $GLOBALS['um_activity'] = $this;
        add_filter( 'um_call_object_Activity_API', array( &$this, 'get_this' ) );

        $this->api();
        $this->admin();
        $this->shortcode();
        $this->enqueue();

        add_action( 'init', array( &$this, 'create_post_type' ), 2 );
		add_action( 'plugins_loaded', array( &$this, 'init' ), 0 );

		require_once um_activity_path . 'includes/core/um-activity-widget.php';
		add_action( 'widgets_init', array(&$this, 'widgets_init' ) );

        add_filter( 'um_settings_default_values', array( &$this, 'default_settings' ), 10, 1 );
        add_filter( 'um_excluded_taxonomies', array( &$this, 'excluded_taxonomies' ), 10, 1 );
    }


    function default_settings( $defaults ) {
        $defaults = array_merge( $defaults, $this->setup()->settings_defaults );
        return $defaults;
    }

    function excluded_taxonomies( $taxes ) {
        $taxes[] = 'um_hashtag';
        return $taxes;
    }


    /**
     * @return um_ext\um_social_activity\core\Activity_Setup()
     */
    function setup() {
        if ( empty( UM()->classes['um_activity_setup'] ) ) {
            UM()->classes['um_activity_setup'] = new um_ext\um_social_activity\core\Activity_Setup();
        }
        return UM()->classes['um_activity_setup'];
    }


    function get_this() {
        return $this;
    }


    /***
     ***	@creates a post type
     ***/
    function create_post_type() {

        register_post_type( 'um_activity', array(
                'labels' => array(
                    'name' => __( 'Social Activity' ),
                    'singular_name' => __( 'Social Activity' ),
                    'add_new' => __( 'Add New Post' ),
                    'add_new_item' => __('Add New Post' ),
                    'edit_item' => __('Edit Post'),
                    'not_found' => __('No wall posts have been added yet'),
                    'not_found_in_trash' => __('Nothing found in Trash'),
                    'search_items' => __('Search Posts')
                ),
                'public' => false,
                'supports' => array('editor'),
                'taxonomies' => array('um_hashtag'),
                'show_ui' => true,
                'show_in_menu' => false,

            )
        );

        // Add new taxonomy, NOT hierarchical (like tags)
        $labels = array(
            'name'                       => _x( 'Hashtags', 'taxonomy general name' ),
            'singular_name'              => _x( 'Hashtag', 'taxonomy singular name' ),
            'search_items'               => __( 'Search Hashtags' ),
            'popular_items'              => __( 'Popular Hashtags' ),
            'all_items'                  => __( 'All Hashtags' ),
            'parent_item'                => null,
            'parent_item_colon'          => null,
            'edit_item'                  => __( 'Edit Hashtag' ),
            'update_item'                => __( 'Update Hashtag' ),
            'add_new_item'               => __( 'Add New Hashtag' ),
            'new_item_name'              => __( 'New Hashtag Name' ),
            'separate_items_with_commas' => __( 'Separate hashtags with commas' ),
            'add_or_remove_items'        => __( 'Add or remove hashtags' ),
            'choose_from_most_used'      => __( 'Choose from the most used hashtags' ),
            'not_found'                  => __( 'No hashtags found.' ),
            'menu_name'                  => __( 'Hashtags' ),
        );

        $args = array(
            'hierarchical'          => false,
            'labels'                => $labels,
            'show_ui'               => true,
            'show_admin_column'     => false,
            'update_count_callback' => '_update_post_term_count',
            'query_var'             => false,
            'rewrite'               => array( 'slug' => 'hashtag' ),
            'show_in_menu' 			=> false,
        );

        register_taxonomy( 'um_hashtag', 'um_activity', $args );

    }


    /**
     * @return um_ext\um_social_activity\core\Activity_Main_API()
     */
    function api() {
        if ( empty( UM()->classes['um_activity_api'] ) ) {
            UM()->classes['um_activity_api'] = new um_ext\um_social_activity\core\Activity_Main_API();
        }
        return UM()->classes['um_activity_api'];
    }


    /**
     * @return um_ext\um_social_activity\core\Activity_Shortcode()
     */
    function shortcode() {
        if ( empty( UM()->classes['um_activity_shortcode'] ) ) {
            UM()->classes['um_activity_shortcode'] = new um_ext\um_social_activity\core\Activity_Shortcode();
        }
        return UM()->classes['um_activity_shortcode'];
    }


    /**
     * @return um_ext\um_social_activity\core\Activity_Enqueue()
     */
    function enqueue() {
        if ( empty( UM()->classes['um_activity_enqueue'] ) ) {
            UM()->classes['um_activity_enqueue'] = new um_ext\um_social_activity\core\Activity_Enqueue();
        }
        return UM()->classes['um_activity_enqueue'];
    }


    /**
     * @return um_ext\um_social_activity\core\Activity_Admin()
     */
    function admin() {
        if ( empty( UM()->classes['um_activity_admin'] ) ) {
            UM()->classes['um_activity_admin'] = new um_ext\um_social_activity\core\Activity_Admin();
        }
        return UM()->classes['um_activity_admin'];
    }


	/***
	***	@Init
	***/
	function init() {

		// Actions
		require_once um_activity_path . 'includes/core/actions/um-activity-admin.php';
		require_once um_activity_path . 'includes/core/actions/um-activity-webnotification.php';
		require_once um_activity_path . 'includes/core/actions/um-activity-actions.php';
		require_once um_activity_path . 'includes/core/actions/um-activity-footer.php';

		// Filters
		require_once um_activity_path . 'includes/core/filters/um-activity-rss.php';
		require_once um_activity_path . 'includes/core/filters/um-activity-settings.php';
		require_once um_activity_path . 'includes/core/filters/um-activity-privacy.php';
		require_once um_activity_path . 'includes/core/filters/um-activity-comments.php';
		require_once um_activity_path . 'includes/core/filters/um-activity-integrate-followers.php';
		require_once um_activity_path . 'includes/core/filters/um-activity-integrate-pressthis.php';
		require_once um_activity_path . 'includes/core/filters/um-activity-oembed.php';

	}

	function widgets_init() {
		register_widget( 'um_activity_trending_tags' );
	}

}

//create class var
add_action( 'plugins_loaded', 'um_init_activity', -10, 1 );
function um_init_activity() {
    if ( function_exists( 'UM' ) ) {
        UM()->set_class( 'Activity_API', true );
    }
}
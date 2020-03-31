<?php
namespace um_ext\um_social_activity\core;

if ( ! defined( 'ABSPATH' ) ) exit;

class Activity_Enqueue {

	function __construct() {
	
		$priority = apply_filters( 'um_activity_enqueue_priority', 0 );
		
		add_action('wp_enqueue_scripts',  array(&$this, 'wp_enqueue_scripts'), $priority );

		add_filter( 'um_enqueue_localize_data',  array( &$this, 'localize_data' ), 10, 1 );
	
	}


	function localize_data( $data ) {

		$data['activity_load_wall'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_load_wall' );
		$data['activity_get_user_suggestions'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_get_user_suggestions' );
		$data['activity_remove_post'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_remove_post' );
		$data['activity_remove_comment'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_remove_comment' );
		$data['activity_get_post_likes'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_get_post_likes' );
		$data['activity_get_comment_likes'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_get_comment_likes' );
		$data['activity_hide_comment'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_hide_comment' );
		$data['activity_unhide_comment'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_unhide_comment' );
		$data['activity_report_post'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_report_post' );
		$data['activity_unreport_post'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_unreport_post' );
		$data['activity_load_more_comments'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_load_more_comments' );
		$data['activity_load_more_replies'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_load_more_replies' );
		$data['activity_like_comment'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_like_comment' );
		$data['activity_unlike_comment'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_unlike_comment' );
		$data['activity_like_post'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_like_post' );
		$data['activity_unlike_post'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_unlike_post' );
		$data['activity_wall_comment'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_wall_comment' );
		$data['activity_publish'] = UM()->get_ajax_route( 'um_ext\um_social_activity\core\Activity_Main_API', 'ajax_activity_publish' );

		return $data;

	}


	/**
	 * Enqueue scripts
	 */
	function wp_enqueue_scripts() {
		wp_register_style('um_activity', um_activity_url . 'assets/css/um-activity.css' );
		wp_enqueue_style('um_activity');

		wp_register_style('um_activity_responsive', um_activity_url . 'assets/css/um-activity-responsive.css' );
		wp_enqueue_style('um_activity_responsive');

		wp_register_script( 'um_autosize', um_activity_url . 'assets/js/autoresize-mod.jquery.js', array( 'jquery' ), um_activity_version, true );
		wp_register_script( 'um_activity', um_activity_url . 'assets/js/um-activity.js', array( 'jquery', 'jquery-ui-autocomplete','um_autosize' ), um_activity_version, true );
		wp_enqueue_script( 'um_activity' );
		
	}

}
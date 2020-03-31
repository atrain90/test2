<?php
if ( ! defined( 'ABSPATH' ) ) exit;


	/***
	***	@Wall privacy per user
	***/
	add_filter( "um_wall_can_view", 'um_wall_can_view_general', 10, 2 );
	function um_wall_can_view_general( $can_view, $profile_id ) {
		
		if ( ! is_user_logged_in() && UM()->options()->get( 'activity_require_login' ) )
			return __( 'You must login to view this user activity', 'um-activity' );
		
		if ( $profile_id == get_current_user_id() )
			return $can_view;
		
		$privacy = get_user_meta( $profile_id, 'wall_privacy', true );
		
		if ( $privacy == 1 && !is_user_logged_in() )
			return __('Please login to view this user\'s activity','um-activity');
		
		if ( $privacy == 2 && ( get_current_user_id() != $profile_id ) )
			return __('This user wall is private','um-activity');
			
		return $can_view;
	}
	
	/***
	***	@Extend privacy tab options
	***/
	add_filter('um_account_tab_privacy_fields', 'um_activity_account_privacy_fields', 10, 2);
	function um_activity_account_privacy_fields( $args, $shortcode_args ) {

        if ( isset( $shortcode_args['wall_privacy'] ) && 0 == $shortcode_args['wall_privacy'] )
            return $args;

        if ( UM()->options()->get( 'activity_enable_privacy' ) ) {
			$args = $args . ',wall_privacy';
		}

		return $args;
	}
	
	/***
	***	@Add field to control wall privacy
	***/
	add_filter('um_predefined_fields_hook', 'um_activity_account_privacy_fields_add');
	function um_activity_account_privacy_fields_add( $fields ) {
		
		$array =  array(
            0 => __('Public','um-activity'),
            1 => __('Members','um-activity'),
            2 => __('Only me','um-activity'),
        );
		
		$wall_privacy = apply_filters( 'um_activity_wall_privacy_dropdown_values', $array );
				
		$fields['wall_privacy'] = array(
				'title' => __('Who can see your activity wall?','um-activity'),
				'metakey' => 'wall_privacy',
				'type' => 'select',
				'label' => __('Who can see your activity wall?','um-activity'),
				'required' => 0,
				'public' => 1,
				'editable' => 1,
				'default' => 0,
				'options' => $wall_privacy,
				'options_pair' => 1,
				'allowclear' => 0,
				'account_only' => true,
		);

		$fields = apply_filters('um_account_secure_fields', $fields, 'wall_privacy' );

		return $fields;
	}


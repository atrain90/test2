<?php
if ( ! defined( 'ABSPATH' ) ) exit;


	/***
	***	@allow hashtags in comments
	***/
	add_filter('um_activity_comment_content_new', 'um_activity_comment_content_new', 10, 2 );
	function um_activity_comment_content_new( $content, $post_id ) {
        UM()->Activity_API()->api()->hashtagit( $post_id, $content, true );
		return $content;
	}
	
	/**
	 * Filter the comment title
	 * @param  string $title 
	 * @return string
	 * @uses  the_title filter hook
	 */
	add_filter('the_title','um_activity_recent_comments');
	function um_activity_recent_comments( $title ){

		if( is_numeric( $title ) ){
			$url = um_get_core_page( 'activity' );
			$url = add_query_arg( 'wallpost', $title );
			$title = __(sprintf("%s","a post "),'um-activity');
		}

		return $title;
	}

	/**
	 * Filter comment author link
	 * @param  string $link    
	 * @param  string $comment 
	 * @param  array $args    
	 * @param  array $cpage 
	 * 
	 * @uses  get_comment_link filter hook
	 *   
	 * @return string         
	 */
	add_filter('get_comment_link','um_activity_get_comment_author_link',999,4);
	function um_activity_get_comment_author_link( $link, $comment, $args, $cpage  ){
		if( strpos( $link, "/um_activity/") > -1  ){
			$arr_link = explode("/", $link );
			$post_id = isset( $arr_link[4] )? $arr_link[4]: 0;
			$url = um_get_core_page( 'activity' );
			$url = add_query_arg( 'wall_post' , $post_id , $url );
			$link = esc_url( $url );
		}
		return $link;
	}

	add_filter('widget_comments_args','um_activity_recent_comments_args');
	function um_activity_recent_comments_args( $args ){

		$args['type__not_in'] = array('um-social-activity');
		
		return $args;
	}

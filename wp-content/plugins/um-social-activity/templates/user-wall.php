<?php
global $core_page;
$args = array(
	'post_type' => 'um_activity',
	'posts_per_page' => ( UM()->mobile()->isMobile() ) ? UM()->options()->get('activity_posts_num_mob') : UM()->options()->get('activity_posts_num'),
	'post_status' => array('publish'),
);

if ( isset( $offset ) ) {
	$args['offset'] = $offset;
}

if ( isset( $user_wall ) && $user_wall ) {
    $args['author'] = sanitize_html_class( $user_id );
}

if ( isset( $wall_post ) && $wall_post > 0 ) {

	$args['post__in'] = array( $wall_post );

} else if ( isset( $hashtag ) && $hashtag ) {

	$args['tax_query'] = array( array( 'taxonomy' => 'um_hashtag','field' => 'slug','terms' => array ( $hashtag ) ));

} else if ( UM()->Activity_API()->api()->followed_ids() ) {

	$args['meta_query'][] = array('key' => '_user_id','value' => UM()->Activity_API()->api()->followed_ids(),'compare' => 'IN');

} elseif ( UM()->Activity_API()->api()->friends_ids() ) {
		
	$args['meta_query'][] = array('key' => '_user_id','value' => UM()->Activity_API()->api()->friends_ids(),'compare' => 'IN');

} else if( um_is_core_page('user') || ( isset( $core_page ) && $core_page == 'user' & defined( 'DOING_AJAX' ) )  ){

	$um_current_page_tab = get_query_var('profiletab');

	if( $um_current_page_tab == 'activity' && !defined( 'DOING_AJAX' ) ){
		unset( $args['author'] );

		$args['meta_query'][] = array(
								'relation'	=> 'OR',
								array(  'key' 		=> '_wall_id',
										'value' 	=> $user_id,
										'compare' 	=> '='
									),
								array(  'key' 		=> '_user_id',
										'value' 	=> $user_id,
										'compare' 	=> '='
								)
		);
	}
}

if ( isset( $user_wall ) && $user_wall && isset( $core_page ) && $core_page != 'user'  ) {
    $args['author'] = sanitize_html_class( $user_id );
}



/*******************************************************************/

$args = apply_filters('um_activity_wall_args', $args );

$wallposts = new WP_Query( $args );

if ( $wallposts->found_posts == 0 ) return;

	foreach( $wallposts->posts as $post ) {
	setup_postdata( $post );

	$author_id = UM()->Activity_API()->api()->get_author( $post->ID );
	$wall_id = UM()->Activity_API()->api()->get_wall( $post->ID );
	$post_link = UM()->Activity_API()->api()->get_permalink( $post->ID );
	um_fetch_user( $author_id );

	$can_view = apply_filters('um_wall_can_view', -1, $author_id);
	// exclude private walls
	if( $can_view >= 0 ) continue;

?>

<div class="um-activity-widget" id="postid-<?php echo $post->ID; ?>">

	<div class="um-activity-head">

		<div class="um-activity-left um-activity-author">
			<div class="um-activity-ava"><a href="<?php echo um_user_profile_url(); ?>"><?php echo get_avatar( $author_id, 80 ); ?></a></div>
			<div class="um-activity-author-meta">
				<div class="um-activity-author-url">
					<a href="<?php echo um_user_profile_url(); ?>" class="um-link"><?php echo um_user('display_name', 'html'); ?></a>
					<?php
					if ( $wall_id && $wall_id != $author_id ) {
						um_fetch_user( $wall_id );
						echo '<i class="um-icon-forward"></i>';
						echo '<a href="' . um_user_profile_url() . '" class="um-link">' . um_user('display_name'). '</a>';
					}
					?>
				</div>
				<span class="um-activity-metadata">
					<a href="<?php echo $post_link; ?>"><?php echo UM()->Activity_API()->api()->get_post_time( $post->ID ); ?></a>
				</span>
			</div>
		</div>

		<div class="um-activity-right">

			<?php if ( is_user_logged_in() ) { ?>

				<a href="#" class="um-activity-ticon um-activity-start-dialog" data-role="um-activity-tool-dialog"><i class="um-faicon-chevron-down"></i></a>

				<div class="um-activity-dialog um-activity-tool-dialog">

					<?php if ( ( current_user_can('edit_users') || $author_id == get_current_user_id() ) && ( UM()->Activity_API()->api()->get_action_type( $post->ID ) == 'status' ) ) { ?>
						<a href="#" class="um-activity-manage" data-cancel_text="<?php _e('Cancel editing','um-activity'); ?>" data-update_text="<?php _e('Update','um-activity'); ?>"><?php _e('Edit','um-activity'); ?></a>
					<?php } ?>

					<?php if ( current_user_can('edit_users') || $author_id == get_current_user_id() ) { ?>
						<a href="#" class="um-activity-trash" data-msg="<?php _e('Are you sure you want to delete this post?','um-activity'); ?>"><?php _e('Delete','um-activity'); ?></a>
					<?php } ?>

					<?php if ( $author_id != get_current_user_id() ) { ?>
						<span class="sep"></span>
						<a href="#" class="um-activity-report <?php if ( UM()->Activity_API()->api()->reported( $post->ID ) ) echo 'flagged'; ?>" data-report="<?php _e('Report','um-activity'); ?>" data-cancel_report="<?php _e('Cancel report','um-activity'); ?>">
							<?php echo ( UM()->Activity_API()->api()->reported( $post->ID, get_current_user_id() ) ) ? __('Cancel report','um-activity') : __('Report','um-activity'); ?></a>
					<?php } ?>

				</div>

			<?php } ?>

		</div>

		<div class="um-clear"></div>

	</div>

	<?php $has_video = UM()->Activity_API()->api()->get_video( $post->ID ); ?>
	<?php $has_text_video = get_post_meta( $post->ID , '_video_url', true ); ?>
	<?php $has_oembed = get_post_meta( $post->ID , '_oembed', true ); ?>
	<div class="um-activity-body">
		<div class="um-activity-bodyinner<?php if( $has_video || $has_text_video ){ echo ' has-embeded-video'; } ?> <?php if( $has_oembed ){ echo ' has-oembeded'; } ?>">
			<div class="um-activity-bodyinner-edit">
				<textarea style="display: none;"><?php echo esc_attr( get_post_meta( $post->ID, '_original_content', true ) ); ?></textarea>
				<input type="hidden" name="_photo_" id="_photo_" value="<?php echo get_post_meta( $post->ID, '_photo', true ); ?>" />
			</div>
			
			<?php $um_activity_post = UM()->Activity_API()->api()->get_content( $post->ID,$has_video ); ?>
			<?php $um_shared_link = get_post_meta( $post->ID, '_shared_link', true ); ?>
			<?php if ( $um_activity_post || $um_shared_link ) { ?>
				<div class="um-activity-bodyinner-txt">
					<?php echo $um_activity_post; ?>
					<?php echo $um_shared_link; ?>
				</div>
			<?php } ?>

			<div class="um-activity-bodyinner-photo">
				<?php echo UM()->Activity_API()->api()->get_photo( $post->ID ); ?>
			</div>
			<?php if( empty( $um_shared_link ) ){ ?>
			<div class="um-activity-bodyinner-video">
				<?php echo $has_video; ?>
			</div>
			<?php } ?>
			

		</div>

		<?php

		$likes = UM()->Activity_API()->api()->get_likes_number( $post->ID );
		$comments = UM()->Activity_API()->api()->get_comments_number( $post->ID );
		if ( $likes > 0 || $comments > 0 ) {

		?>
		<div class="um-activity-disp">
			<div class="um-activity-left"><div class="um-activity-disp-likes"><a href="#" class="um-activity-show-likes um-link" data-post_id="<?php echo $post->ID; ?>"><span class="um-activity-post-likes"><?php echo $likes; ?></span><span class="um-activity-disp-span"><?php _e('likes','um-activity'); ?></span></a></div><div class="um-activity-disp-comments"><a href="#" class="um-link"><span class="um-activity-post-comments"><?php echo $comments; ?></span><span class="um-activity-disp-span"><?php _e('comments','um-activity'); ?></span></a></div></div>
			<div class="um-activity-faces um-activity-right">
				<?php echo UM()->Activity_API()->api()->get_faces( $post->ID ); ?>
			</div>
			<div class="um-clear"></div>
		</div><div class="um-clear"></div>
		<?php } ?>

	</div>

	<div class="um-activity-foot status" id="wallcomments-<?php echo $post->ID; ?>">

		<?php if ( is_user_logged_in() ) { ?>

		<div class="um-activity-left um-activity-actions">
			<?php if ( UM()->Activity_API()->api()->user_liked( $post->ID ) ) { ?>
			<div class="um-activity-like active" data-like_text="<?php _e('Like','um-activity'); ?>" data-unlike_text="<?php _e('Unlike','um-activity'); ?>"><a href="#"><i class="um-faicon-thumbs-up um-active-color"></i><span class=""><?php _e('Unlike','um-activity'); ?></span></a></div>
			<?php } else { ?>
			<div class="um-activity-like" data-like_text="<?php _e('Like','um-activity'); ?>" data-unlike_text="<?php _e('Unlike','um-activity'); ?>"><a href="#"><i class="um-faicon-thumbs-up"></i><span class=""><?php _e('Like','um-activity'); ?></span></a></div>
			<?php } ?>
			<?php if ( UM()->Activity_API()->api()->can_comment() ) { ?>
			<div class="um-activity-comment"><a href="#"><i class="um-faicon-comment"></i><span class=""><?php _e('Comment','um-activity'); ?></span></a></div>
			<?php } ?>
		</div>

		<?php } else { ?>
		<div class="um-activity-left um-activity-join"><?php echo UM()->Activity_API()->api()->login_to_interact( $post->ID ); ?></div>
		<?php } ?>

		<div class="um-clear"></div>

	</div>

	<?php UM()->Activity_API()->shortcode()->load_template('comments', $post->ID ); ?>

</div>

<?php }

wp_reset_postdata(); ?>

<div class="um-activity-load"></div>

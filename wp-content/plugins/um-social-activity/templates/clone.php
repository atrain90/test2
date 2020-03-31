<?php global $user_ID; ?>
<?php um_fetch_user( $user_ID ); ?>

<div class="um-activity-widget um-activity-clone">

	<div class="um-activity-head">

		<div class="um-activity-left um-activity-author">
			<div class="um-activity-ava"><a href="<?php echo um_user_profile_url(); ?>"><?php echo get_avatar( um_user('ID'), 80 ); ?></a></div>
			<div class="um-activity-author-meta">
				<div class="um-activity-author-url"><a href="<?php echo um_user_profile_url(); ?>" class="um-link"><?php echo um_user('display_name', 'html'); ?></a></div>
				<span class="um-activity-metadata">
					<a href=""><?php _e('Just now','um-activity'); ?></a>
				</span>
			</div>
		</div>
		
		<div class="um-activity-right">
		
			<?php if ( is_user_logged_in() ) { ?>

				<a href="#" class="um-activity-ticon um-activity-start-dialog" data-role="um-activity-tool-dialog"><i class="um-faicon-chevron-down"></i></a>
				
				<div class="um-activity-dialog um-activity-tool-dialog">
					
					<a href="#" class="um-activity-manage" data-cancel_text="<?php _e('Cancel editing','um-activity'); ?>" data-update_text="<?php _e('Update','um-activity'); ?>"><?php _e('Edit','um-activity'); ?></a>
					
					<a href="#" class="um-activity-trash" data-msg="<?php _e('Are you sure you want to delete this post?','um-activity'); ?>"><?php _e('Delete','um-activity'); ?></a>
				
				</div>

			<?php } ?>

		</div>
		
		<div class="um-clear"></div>
	
	</div>
	<?php 
	$has_video = null;
	$has_text_video = null; 
	$has_oembed = null;
	?>

	<?php if( isset( $post ) ){ ?>
	<?php $has_video = UM()->Activity_API()->api()->get_video( $post->ID ); ?>
	<?php $has_text_video = get_post_meta( $post->ID , '_video_url', true ); ?>
	<?php $has_oembed = get_post_meta( $post->ID , '_oembed', true ); ?>
	<?php } ?>

	<div class="um-activity-body">

		<div class="um-activity-bodyinner <?php if( $has_video || $has_text_video ){ echo ' has-embeded-video'; } ?> <?php if( $has_oembed ){ echo ' has-oembeded'; } ?>">
			
			
			<div class="um-activity-bodyinner-edit">
				<textarea style="display:none!important"></textarea>
				<input type="hidden" name="_photo_" id="_photo_" value="" />
			</div>
			
			<div class="um-activity-bodyinner-txt">
			
			</div>
			
			<div class="um-activity-bodyinner-photo">
			
			</div>

			<div class="um-activity-bodyinner-video">
			
			</div>
			

		</div>

	</div>
	
	<div class="um-activity-foot status">
	
		<div class="um-activity-left um-activity-actions">
			<div class="um-activity-like"><a href="#"><i class="um-faicon-thumbs-up"></i><span class=""><?php _e('Like','um-activity'); ?></span></a></div>
			<?php if ( UM()->Activity_API()->api()->can_comment() ) { ?>
			<div class="um-activity-comment"><a href="#"><i class="um-faicon-comment"></i><span class=""><?php _e('Comment','um-activity'); ?></span></a></div>
			<?php } ?>
		</div>
		<div class="um-clear"></div>
	
	</div>

	<?php UM()->Activity_API()->shortcode()->load_template('comments', 0); ?>
	
</div>
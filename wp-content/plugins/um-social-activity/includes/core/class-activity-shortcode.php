<?php
namespace um_ext\um_social_activity\core;

if ( ! defined( 'ABSPATH' ) ) exit;

class Activity_Shortcode {

	function __construct() {
	
		add_shortcode( 'ultimatemember_wall', array( &$this, 'ultimatemember_wall' ) );
		add_shortcode( 'ultimatemember_activity', array( &$this, 'ultimatemember_activity' ) );
		
		add_shortcode( 'ultimatemember_trending_hashtags', array( &$this, 'ultimatemember_trending_hashtags' ) );
		
		$this->args = array('');
	}


	/***
	***	@load a compatible template
	***/
	function load_template( $tpl, $post_id = 0 ) {
		if ( isset( $this->args ) && $this->args ) {
			$options = $this->args;
			extract( $this->args );
		} else {
			$options = '';
		}
		
		if ( $post_id ) {
			$post_link = UM()->Activity_API()->api()->get_permalink( $post_id );
		}
		
		$file = um_activity_path . 'templates/' . $tpl . '.php';
		$theme_file = get_stylesheet_directory() . '/ultimate-member/templates/activity/' . $tpl . '.php';

		if ( file_exists( $theme_file ) )
			$file = $theme_file;
			
		if ( file_exists( $file ) )
			include $file;
	}


	/***
	***	@Shortcode
	***/
	function ultimatemember_trending_hashtags( $args = array() ) {
		$defaults = array(
			'trending_days' => absint( UM()->options()->get('activity_trending_days') ),
			'number' => 10,
		);
		
		$args = wp_parse_args( $args, $defaults );

		/**
		 * @var $trending_days
		 */
		extract( $args );

		ob_start();

		global $wpdb;

		if ( isset( $trending_days ) ) {

			$term_ids = $wpdb->get_col( $wpdb->prepare(
				"SELECT term_id FROM $wpdb->term_taxonomy
				INNER JOIN $wpdb->term_relationships ON $wpdb->term_taxonomy.term_taxonomy_id = $wpdb->term_relationships.term_taxonomy_id
				INNER JOIN $wpdb->posts ON $wpdb->posts.ID = $wpdb->term_relationships.object_id
				WHERE $wpdb->posts.post_type = 'um_activity' AND 
					  $wpdb->term_taxonomy.taxonomy = 'um_hashtag' AND 
					  DATE_SUB( CURDATE(), INTERVAL %d DAY ) <= $wpdb->posts.post_date",
				$trending_days
			) );

			if ( count( $term_ids ) > 0 ) {

				 $hashtags = get_terms( array('um_hashtag'), array(
					'orderby' => 'count',
					'order'   => 'DESC',
					'number'  => $number,
					'include' => $term_ids,
				 ));

				$file = um_activity_path . 'templates/trending.php';
				$theme_file = get_stylesheet_directory() . '/ultimate-member/templates/activity/trending.php';

				if ( file_exists( $theme_file ) )
					$file = $theme_file;

				if ( file_exists( $file ) )
					include $file;

			}
		}

		$output = ob_get_contents();
		ob_end_clean();
		return $output;
	}


	/***
	***	@Shortcode
	***/
	function ultimatemember_wall( $args = array() ) {
		$defaults = array(
			'user_id' => get_current_user_id(),
			'hashtag' => ( isset( $_GET['hashtag'] ) ) ? esc_attr( wp_strip_all_tags( $_GET['hashtag'] ) ) : '',
			'wall_post' =>  ( isset( $_GET['wall_post'] ) ) ? absint( $_GET['wall_post'] ) : '',
			'user_wall' => 1
		);
		$args = wp_parse_args( $args, $defaults );
		extract( $args );
		$this->args = $args;

		ob_start();
		
		if ( UM()->Activity_API()->api()->can_write() && $wall_post == 0 && !$hashtag ) {
			$this->load_template('new');
		}
		
		$per_page = ( UM()->mobile()->isMobile() ) ? UM()->options()->get('activity_posts_num_mob') : UM()->options()->get('activity_posts_num');
		
		$um_current_page_tab = get_query_var('profiletab');

		$widget_class = '';
		if(  um_is_core_page('user') && $um_current_page_tab == 'activity' ){
			$widget_class = 'user';
		}else if(  um_is_core_page('activity')  ){
			$widget_class = 'activity';
		}else{
			$widget_class = "custom_page-{$um_current_page_tab}";
		}
		
		$is_single_post = false;
		if ( $wall_post  ) {
			$is_single_post = true;
		}	

		echo '<div class="um-activity-wall" data-hashtag="'.$hashtag.'" data-core_page="'.$widget_class.'" data-user_id="'. esc_attr( $user_id ) . '" data-user_wall="'. esc_attr( $user_wall ) . '" data-single_post="'.$is_single_post.'" data-per_page="' . $per_page . '">';
		
		$this->load_template('clone');
		$this->load_template('user-wall');
		
		echo '</div>';
		
		$output = ob_get_contents();
		ob_end_clean();
		return $output;
	}
	
	/***
	***	@Display activity
	***/
	function ultimatemember_activity( $args = array() ) {
		$defaults = array(
			'user_id' => get_current_user_id(),
			'hashtag' => ( isset( $_GET['hashtag'] ) ) ? esc_attr( wp_strip_all_tags( $_GET['hashtag'] ) ) : '',
			'wall_post' =>  ( isset( $_GET['wall_post'] ) ) ? absint( $_GET['wall_post'] ) : '',
			'template' => 'activity',
			'mode' => 'activity',
			'form_id' => 'um_activity_id',
			'user_wall' => 0
		);
		$args = wp_parse_args( $args, $defaults );
		$this->args = $args;

		if ( empty( $args['use_custom_settings'] ) ) {
			$args = array_merge( $args, UM()->shortcodes()->get_css_args( $args ) );
		} else {
			$args = array_merge( UM()->shortcodes()->get_css_args( $args ), $args );
		}
		
		extract( $args, EXTR_SKIP );
		
		ob_start();
		
		$per_page = ( UM()->mobile()->isMobile() ) ? UM()->options()->get('activity_posts_num_mob') : UM()->options()->get('activity_posts_num');
		
		?>
		
		<div class="um <?php echo UM()->shortcodes()->get_class( $mode ); ?> um-<?php echo $form_id; ?>">

			<div class="um-form">
			
				<?php
				if ( isset( $hashtag ) && $hashtag ) {
					$get_hashtag = get_term_by('slug', $hashtag, 'um_hashtag');
					if ( isset( $get_hashtag->name ) ) {
						echo '<div class="um-activity-bigtext">#' . $get_hashtag->name . '</div>';
					}
				}
				
				if ( UM()->Activity_API()->api()->can_write() ) {
					$this->load_template('new');
				}
				?>
				<?php 
					$um_current_page_tab = get_query_var('profiletab');

					$widget_class = '';
					if(  um_is_core_page('user') && $um_current_page_tab == 'activity' ){
						$widget_class = 'user';
					}else if(  um_is_core_page('activity')  ){
						$widget_class = 'activity';
					}else{
						$widget_class = "custom_page-{$um_current_page_tab}";
					}

					$is_single_post = false;
					if( $wall_post  ){
						$is_single_post = true;
					}	
				?>


				<div class="um-activity-wall" data-core_page="<?php echo $widget_class; ?>" data-user_id="<?php echo sanitize_html_class( $user_id ); ?>" data-user_wall="<?php echo sanitize_html_class( $user_wall ); ?>" data-per_page="<?php echo sanitize_html_class( $per_page ); ?>" data-single_post="<?php echo $is_single_post;?>" data-hashtag="<?php echo $hashtag; ?>">
				
					<?php $this->load_template('clone'); ?>
					<?php $this->load_template('user-wall'); ?>
		
				</div>
		
			</div>
			
		</div>

		<?php
		if ( !is_admin() && !defined( 'DOING_AJAX' ) ) {
			UM()->shortcodes()->dynamic_css( $args );
		}
		
		$output = ob_get_contents();
		ob_end_clean();
		return $output;
	}

}
Loadwall_ajax = false;

/* Load of posts */
jQuery(window).scroll(function () {

	if (jQuery('.um-activity-wall').length > 0
		&& jQuery(window).scrollTop() + jQuery(window).height() >= jQuery('.um-activity-wall').offset().top + jQuery('.um-activity-wall').height()
		// && jQuery('.um-activity-widget:not(.um-activity-new-post):visible').length >= jQuery('.um-activity-wall').attr('data-per_page')
		&& Loadwall_ajax == false
		&& jQuery('.um-activity-wall').attr('data-single_post') == false) {

		Loadwall_ajax = true;
		jQuery('.um-activity-load:last').show();

		user_id = jQuery('.um-activity-wall').attr('data-user_id');
		user_wall = jQuery('.um-activity-wall').attr('data-user_wall');
		hashtag = jQuery('.um-activity-wall').attr('data-hashtag');
		core_page = jQuery('.um-activity-wall').attr('data-core_page');

		jQuery.ajax({
			url: um_scripts.activity_load_wall,
			type: 'post',
			data: {
				offset: jQuery('.um-activity-widget:not(.um-activity-new-post):visible').length,
				user_id: user_id,
				user_wall: user_wall,
				hashtag: hashtag,
				core_page: core_page
			},
			success: function (data) {
				jQuery('.um-activity-load').hide();

				if (data == '') {
					Loadwall_ajax = true;
				} else {
					jQuery('.um-activity-wall').append(data);
					Loadwall_ajax = false;
				}

			},
			error: function (e) {
				console.log('UM Social Activity Error', e);
			}
		});
	}

});

/* Setup image upload */
function UM_wall_img_upload() {
	jQuery('.ajax-upload-dragdrop').remove();
	jQuery('.um-activity-insert-photo').each(function () {

		apu = jQuery(this);
		var formData = {
			key: 'wall_img_upload',
			set_id: 0,
			set_mode: 'wall',
			timestamp: apu.data('timestamp'),
			_wpnonce: apu.data('nonce'),
		};

		apu.uploadFile({
			url: um_scripts.imageupload,
			method: "POST",
			multiple: false,
			formData: formData,
			fileName: 'wall_img_upload',
			allowedTypes: apu.attr('data-allowed'),
			maxFileSize: 9999999,
			dragDropStr: '',
			sizeErrorStr: apu.attr('data-size-err'),
			extErrorStr: apu.attr('data-ext-err'),
			maxFileCountErrorStr: '',
			maxFileCount: 1,
			showDelete: false,
			showAbort: false,
			showDone: false,
			showFileCounter: false,
			showStatusAfterSuccess: true,
			onSubmit: function (files) {

				apu.parents('.um-activity-widget').find('.um-error-block').remove();
				apu.parents('.um-activity-widget').find('.um-activity-post').addClass('um-disabled');
				apu.parents('.um-activity-widget').find('.um-activity-preview').hide();
				apu.parents('.um-activity-widget').find('.um-activity-preview img').attr('src', '');
				apu.parents('.um-activity-widget').find('.um-activity-preview input[type=hidden]').val('');

			},
			onSuccess: function (files, data, xhr) {

				apu.selectedFiles = 0;
				data = jQuery.parseJSON(data);
				if (data.error && data.error != '') {

					apu.parents('.um-activity-widget').find('.um-activity-post').addClass('um-disabled');

					apu.parents('.um-activity-widget').find('.um-activity-textarea-elem').attr('placeholder', jQuery('.um-activity-textarea-elem').attr('data-ph'));

					apu.parents('.um-activity-widget').find('.upload-statusbar').prev('div').append('<div class="um-error-block">' + data.error + '</div>');
					apu.parents('.um-activity-widget').find('.upload-statusbar').remove();

				} else {

					apu.parents('.um-activity-widget').find('.um-activity-post').removeClass('um-disabled');

					apu.parents('.um-activity-widget').find('.um-activity-textarea-elem').attr('placeholder', jQuery('.um-activity-textarea-elem').attr('data-photoph'));

					apu.parents('.um-activity-widget').find('.upload-statusbar').remove();

					jQuery.each(data, function (key, value) {

						apu.parents('.um-activity-widget').find('.um-activity-preview').show();
						apu.parents('.um-activity-widget').find('.um-activity-preview img').attr('src', value);
						apu.parents('.um-activity-widget').find('.um-activity-preview input[type=hidden]').val(value);

					});

				}

			}
		});

	});
}

/* Show confirm box */
function UM_wall_confirmbox_show(post_id, msg, custclass) {
	var modal = jQuery('.um-activity-confirm');
	if (modal.is(':visible')) {

	} else {
		jQuery('.um-activity-confirm-m').html(msg);
		jQuery('.um-activity-confirm-o,.um-activity-confirm').show();
		jQuery('.um-activity-confirm').find('.um-activity-confirm-btn').addClass(custclass).attr('data-post_id', post_id);
	}
}

/* Hides confirm box */
function UM_wall_confirmbox_hide() {

	jQuery('.um-activity-confirm-o,.um-activity-confirm').hide();
}

/* Responsive confirm box */
function UM_wall_confirmbox_mobile() {
	var width = jQuery(window).width();
	if (width <= 500) {
		max_width = width;
		margin_left = 0;
		left = 0;
	} else {
		max_width = '400px';
		margin_left = '-200px';
		left = '50%';
	}
	jQuery('.um-activity-confirm').css({
		'top': (jQuery(window).height() - jQuery('.um-activity-confirm').height() ) / 2 + 'px',
		'width': max_width,
		'margin-left': margin_left,
		'left': left
	});
}

var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

function split(val) {
	return val.split(" ");
}

function extractLast(term) {
	return split(term).pop();
}

function UM_wall_autocomplete_start() {
	jQuery('textarea.um-activity-textarea-elem,textarea.um-activity-comment-textarea').each(function () {
		el = jQuery(this);

		if (typeof jQuery.ui === 'undefined') {
			return false;
		}

		var el_autocomplete = el.autocomplete({
			minLength: 1,
			source: function (request, response) {

				if (extractLast(request.term).charAt(0) == '@') {
					jQuery.getJSON(um_scripts.activity_get_user_suggestions + '?term=' + extractLast(request.term), function (data) {
						response(data);
					});
				}
			},
			select: function (event, ui) {

				ui.item.name = ui.item.name.replace('<strong>', '');
				ui.item.name = ui.item.name.replace('</strong>', '');

				var terms = split(this.value);
				terms.pop();
				terms.push('@' + ui.item.name);
				terms.push("");
				this.value = jQuery.trim(terms.join(" "));
				return false;

			}
		});

		if ( typeof el_autocomplete.data("ui-autocomplete") != 'undefined' ) {
			el_autocomplete.data("ui-autocomplete")._renderItem = function (ul, item) {
				return jQuery("<li />").data("item.autocomplete", item).append(item.photo + item.name + '<span>@' + item.username + '</span>').appendTo(ul);
			}
		}

	});
}

/* Resize function */
jQuery(window).resize(function () {
	UM_wall_confirmbox_mobile();
});

jQuery(document).ready(function () {

	if (jQuery('textarea.um-activity-textarea-elem').length) {

		UM_wall_autocomplete_start();

	}

	/* Scroll to wall post */
	var wall_post = getUrlParameter('wall_post');
	var wall_comment = getUrlParameter('wall_comment_id');

	if (wall_post > 0 && !wall_comment) {
		jQuery('body').scrollTo('#postid-' + parseInt(wall_post), 500, {
			offset: 0,
			onAfter: function () {
				jQuery('#postid-' + parseInt(wall_post)).addClass('highlighted');
			}
		});
	}

	if (wall_post > 0 && wall_comment > 0) {
		jQuery('body').scrollTo('#commentid-' + parseInt(wall_comment), 500, {
			offset: -10,
			onAfter: function () {
				jQuery('#commentid-' + parseInt(wall_comment)).addClass('highlighted');
			}
		});
	}

	/* Scroll to comments area */
	jQuery(document).on('click', '.um-activity-disp-comments', function (e) {
		e.preventDefault();
		var post_id = jQuery(this).parents('.um-activity-widget').attr('id').replace('postid-', '');
		jQuery('body').scrollTo('#wallcomments-' + parseInt(post_id), {duration: 200});
		return false;
	});

	/* Removes a post */
	jQuery(document).on('click', '.um-activity-confirm-removepost', function (e) {
		e.preventDefault();
		var el = jQuery(this);
		var post_id = el.attr('data-post_id');

		jQuery('.um-activity-widget#postid-' + post_id).hide();
		UM_wall_confirmbox_hide();

		jQuery.ajax({
			url: um_scripts.activity_remove_post,
			type: 'post',
			data: {post_id: post_id},
			success: function (data) {
			}
		});

		return false;
	});

	/* Removes a comment */
	jQuery(document).on('click', '.um-activity-confirm-removecomment', function (e) {
		e.preventDefault();
		var el = jQuery(this);
		var comment_id = el.attr('data-post_id');

		jQuery('.um-activity-commentl#commentid-' + comment_id).hide();

		UM_wall_confirmbox_hide();

		jQuery.ajax({
			url: um_scripts.activity_remove_comment,
			type: 'post',
			data: {comment_id: comment_id},
			success: function (data) {
			}
		});

		return false;
	});

	/* Trash post popup */
	jQuery(document).on('click', '.um-activity-trash', function (e) {
		e.preventDefault();
		var el = jQuery(this);
		var post_id = el.parents('.um-activity-widget').attr('id').replace('postid-', '');
		var msg = el.attr('data-msg');

		el.parents('.um-activity-dialog').hide();

		UM_wall_confirmbox_show(post_id, msg, 'um-activity-confirm-removepost');
		UM_wall_confirmbox_mobile();

		return false;
	});

	/* Trash comment popup */
	jQuery(document).on('click', '.um-activity-editc a.delete', function (e) {
		e.preventDefault();
		var el = jQuery(this);
		var post_id = el.parent().parent().parent().parent().parent().attr('id').replace('commentid-', '');
		var msg = el.attr('data-msg');
		el.parents('.um-activity-dialog').hide();

		UM_wall_confirmbox_show(post_id, msg, 'um-activity-confirm-removecomment');
		UM_wall_confirmbox_mobile();

		return false;
	});

	/* Reply to comment */
	jQuery(document).on('click', '.um-activity-editc a.edit', function (e) {
		e.preventDefault();
		if (!jQuery(this).parents('.um-activity-commentl').hasClass('unready')) {

			if (jQuery(this).parents('.um-activity-comment-info').find('.um-activity-comment-area').length > 0) {
				jQuery(this).parents('.um-activity-comment-info').find('.um-activity-comment-area').remove();
			}

			var cbox = jQuery(this).parents('.um-activity-comments').find('.um-activity-comment-area:first');
			var comment_id = jQuery(this).data('commentid');
			var cloned = cbox.clone();

			jQuery(this).parents('.um-activity-comment-info').find('.um-activity-editc-d').hide();
			jQuery(this).parents('.um-activity-comment-info').find('div').hide();
			jQuery('#commentid-' + comment_id).addClass('editing');

			cloned.css({'paddingTop': 0, 'paddingLeft': 0});
			cloned.find('.um-activity-comment-avatar').hide();
			cloned.appendTo(jQuery(this).parents('.um-activity-comment-info'));
			cloned.find('textarea').attr('data-commentid', comment_id)
				.attr('placeholder', cloned.find('textarea').attr('data-replytext'))
				.val(jQuery('#um-activity-reply-' + comment_id).val()).focus();
			UM_wall_autocomplete_start();

		}
		return false;
	});

	/* Hides confirm box */
	jQuery(document).on('click', '.um-activity-confirm-close,.um-activity-confirm-o', function (e) {
		e.preventDefault();
		UM_wall_confirmbox_hide();
		return false;
	});

	/* Hide modal view */
	jQuery(document).on('click', '.um-activity-modal-hide', function (e) {
		e.preventDefault();
		remove_Modal();
		return false;
	});

	/* Remove image upload */
	jQuery(document).on('click', '.um-activity-img-remove', function (e) {
		el = jQuery(this).parents('form');
		el.find('#_post_img').val('');
		el.find('.um-activity-preview img').attr('src', '');
		el.find('.um-activity-preview').hide();
		if (el.find('textarea:visible').val().trim().length == 0) {
			el.find('.um-activity-post').addClass('um-disabled');
		}
	});

	/* Image upload */
	UM_wall_img_upload();

	/* Hide a comment */
	jQuery(document).on('click', '.um-activity-comment-hide', function (e) {
		e.preventDefault();
		el = jQuery(this);
		div = el.parent();

		if (div.hasClass('editing')) {
			div.find('.um-activity-comment-area').remove();
			div.find('.um-activity-comment-info > div').show();
			div.find('.um-activity-editc-d').hide();
			div.removeClass('editing');
		} else {
			var comment_id = div.attr('id').replace('commentid-', '');

			div.find('.um-activity-comment-info').hide();
			div.find('.um-activity-comment-hidden').show();
			div.find('.um-activity-comment-avatar').addClass('hidden-1');
			el.remove();

			jQuery.ajax({
				url: um_scripts.activity_hide_comment,
				type: 'post',
				data: {comment_id: comment_id},
				success: function (data) {
				}
			});
		}

		return false;
	});

	/* Unhide a comment */
	jQuery(document).on('click', '.um-activity-comment-hidden a', function (e) {
		e.preventDefault();
		el = jQuery(this);
		var comment_id = el.parent().parent().attr('id').replace('commentid-', '');

		el.parent().parent().find('.um-activity-comment-info').show();
		el.parent().parent().find('.um-activity-comment-hidden').hide();
		el.parent().parent().find('.um-activity-comment-hide').show();
		el.parent().parent().find('.um-activity-comment-avatar').removeClass('hidden-1');

		el.parent().parent().prepend('<a href="#" class="um-activity-comment-hide um-tip-s"><i class="um-icon-close-round"></i></a>');

		jQuery.ajax({
			url: um_scripts.activity_unhide_comment,
			type: 'post',
			data: {comment_id: comment_id},
			success: function (data) {
			}
		});

		return false;
	});

	/* Show post likes in modal */
	jQuery(document).on('click', '.um-activity-show-likes', function (e) {
		e.preventDefault();

		el = jQuery(this);
		var post_id = el.attr('data-post_id');

		if (parseInt(el.find('.um-activity-post-likes').html()) <= 0) {
			return false;
		}

		prepare_Modal();

		jQuery.ajax({
			url: um_scripts.activity_get_post_likes,
			type: 'post',
			data: {post_id: post_id},
			success: function (data) {
				if (data) {
					show_Modal(data);
					responsive_Modal();
				} else {
					remove_Modal();
				}
			}
		});

		return false;
	});

	/* Show comment likes in modal */
	jQuery(document).on('click', '.um-activity-comment-likes', function (e) {
		e.preventDefault();

		el = jQuery(this);
		var comment_id = el.parent().parent().parent().attr('id').replace('commentid-', '');

		prepare_Modal();

		jQuery.ajax({
			url: um_scripts.activity_get_comment_likes,
			type: 'post',
			data: {comment_id: comment_id},
			success: function (data) {
				if (data) {
					show_Modal(data);
					responsive_Modal();
				} else {
					remove_Modal();
				}
			}
		});

		return false;
	});

	/* Toggle comment hiding icon */
	jQuery(document).on('mouseover', '.um-activity-commentl', function (e) {
		jQuery(this).find('.um-activity-comment-hide').show();
	});

	jQuery(document).on('mouseout', '.um-activity-commentl', function (e) {
		jQuery(this).find('.um-activity-comment-hide').hide();
	});

	/* Report post */
	jQuery(document).on('click', '.um-activity-report:not(.flagged)', function (e) {
		var el = jQuery(this);
		var post_id = el.parents('.um-activity-widget').attr('id').replace('postid-', '');
		jQuery.ajax({
			url: um_scripts.activity_report_post,
			type: 'post',
			data: {post_id: post_id},
			success: function (data) {
				el.addClass('flagged').html(el.attr('data-cancel_report'));
			}
		});
	});

	/* Cancel report post */
	jQuery(document).on('click', '.um-activity-report.flagged', function (e) {
		var el = jQuery(this);
		var post_id = el.parents('.um-activity-widget').attr('id').replace('postid-', '');
		jQuery.ajax({
			url: um_scripts.activity_unreport_post,
			type: 'post',
			data: {post_id: post_id},
			success: function (data) {
				el.removeClass('flagged').html(el.attr('data-report'));
			}
		});
	});

	/* load more comments */
	jQuery(document).on('click', '.um-activity-commentload', function (e) {
		e.preventDefault();
		var el = jQuery(this);

		el.hide();
		el.parent().find('.um-activity-commentload-spin').show();

		var offset = el.attr('data-loaded');
		var post_id = el.parents('.um-activity-widget').attr('id').replace('postid-', '');

		el.parents('.um-activity-comments').find('.um-activity-commentload-end').remove();
		jQuery.ajax({
			url: um_scripts.activity_load_more_comments,
			type: 'post',
			data: {post_id: post_id, offset: offset},
			success: function (data) {
				el.before(data);
				el.attr('data-loaded', el.parents('.um-activity-comments').find('.um-activity-commentl:not(.is-child):not(.um-activity-comment-area):visible').length);
				el.parent().find('.um-activity-commentload-spin').hide();
				if (el.parents('.um-activity-comments').find('.um-activity-commentload-end').length) {
					el.show().find('span').html(el.attr('data-load_comments'));
				}
			}
		});

		return false;
	});

	/* load more replies */
	jQuery(document).on('click', '.um-activity-ccommentload', function (e) {
		e.preventDefault();
		var el = jQuery(this);

		el.hide();
		el.parent().find('.um-activity-ccommentload-spin').show();

		var offset = el.attr('data-loaded');
		var post_id = el.parents('.um-activity-widget').attr('id').replace('postid-', '');
		var comment_id = el.parents('.um-activity-commentwrap').attr('data-comment_id');

		el.parents('.um-activity-comments').find('.um-activity-ccommentload-end').remove();
		jQuery.ajax({
			url: um_scripts.activity_load_more_replies,
			type: 'post',
			data: {post_id: post_id, comment_id: comment_id, offset: offset},
			success: function (data) {
				el.before(data);
				el.attr('data-loaded', el.parents('.um-activity-commentwrap').find('.um-activity-commentl.is-child:not(.um-activity-comment-area):visible').length);
				el.parent().find('.um-activity-ccommentload-spin').hide();
				if (el.parents('.um-activity-commentwrap').find('.um-activity-ccommentload-end').length) {
					el.show().find('span').html(el.attr('data-load_replies'));
				}
			}
		});

		return false;
	});

	/* Post a status */
	jQuery(document).on('click', '.um-activity-post', function (e) {
		e.preventDefault();
		if ( jQuery(this).hasClass('um-disabled') )
			return false;

		jQuery(this).parents('.um-activity-widget').find('.um-activity-publish').submit();
		return false;
	});


	/* Detect change in textarea content */
	jQuery(document).on('input properychange', '.um-activity-textarea-elem', function () {
		if (jQuery(this).val().trim().length > 0) {
			jQuery(this).parents('.um-activity-widget').find('.um-activity-post').removeClass('um-disabled');
		} else {
			jQuery(this).parents('.um-activity-widget').find('.um-activity-post').addClass('um-disabled');
		}
	});

	/* Reply to comment */
	jQuery(document).on('click', '.um-activity-comment-reply', function (e) {
		e.preventDefault();
		if (!jQuery(this).parents('.um-activity-commentl').hasClass('unready')) {

			if (jQuery(this).parents('.um-activity-comment-info').find('.um-activity-comment-area').length == 0) {
				var cbox = jQuery(this).parents('.um-activity-comments').find('.um-activity-comment-area:first');
				var cloned = cbox.clone();
				cloned.appendTo(jQuery(this).parents('.um-activity-comment-info'));
				cloned.find('textarea').attr('data-reply_to', jQuery(this).attr('data-commentid')).attr('placeholder', cloned.find('textarea').attr('data-replytext')).focus();
				UM_wall_autocomplete_start();
			} else {
				jQuery(this).parents('.um-activity-comment-info').find('.um-activity-comment-area').remove();
			}

		}
		return false;
	});

	/* posting a comment */
	jQuery(document).on('keypress', '.um-activity-comment-textarea', function (e) {
		if (( e.keyCode == 10 || e.keyCode == 13 ) && !e.shiftKey && jQuery(this).val().trim().length > 0) {
			e.preventDefault();
			var textarea = jQuery(this);
			var comment_id = textarea.data('commentid');
			var comment = textarea.val();
			var postid = textarea.parents('.um-activity-widget').attr('id').replace('postid-', '');
			var parent_div = jQuery('#commentid-' + comment_id);

			// if we are editing a reply
			if (comment_id && parent_div.length && parent_div.hasClass('editing')) {
				jQuery.ajax({
					url: um_scripts.activity_wall_comment,
					type: 'post',
					dataType: 'json',
					data: {
						postid: postid,
						commentid: comment_id,
						comment: comment
					},
					success: function (data) {
						parent_div.find('#um-activity-reply-' + comment_id).val(comment);
						parent_div.find('.um-activity-comment-text').html(data.comment_content);
						parent_div.find('.um-activity-editc-d').hide();
						parent_div.find('.um-activity-comment-area').remove();
						parent_div.find('.um-activity-comment-info > div').show();
						parent_div.removeClass('editing');
						parent_div.find('.um-activity-commentl.um-activity-comment-area').show();

					}
				});
			}

			// if we are writing a new reply
			else {
				var commentbox = textarea.parents('.um-activity-comments');
				var reply_to = textarea.attr('data-reply_to');
				textarea.val('');

				var count = textarea.parents('.um-activity-widget').find('.um-activity-post-comments');
				count.html(parseInt(count.html()) + 1);
				var loader_content = commentbox.find('.um-activity-commentload');
				commentbox.find('.um-activity-commentload').remove();
				var comment_loader = commentbox.find('.um-activity-commentload-spin');
				commentbox.find('.um-activity-commentload-spin').remove();
				var comment_wrap = commentbox.find('.um-activity-commentwrap-clone');
				var cchild = textarea.parents('.um-activity-commentwrap').find('.um-activity-comment-child');
				cchild_clone = cchild.clone();

				if (reply_to > 0) { // Writing a reply to a comment
					var clone = commentbox.find('.um-activity-commentlre-clone:first');
					var clonel = clone.clone();

					if (textarea.parents('.um-activity-commentwrap').find('.um-activity-comment-child').length) {
						if (cchild.find('.um-activity-ccommentload').length > 0) {
							clonel.addClass('unready');
							clonel.insertBefore(cchild.find('.um-activity-ccommentload'));
							clonel.find('.um-activity-comment-text').text(comment);
						} else {
							clonel.addClass('unready').appendTo(cchild).fadeIn().find('.um-activity-comment-text').text(comment);

						}
					}

				} else {
					var clone = commentbox.find('.um-activity-commentl-clone:first');
					var clonel = clone.clone();
					clonel.addClass('unready').appendTo(commentbox.find('.um-activity-comments-loop')).fadeIn().find('.um-activity-comment-text').text(comment);
				}

				loader_content.appendTo(commentbox.find('.um-activity-comments-loop'));
				comment_loader.appendTo(commentbox.find('.um-activity-comments-loop'));

				jQuery.ajax({
					url: um_scripts.activity_wall_comment,
					type: 'post',
					dataType: 'json',
					data: {postid: postid, reply_to: reply_to, comment: comment},
					success: function (data) {
						clonel.attr('id', 'commentid-' + data.commentid).removeClass('um-activity-commentl-clone');
						clonel.find('.original-content').attr('id', 'um-activity-reply-' + data.commentid).val(comment);
						clonel.find('.um-activity-editc-d .edit').data('commentid', data.commentid);


						if (clonel.find('.um-activity-comment-reply').length) {
							clonel.find('.um-activity-comment-reply').attr('data-commentid', data.commentid);
							jQuery('#commentid-' + data.commentid + ' .um-activity-comment-text').html(data.comment_content);

							var comment_content = jQuery('#commentid-' + data.commentid + '').clone();
							jQuery('#commentid-' + data.commentid + '').remove();

							var new_comment_wrap = comment_wrap.clone();
							new_comment_wrap.removeClass('um-activity-commentwrap-clone');
							new_comment_wrap.addClass('um-activity-commentwrap');
							new_comment_wrap.attr('data-comment_id', data.commentid);
							comment_content.removeClass('unready');

							if (reply_to <= 0) {
								comment_content.appendTo(new_comment_wrap);
								new_comment_wrap.appendTo(commentbox.find('.um-activity-comments-loop'));
							}

						}
						clonel.removeClass('unready');

						if (reply_to > 0) {

							var cchild = textarea.parents('.um-activity-commentwrap').find('.um-activity-comment-child');
							var new_comment_wrap = textarea.parents('.um-activity-commentwrap');

							textarea.parents('.um-activity-commentwrap').find('.um-activity-comment-child').remove();

							cchild_clone = cchild.clone();
							cchild_clone.appendTo(new_comment_wrap).fadeIn();

						}

						jQuery('#commentid-' + data.commentid + '').fadeTo(1000, 1);

					}
				});
			}
		} else if (( e.keyCode == 10 || e.keyCode == 13 ) && !e.shiftKey) {
			e.preventDefault();
			return false;
		}
	});

	/* Default behaviour */
	jQuery(document).on('click', '.um-activity-dialog a', function (e) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	/* open dialogs */
	jQuery(document).on('click', '.um-activity-start-dialog', function (e) {
		e.stopPropagation();
		e.preventDefault();
		if (!jQuery(this).parents('.um-activity-widget').hasClass('unready')) {
			var to_open = jQuery(this).parent().find('.' + jQuery(this).attr('data-role'));
			if (to_open.is(':visible')) {
				to_open.hide();
			} else {
				to_open.show();
			}
		}
		return false;
	});

	/* Opens comment edit dropdown */
	jQuery(document).on('click', '.um-activity-editc a', function (e) {
		e.stopPropagation();
		e.preventDefault();
		jQuery('.um-activity-comment-meta').find('.um-activity-editc-d:visible').hide();
		var commentedit = jQuery(this).parents('.um-activity-comment-meta').find('.um-activity-editc-d');

		if (commentedit.is(':visible')) {
			commentedit.hide();
		} else {
			commentedit.show();
		}
		return false;
	});

	/* Hides dropdown */
	jQuery(document).click(function () {
		jQuery('.um-activity-dialog').hide();
		jQuery('.um-activity-comment-meta').find('.um-activity-editc-d:visible').hide();
	});

	/* focus on comment area */
	jQuery(document).on('click', '.um-activity-comment a', function (e) {
		e.preventDefault();
		if (!jQuery(this).parents('.um-activity-widget').hasClass('unready')) {
			jQuery(this).parents('.um-activity-widget').find('.um-activity-comments .um-activity-comment-box textarea').focus();
		}
		return false;
	});

	/* Like of a comment */
	jQuery(document).on('click', '.um-activity-comment-like:not(.active)', function (e) {
		e.preventDefault();
		if (!jQuery(this).parents('.um-activity-commentl').hasClass('unready')) {
			var commentid = jQuery(this).parents('.um-activity-commentl').attr('id').replace('commentid-', '');
			var counter = jQuery(this).parents('.um-activity-commentl').find('.um-activity-ajaxdata-commentlikes');
			var ncount = parseInt(counter.html()) + 1;
			counter.html(ncount);
			jQuery(this).parents('.um-activity-commentl').find('.um-activity-comment-likes').removeClass().addClass('um-activity-comment-likes').addClass('count-' + ncount);
			jQuery(this).addClass('active');
			jQuery(this).html(jQuery(this).attr('data-unlike_text'));
			jQuery.ajax({
				url: um_scripts.activity_like_comment,
				type: 'post',
				dataType: 'json',
				data: {commentid: commentid},
				success: function (data) {

				}
			});
		}
		return false;
	});

	/* Unlike of a comment */
	jQuery(document).on('click', '.um-activity-comment-like.active', function (e) {
		e.preventDefault();
		var commentid = jQuery(this).parents('.um-activity-commentl').attr('id').replace('commentid-', '');
		var counter = jQuery(this).parents('.um-activity-commentl').find('.um-activity-ajaxdata-commentlikes');
		var ncount = parseInt(counter.html()) - 1;
		counter.html(ncount);
		jQuery(this).parents('.um-activity-commentl').find('.um-activity-comment-likes').removeClass().addClass('um-activity-comment-likes').addClass('count-' + ncount);
		jQuery(this).removeClass('active');
		jQuery(this).html(jQuery(this).attr('data-like_text'));
		jQuery.ajax({
			url: um_scripts.activity_unlike_comment,
			type: 'post',
			dataType: 'json',
			data: {commentid: commentid},
			success: function (data) {

			}
		});
		return false;
	});

	/* Like of a post */
	jQuery(document).on('click', '.um-activity-like:not(.active) a', function (e) {
		e.preventDefault();
		if (!jQuery(this).parents('.um-activity-widget').hasClass('unready')) {
			var postid = jQuery(this).parents('.um-activity-widget').attr('id').replace('postid-', '');
			jQuery(this).find('i').addClass('um-effect-pop');
			jQuery(this).parent().addClass('active');
			jQuery(this).find('span').html(jQuery(this).parent().attr('data-unlike_text'));
			jQuery(this).find('i').addClass('um-active-color');
			var count = jQuery(this).parents('.um-activity-widget').find('.um-activity-post-likes');
			count.html(parseInt(count.html()) + 1);
			jQuery.ajax({
				url: um_scripts.activity_like_post,
				type: 'post',
				dataType: 'json',
				data: {postid: postid},
				success: function (data) {

				}
			});
		}
		return false;
	});

	/* Unlike of a post */
	jQuery(document).on('click', '.um-activity-like.active a', function (e) {
		e.preventDefault();
		var postid = jQuery(this).parents('.um-activity-widget').attr('id').replace('postid-', '');
		jQuery(this).find('i').removeClass('um-effect-pop');
		jQuery(this).parent().removeClass('active');
		jQuery(this).find('span').html(jQuery(this).parent().attr('data-like_text'));
		jQuery(this).find('i').removeClass('um-active-color');
		var count = jQuery(this).parents('.um-activity-widget').find('.um-activity-post-likes');
		count.html(parseInt(count.html()) - 1);
		jQuery.ajax({
			url: um_scripts.activity_unlike_post,
			type: 'post',
			dataType: 'json',
			data: {postid: postid},
			success: function (data) {

			}
		});
		return false;
	});

	/* Open post edit */
	jQuery(document).on('click', '.um-activity-manage, .um-activity-edit-cancel', function (e) {
		e.preventDefault();
		var el = jQuery(this);
		var post_id = el.parents('.um-activity-widget').attr('id').replace('postid-', '');

		if (jQuery(this).parents('.um-activity-dialog').length) {
			jQuery(this).parents('.um-activity-dialog').hide();
		}

		if (el.parents('.um-activity-widget').find('form').length > 0) {

			el.parents('.um-activity-widget').find('.um-activity-bodyinner-txt').show();
			el.parents('.um-activity-widget').find('.um-activity-bodyinner-photo').show();
			el.parents('.um-activity-widget').find('.um-activity-bodyinner-video').show();
			el.parents('.um-activity-widget').find('form').remove();

		} else {

			var editarea = jQuery('.um-activity-new-post form').clone();
			editarea.appendTo(el.parents('.um-activity-widget').find('.um-activity-bodyinner-edit'));
			editarea.find('textarea:visible').val(el.parents('.um-activity-widget').find('.um-activity-bodyinner-edit').find('textarea:hidden').val()).focus();

			if (el.parents('.um-activity-widget').find('.um-activity-bodyinner-edit').find('#_photo_').val()) {
				editarea.find('.um-activity-preview').show();
				editarea.find('.um-activity-preview img').attr('src', el.parents('.um-activity-widget').find('.um-activity-bodyinner-edit').find('#_photo_').val());
				editarea.find('.um-activity-preview input[type=hidden]').val(el.parents('.um-activity-widget').find('.um-activity-bodyinner-edit').find('#_photo_').val());
				var image_input = el.parents('.um-activity-widget').find('.um-activity-bodyinner-edit').find('#_photo_').clone();
				image_input.appendTo(el.parents('.um-activity-widget').find('.um-activity-bodyinner-edit'));
			}

			editarea.find('.um-activity-post').html(el.attr('data-update_text'));
			editarea.find('.um-activity-post').before('<a href="#" class="um-activity-edit-cancel">' + el.attr('data-cancel_text') + '</a>');
			editarea.find('#_post_id').val(post_id);
			el.parents('.um-activity-widget').find('.um-activity-bodyinner-txt').hide();
			el.parents('.um-activity-widget').find('.um-activity-bodyinner-photo').hide();
			el.parents('.um-activity-widget').find('.um-activity-bodyinner-video').hide();

			UM_wall_img_upload();
			UM_wall_autocomplete_start();
		}

		jQuery('textarea.um-activity-textarea-elem').autoResize();
		return false;
	});



	function um_objectifyForm( formArray ) {//serialize data function

		var returnArray = {};
		for (var i = 0; i < formArray.length; i++){
			returnArray[formArray[i]['name']] = formArray[i]['value'];
		}
		return returnArray;
	}


	/* Post publish */
	jQuery(document).on('submit', '.um-activity-publish', function (e) {
		e.preventDefault();
		var this_form = jQuery(this);
		if (this_form.find('textarea').val().trim().length == 0 && this_form.find('#_post_img').val().trim().length == 0) {
			this_form.find('textarea').focus();
		} else {

			jQuery('.um-activity-post').addClass('um-disabled');
			formdata = this_form.serialize();
			formdata_array = um_objectifyForm( this_form.serializeArray() );
			// new post
			if (this_form.find('#_post_id').val() == 0) {

				var wall = this_form.parents('.um').find('.um-activity-wall');
				var clone = wall.find('.um-activity-clone:first');
				var clonel = clone.clone();
				clonel.prependTo(wall).addClass('unready').fadeIn().find('.um-activity-bodyinner-txt').text(this_form.find('textarea').val());
				if (this_form.find('#_post_img').val().trim().length > 0) {
					if (clonel.find('.um-activity-bodyinner-txt').html().trim().length == 0) {
						clonel.find('.um-activity-bodyinner-txt').hide();
					}
					clonel.prependTo(wall).find('.um-activity-bodyinner-photo').html('<a href="#" class="um-photo-modal" data-src="' + this_form.find('#_post_img').val() + '"><img src="' + this_form.find('#_post_img').val() + '" alt="" /></a>');
				}

				this_form.find('textarea').val('').height('auto');
				this_form.find('#_post_img').val('');

				this_form.find('.um-activity-preview').hide();

				jQuery('.um-activity-textarea-elem').attr('placeholder', jQuery('.um-activity-textarea-elem').attr('data-ph'));

			} else {

				this_form.css({opacity: 0.5});

			}
			jQuery.ajax({
				url: um_scripts[formdata_array['action']],
				type: 'post',
				dataType: 'json',
				data: formdata,
				success: function (data) {

					// new post
					if (this_form.find('#_post_id').val() == 0) {

						this_form.find('.um-activity-preview').find('img').attr('src', '');

						clonel.removeClass('unready').attr('id', 'postid-' + data.postid).removeClass('um-activity-clone');
						clonel.find('.um-activity-comment-textarea').show();
						if (data.orig_content) {
							clonel.find('.um-activity-bodyinner-edit textarea').val(data.orig_content);
						} else {
							clonel.find('.um-activity-bodyinner-edit textarea').val('');
						}
						if (data.content) {
							clonel.find('.um-activity-bodyinner-txt').html(data.content);
						} else {
							clonel.find('.um-activity-bodyinner-txt').empty().hide();
						}

						if (data.link) {
							if (clonel.find('.um-activity-bodyinner-txt').find('.post-meta').length) {
								clonel.find('.um-activity-bodyinner-txt').show().find('.post-meta').replaceWith(data.link);
							} else {
								clonel.find('.um-activity-bodyinner-txt').show().append(data.link);
							}
						}

						if (data.photo) {
							clonel.find('.um-activity-bodyinner-edit input#_photo_').val(data.photo);
							clonel.find('.um-activity-bodyinner-photo').find('a').attr('data-src', data.photo);
							clonel.find('.um-activity-bodyinner-photo').find('a').attr('href', data.photo);
							clonel.find('.um-activity-bodyinner-photo').find('img').attr('src', data.photo);
						} else {
							clonel.find('.um-activity-bodyinner-edit input#_photo_').val('');
						}
						if (data.video) {
							clonel.find('.um-activity-bodyinner-video').html(data.video);
						}

						clonel.find('.um-activity-metadata a').attr('href', data.permalink);
						jQuery(clonel.find('.um-activity-comment-textarea')).autoResize();
					} else {

						elem = this_form.parents('.um-activity-widget');
						elem.find('form').remove();
						if (data.orig_content) {
							elem.find('.um-activity-bodyinner-edit textarea').val(data.orig_content);
						} else {
							elem.find('.um-activity-bodyinner-edit textarea').val('');
						}

						if (data.content) {
							elem.find('.um-activity-bodyinner-txt').html(data.content);
							elem.find('.um-activity-bodyinner-txt').show();
						} else {
							elem.find('.um-activity-bodyinner-txt').empty().hide();
						}

						if (data.link) {
							if (elem.find('.um-activity-bodyinner-txt').find('.post-meta').length) {
								elem.find('.um-activity-bodyinner-txt').show().find('.post-meta').replaceWith(data.link);
							} else {
								elem.find('.um-activity-bodyinner-txt').show().append(data.link);
							}
						}

						if (data.photo) {
							elem.find('.um-activity-bodyinner-edit input#_photo_').val(data.photo);
							if (elem.find('.um-activity-bodyinner-photo').find('a').length == 0) {
								elem.find('.um-activity-bodyinner-photo').html('<a href="' + data.photo + '"><img src="' + data.photo + '" alt="" /></a>');
							} else {
								elem.find('.um-activity-bodyinner-photo').find('a').attr('href', data.photo);
								elem.find('.um-activity-bodyinner-photo').find('img').attr('src', data.photo);
							}
							elem.find('.um-activity-bodyinner-photo').show();
						} else {
							elem.find('.um-activity-bodyinner-edit input#_photo_').val('');
							elem.find('.um-activity-bodyinner-photo').empty().hide();
						}
						if (data.video) {
							elem.find('.um-activity-bodyinner-video').html(data.video);
							elem.find('.um-activity-bodyinner-video').show();
						} else {
							elem.find('.um-activity-bodyinner-video').empty().hide();
						}

					}

					UM_wall_autocomplete_start()

				}

			});

		}
		return false;
	});

	/* Show hidden post content */
	jQuery(document).on('click', '.um-activity-seemore a', function (e) {
		e.preventDefault();
		p = jQuery(this).parents('.um-activity-bodyinner-txt');
		p.find('.um-activity-seemore').remove();
		p.find('.um-activity-hiddentext').show();
		return false;
	});

	/* Comment area */
	jQuery('.um-activity-widget:not(.um-activity-clone) .um-activity-comment-textarea').autoResize();
	jQuery('.um-activity-textarea-elem').autoResize();

});

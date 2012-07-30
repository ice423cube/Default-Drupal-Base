(function ($) {


function addRotation()
  {
	
	//var show_caption;
	var overlayopacity = parseFloat(Drupal.settings.rotationMain.rotation_main_overlay_opacity);
	var overlayopacityFloat = overlayopacity.toFixed(2);
	
	var show_captions = Drupal.settings.rotationMain.rotation_main_show_captions;
	//var show_caption = parseInt(show_captions)
	
	

	if(show_captions == 1){
		$('#rotation').galleryView({

			panel_width: parseInt(Drupal.settings.rotationMain.rotation_main_width),
			panel_height: parseInt(Drupal.settings.rotationMain.rotation_main_height),
			transition_interval: parseInt(Drupal.settings.rotationMain.rotation_main_transition_interval),
			background_color: String(Drupal.settings.rotationMain.rotation_main_background_color),
			overlay_width: parseInt(Drupal.settings.rotationMain.rotation_main_overlay_width),
			overlay_height: parseInt(Drupal.settings.rotationMain.rotation_main_overlay_height),
			overlay_position: String(Drupal.settings.rotationMain.rotation_main_overlay_position),
			overlay_text_color: String(Drupal.settings.rotationMain.rotation_main_overlay_text_color),
			overlay_color: String(Drupal.settings.rotationMain.rotation_main_overlay_color),
			overlay_opacity: overlayopacityFloat,
			frame_width: parseInt(Drupal.settings.rotationMain.rotation_main_frame_width),
			frame_height: parseInt(Drupal.settings.rotationMain.rotation_main_frame_height),
			frame_color: String(Drupal.settings.rotationMain.rotation_main_frame_color),
			filmstrip_border_color: String(Drupal.settings.rotationMain.rotation_main_filmstrip_border_color),
			filmstrip_arrow_color: String(Drupal.settings.rotationMain.rotation_main_filmstrip_arrow_color),
			filmstrip_position: String(Drupal.settings.rotationMain.rotation_main_filmstrip_position),
			filmstrip_style: String(Drupal.settings.rotationMain.rotation_main_filmstrip_style),
			show_captions: true,
			caption_text_color: String(Drupal.settings.rotationMain.rotation_main_caption_text_color),
			caption_height: parseInt(Drupal.settings.rotationMain.rotation_main_caption_height)
				});
	}else
	{
		$('#rotation').galleryView({

	

			panel_width: parseInt(Drupal.settings.rotationMain.rotation_main_width),
			panel_height: parseInt(Drupal.settings.rotationMain.rotation_main_height),
			transition_interval: parseInt(Drupal.settings.rotationMain.rotation_main_transition_interval),
			background_color: String(Drupal.settings.rotationMain.rotation_main_background_color),
			overlay_width: parseInt(Drupal.settings.rotationMain.rotation_main_overlay_width),
			overlay_height: parseInt(Drupal.settings.rotationMain.rotation_main_overlay_height),
			overlay_position: String(Drupal.settings.rotationMain.rotation_main_overlay_position),
			overlay_text_color: String(Drupal.settings.rotationMain.rotation_main_overlay_text_color),
			overlay_color: String(Drupal.settings.rotationMain.rotation_main_overlay_color),
			overlay_opacity: overlayopacityFloat,
			frame_width: parseInt(Drupal.settings.rotationMain.rotation_main_frame_width),
			frame_height: parseInt(Drupal.settings.rotationMain.rotation_main_frame_height),
			frame_color: String(Drupal.settings.rotationMain.rotation_main_frame_color),
			filmstrip_border_color: String(Drupal.settings.rotationMain.rotation_main_filmstrip_border_color),
			filmstrip_arrow_color: String(Drupal.settings.rotationMain.rotation_main_filmstrip_arrow_color),
			filmstrip_position: String(Drupal.settings.rotationMain.rotation_main_filmstrip_position),
			filmstrip_style: String(Drupal.settings.rotationMain.rotation_main_filmstrip_style),
			show_captions: false,
			caption_text_color: String(Drupal.settings.rotationMain.rotation_main_caption_text_color)
				});
	}
	
	
	
	
				
				
				//$(".galleryview").css( "visibility", "visible" );
  }

 

Drupal.behaviors.rotationMain = {

 attach:function() {
			
			$(document).ready(function(){
					
					var isIE = (navigator.appName=="Microsoft Internet Explorer");
					var IEversion = navigator.appVersion;
					ie8down = false;
					if(isIE) {
					IEversion = parseInt(IEversion.substr(IEversion.indexOf("MSIE")+4));
					} else {
					IEversion = 0;
					}
					//if(IEversion <= 8){
					//}
				
					addRotation();
					
					var rounded = String(Drupal.settings.rotationMain.rotation_main_rounded_corners);
					
					if(rounded == "yes" && IEversion == 0 || IEversion >= 9){
						$(".panel").corner("round 5px");
						$(".filmstrip img").corner("round 5px");
						$("#pointer").corner("round 5px");
						$(".imageWrapper").corner("round 5px");
						$(".numberWrapper").corner("round 5px");
						$(".popupWrapper").corner("round 5px");
						$(".galleryview").corner("round 5px");
						$(".overlay").corner("round 5px");
					};
					
					if(rounded == "yes" && IEversion <= 8){
						$(".panel").corner("round 5px");
						//$(".filmstrip img").corner("round 5px");
						//$("#pointer").corner("round 5px");
						$(".imageWrapper").corner("round 5px");
						$(".numberWrapper").corner("round 5px");
						$(".popupWrapper").corner("round 5px");
						$(".galleryview").corner("round 5px");
						$(".overlay").corner("round 5px");
					};


					
					
					
					
					function rotation_addMega(){
						$($(this).find(".popupWrapper")).addClass("hovering");
					}
					
					function rotation_removeMega(){
						$($(this).find(".popupWrapper")).removeClass("hovering");                         
					}

					var megaConfig = {
									 interval: 50,
									 sensitivity: 4,
									 over: rotation_addMega,
									 timeout: 300,
									 out: rotation_removeMega
					};

					$("li").hoverIntent(megaConfig);
					
					
					
			});		
		}
}	
		         
  }(jQuery));
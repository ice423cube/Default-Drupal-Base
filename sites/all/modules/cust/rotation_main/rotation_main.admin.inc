<?php
// $Id$

/**
 * @file
 * Admin page callback for the rotation module.
 */

/**
 * Builds and returns the trails settings form.
 */
function rotation_main_admin_settings() {
  
 




  //Add in farbastic js and css for admin page
  drupal_add_css('misc/farbtastic/farbtastic.css');
  drupal_add_js('misc/farbtastic/farbtastic.js');
  
  //Loads Farbastic for each of the form fields for admin page
  drupal_add_js('(function ($) {$(document).ready(function(){ $(".site_pagetitlecolor_colorpicker0").farbtastic("#edit-rotation-main-background-color"); $(".site_pagetitlecolor_colorpicker1").farbtastic("#edit-rotation-main-overlay-text-color");  $(".site_pagetitlecolor_colorpicker2").farbtastic("#edit-rotation-main-overlay-color"); 					$(".site_pagetitlecolor_colorpicker3").farbtastic("#edit-rotation-main-frame-color"); $(".site_pagetitlecolor_colorpicker4").farbtastic("#edit-rotation-main-caption-text-color");					$(".site_pagetitlecolor_colorpicker5").farbtastic("#edit-rotation-main-filmstrip-border-color"); 					$(".site_pagetitlecolor_colorpicker6").farbtastic("#edit-rotation-main-filmstrip-arrow-color");   });  }(jQuery));', array('type' => 'inline', 'scope' => 'header'));


  $modulepath = drupal_get_path('module', 'rotation_main');
  $imgpath = $GLOBALS['base_url'] . '/' . $modulepath . '/images';


  function admin_page_build_rotation() {
    $defult_tax_name = rotation_main_get_default_tax_id();
    
    $defult_tax_tid = taxonomy_get_term_by_name($defult_tax_name);
    
    $arraystobuild1 = array();

    foreach ($defult_tax_tid as $row) {
     
        $arraystobuild1[] = $row;

    }

    //set temp variables
    $temp_array_length = count($arraystobuild1);
    $temp_counter = 0;
    $arraystobuild2 = array();

    //main loop
    for ($temp_counter = 0; $temp_counter < $temp_array_length; $temp_counter++) {
        $arraystobuild2[] = $arraystobuild1[$temp_counter]->tid;                
    }
    
    $rt_getnids = rotation_main_get_nids_from_tax_for_block($delta = NULL, $arraystobuild2);

    $build_rotation = rotation_main_buildHTMLroation($rt_getnids);

    $output = $build_rotation;
    return $output;
  }
   
  
  

  
  
  
  //START OF FORM
  
  $form['roation_build_html'] = array(
    '#type' => 'markup',
    '#markup' => admin_page_build_rotation(),
  );

  $form['rotation_description'] = array(
    '#type' => 'markup',
    '#markup' => t('<p>Below are the global settings for your Rotation Slide Show and Portfolio displays.  You can control all your setting in one place for each of your slide shows.  Make a change below and save the form and it will update this example above to give you and idea of what your rotation will look like.</p>
    <p> <a href="!url1" target="_blank">Check out the module creators website for more details about how it works</a>.
    <h2>Getting Started:</h2>
    <ul>
        <li>Edit the <a href="/admin/content/node">Rotation Item nodes</a> labeled Rotation #1-5 to be the content and titles that you want.</li>
        <li>Go to the <a href="/admin/structure/block">block page</a> and add the block to the place you want the rotation to show up.  Do not forget to go to the "Pages" Visibility Settings and restrict the rotation only to the node that you want it to show up on.  For example to get it to only show up on the home page you would use <strong>&lt;front&gt;</strong></li>
        <li>Add new taxonomy terms to <a href="!url2">Rotation Location</a> to add new Rotations to other pages in your website.</li>
    </ul>
    <p><strong>Please Note:</strong> You can only use one Rotation Block on a page at a time.</p>', array('!url1' => url('http://www.JoeMRoberts.com/'), '!url2' => url('/admin/structure/taxonomy/rotation_tax'))),
    );
 //rotation_main_number
  $form['rotation_main_number'] = array(
    '#type' => 'textfield',
    '#title' => t('Total Number of Rotations'),
    '#default_value' => variable_get('rotation_main_number', '1'),
    '#description' => t('Enter the Number of Rotation you would like to display on this website.  This will create a block for each of the sites so you can place it on the pages that you want to.'),
    '#required' => TRUE,
  );

  // Panel Information
  $form['rotation_information'] = array(
    '#title' => 'Entire Rotation Information',
    '#type' => 'fieldset',
    '#description' => t('<img src="!locationIMG/Entire-Rotation-Area.jpg" style="float:right;" />', array('!locationIMG' => $imgpath)),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
      //panel_width
      $form['rotation_information']['rotation_main_width'] = array(
        '#type' => 'textfield',
        '#title' => t('Large Image Width'),
        '#default_value' => variable_get('rotation_main_width', '700'),
        '#description' => t('Choose a Width for your Large Image. <strong>Please Note:</strong> Make sure the images you are posting are set to this width.  If they are larger they will be cropped.'),
        '#required' => TRUE,
      );
      //panel_height
      $form['rotation_information']['rotation_main_height'] = array(
        '#type' => 'textfield',
        '#title' => t('Large Image Height'),
        '#default_value' => variable_get('rotation_main_height', '300'),
        '#description' => t('Choose a Height for your Large Image. <strong>Please Note:</strong> Make sure the images your are posting are set to this height.  If they are larger they will be cropped.'),
        '#required' => TRUE,
      );
      //transition_interval
      $form['rotation_information']['rotation_main_transition_interval'] = array(
        '#type' => 'textfield',
        '#title' => t('Rotation Transition Time'),
        '#default_value' => variable_get('rotation_main_transition_interval', '1200'),
        '#description' => t('In milliseconds 1,000 = 1 second.'),
        '#required' => TRUE,
      );

      //background_color
      $form['rotation_information']['rotation_main_background_color'] = array(
       '#type' => 'textfield',
       '#title' => t('Entire Background Color'),
       '#default_value' => variable_get('rotation_main_background_color', '#000000'),
       '#description' => t('Drag the color chart below to pick a color.  The outside ring selects the color and the <br />inside square changes the lightness or darkness of that color.<div class="site_pagetitlecolor_colorpicker0"></div>'),
       '#required' => TRUE,
       '#size' => 9,
       '#maxlength' => 7,
      );
      
      //rounded_corners
      $form['rotation_information']['rotation_main_rounded_corners'] = array(
        '#type' => 'select',
        '#title' => t('Entire Rotation Rounded Corners'),
        '#options' => array(
          'no' => t('no'),
          'yes' => t('yes'),
        ),
        '#default_value' => variable_get('rotation_main_rounded_corners', 'no'),
        '#description' => t('Rounds all the corners to help it not look so boxy-looking.'),
        '#required' => TRUE,
      );
      
      

     
  
  
  // Overlay Where Text Is Information
  $form['overlay_information'] = array(
    '#title' => 'Overlay Information',
    '#type' => 'fieldset',
    '#description' => t('<img src="!locationIMG/Overlay-Area.jpg" style="float:right;" /> Area where Title and Text Show up.', array('!locationIMG' => $imgpath)),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  
      //overlay_position
      $form['overlay_information']['rotation_main_overlay_position'] = array(
        '#type' => 'select',
        '#title' => t('Selected Overlay Positions'),
        '#options' => array(
          'bottom' => t('bottom'),
          'top' => t('top'),
          'right' => t('right'),
          'left' => t('left'),
        ),
        '#default_value' => variable_get('rotation_main_overlay_position', 'bottom'),
        '#description' => t('Choose a position for the overlay area.'),
        '#required' => TRUE,
      );
      //overlay_width
      $form['overlay_information']['rotation_main_overlay_width'] = array(
        '#type' => 'textfield',
        '#title' => t('Overlay Width'),
        '#default_value' => variable_get('rotation_main_overlay_width', '200'),
        '#description' => t('<strong>Please Note:</strong> Remember if you choose top or bottom this field will be ignored. Choose a Width for the overlay area of 200px wide use "200".  Leave off the "px"'),
        '#required' => TRUE,
      );
      //overlay_height
      $form['overlay_information']['rotation_main_overlay_height'] = array(
        '#type' => 'textfield',
        '#title' => t('Overlay Height'),
        '#default_value' => variable_get('rotation_main_overlay_height', '100'),
        '#description' => t('<strong>Please Note:</strong> Remember if you choose right or left this field will be ingnored. Choose a Height for the overlay area of 100px tall use "100".  Leave off the "px"'),
        '#required' => TRUE,
      );
      //overlay_text_color
      $form['overlay_information']['rotation_main_overlay_text_color'] = array(
       '#type' => 'textfield',
       '#title' => t('Overlay Text Color'),
       '#default_value' => variable_get('rotation_main_overlay_text_color', '#ffffff'),
       '#description' => t('<strong>Please Note:</strong> The font-family and font-size will be inherited from your style sheet.<br />Feel free to edit the class by changing (Rotation Links = .rotationLinks class) and/or<br />(Rotation Header = .rotationHeader class).<br /><br />Drag the color chart below to pick a color.  The outside ring selects the color and<br />the inside square changes the lightness or darkness of that color.<div class="site_pagetitlecolor_colorpicker1"></div> '),
       '#required' => TRUE,
       '#size' => 9,
       '#maxlength' => 7,
      );
      
      //overlay_color
      $form['overlay_information']['rotation_main_overlay_color'] = array(
       '#type' => 'textfield',
       '#title' => t('Overlay Background Color'),
       '#default_value' => variable_get('rotation_main_overlay_color', '#425F78'),
       '#description' => t('Drag the color chart below to pick a color.  The outside ring selects the color and the <br />inside square changes the lightness or darkness of that color.<div class="site_pagetitlecolor_colorpicker2"></div>'),
       '#required' => TRUE,
       '#size' => 9,
       '#maxlength' => 7,
      );
      //overlay_opacity
      $form['overlay_information']['rotation_main_overlay_opacity'] = array(
        '#type' => 'textfield',
        '#title' => t('Overlay Background Opacity'),
        '#default_value' => variable_get('rotation_main_overlay_opacity', '0.80'),
        '#description' => t('Choose a value between 0 (Completely Transparent) and 1 (Solid Color).  Example: 0.80 is 80% transparent.  If you do not want an overlay at all just set this value to 0.'),
        '#required' => TRUE,
      );
  
  
  
  
  
  
  // Filmstrip Information
  $form['filmstrip_information'] = array(
    '#title' => 'Filmstrip Information',
    '#type' => 'fieldset',
    '#description' => t('<img src="!locationIMG/Filmstrip-Area.jpg" style="float:right;" />', array('!locationIMG' => $imgpath)),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  ); 
      
      //filmstrip_position
      $form['filmstrip_information']['rotation_main_filmstrip_position'] = array(
        '#type' => 'select',
        '#title' => t('Filmstip Position'),
        '#options' => array(
          'bottom' => t('bottom'),
          'top' => t('top'),          
          'none' => t('No Film Strip'),          
        ),
        '#default_value' => variable_get('rotation_main_filmstrip_position', 'bottom'),
        '#description' => t('You can change where the filmstrip shows up.<br /><strong>No Film Strip</strong> will remove the filmstrip completely.'),
        '#required' => TRUE,
      );
      
      //filmstrip_style
      $form['filmstrip_information']['rotation_main_filmstrip_style'] = array(
        '#type' => 'select',
        '#title' => t('Filmstip Style'),
        '#options' => array(
          'thumbnails' => t('Thumbnails'),
          'popupthumbnails' => t('Numbers with Pop-up Thumbnails'),
        ),
        '#default_value' => variable_get('rotation_main_filmstrip_style', 'thumbnails'),
        '#description' => t('There are two styles you can setup for your filmstrip.  <strong>Thumbnails</strong> = More traditional style with a thumbnail in the filmstrip.  <strong>Numbers with Pop-up Thumbnails</strong> = Adds smaller numbers into the filmstrip area and allows you to use the thumbnails as popups to preview what is available for that number. It also allows you to use the captions as text to display what is available underneith the thumbnail.'),
        '#required' => TRUE,
      );
      
      
      // Thumbnails Information
      $form['filmstrip_information']['thumb_information'] = array(
        '#title' => 'Edit Thumbnail Information',
        '#type' => 'fieldset',
        '#description' => t('<img src="!locationIMG/Thumbnail-Area.jpg" style="float:right;" />', array('!locationIMG' => $imgpath)),
        '#collapsible' => TRUE,
        '#collapsed' => FALSE,
      );
          
          //frame_width
          $form['filmstrip_information']['thumb_information']['rotation_main_frame_width'] = array(
            '#type' => 'textfield',
            '#title' => t('Thumbnail Width'),
            '#default_value' => variable_get('rotation_main_frame_width', '100'),
            '#description' => t('Choose a Width for your thumbnail images.  If Filmstrip Style is set to "Numbers with Pop-up Thumbnails" then this value also determines the width of the pop-up. <strong>Please Note:</strong> Make sure the images you are posting are set to this width.  If they are larger they will be cropped.'),
            '#required' => TRUE,
          );
          //frame_height
          $form['filmstrip_information']['thumb_information']['rotation_main_frame_height'] = array(
            '#type' => 'textfield',
            '#title' => t('Thumbnail Height'),
            '#default_value' => variable_get('rotation_main_frame_height', '100'),
            '#description' => t('Choose a Height for your thumbnail images.  If Filmstrip Style is set to "Numbers with Pop-up Thumbnails" then this value is ignored.  <strong>Please Note:</strong> Make sure the images you are posting are set to this height.  If they are larger they will be cropped.'),
            '#required' => TRUE,
          );
          //frame_color
          $form['filmstrip_information']['thumb_information']['rotation_main_frame_color'] = array(
            '#type' => 'textfield',
            '#title' => t('Numbers with Pop-up Thumbnails Background Color Only'),
            '#default_value' => variable_get('rotation_main_frame_color', '#425F78'),
            '#description' => t('If Filmstrip Style is set to "Thumbnails" then this value is ignored. This controls the color of the background of the numbers and the pop-up. Drag the color chart below to pick a color. The outside ring selects the color and the inside square changes the lightness or darkness of that color.<div class="site_pagetitlecolor_colorpicker3"></div>'),
           '#required' => TRUE,
           '#size' => 9,
           '#maxlength' => 7,
          );
      
      
      // Filmstrip Information
      $form['filmstrip_information']['caption_information'] = array(
        '#title' => 'Edit Caption Information',
        '#type' => 'fieldset',
        '#description' => t(''),
        '#collapsible' => TRUE,
        '#collapsed' => FALSE,
      ); 
          //show_captions
          $form['filmstrip_information']['caption_information']['rotation_main_show_captions'] = array(
            '#type' => 'select',
            '#title' => t('Show Captions'),
            '#options' => array(
              '0' => t('no'),
              '1' => t('yes'),
            ),
            '#default_value' => variable_get('rotation_main_show_captions', '0'),
            '#description' => t('Selecting "yes" will allow you to see captions under each thumbnail in the filmstrip.'),
            '#required' => TRUE,
          );
          //caption_height
          $form['filmstrip_information']['caption_information']['rotation_main_caption_height'] = array(
            '#type' => 'textfield',
            '#title' => t('Captions Height'),
            '#default_value' => variable_get('rotation_main_caption_height', 20),
            '#description' => t('This is the height of the caption area. 20 = 20px in height.  If you have a longer caption you might want to make this a larger number.  You can adjust the line-height be changing the ".caption" class.'),
            '#required' => TRUE,
          );
          //caption_text_color
          $form['filmstrip_information']['caption_information']['rotation_main_caption_text_color'] = array(
           '#type' => 'textfield',
           '#title' => t('Caption Text Color'),
           '#default_value' => variable_get('rotation_main_caption_text_color', '#ffffff'),
           '#description' => t('Drag the color chart below to pick a color.  The outside ring selects the color and the <br />inside square changes the lightness or darkness of that color.<div class="site_pagetitlecolor_colorpicker4"></div>'),
           '#required' => TRUE,
           '#size' => 9,
           '#maxlength' => 7,
          );
      //filmstrip_border_color
      $form['filmstrip_information']['rotation_main_filmstrip_border_color'] = array(
       '#type' => 'textfield',
       '#title' => t('Filmstip Selected Image Border Color'),
       '#default_value' => variable_get('rotation_main_filmstrip_border_color', '#ffffff'),
       '#description' => t('Drag the color chart below to pick a color.  The outside ring selects the color and the <br />inside square changes the lightness or darkness of that color.<div class="site_pagetitlecolor_colorpicker5"></div>'),
       '#required' => TRUE,
       '#size' => 9,
       '#maxlength' => 7,
      );
      //filmstrip_arrow_color
      $form['filmstrip_information']['rotation_main_filmstrip_arrow_color'] = array(
       '#type' => 'textfield',
       '#title' => t('Filmstip Arrows and Pointer Color'),
       '#default_value' => variable_get('rotation_main_filmstrip_arrow_color', '#ffffff'),
       '#description' => t('Drag the color chart below to pick a color.  The outside ring selects the color and the <br />inside square changes the lightness or darkness of that color.<div class="site_pagetitlecolor_colorpicker6"></div>'),
       '#required' => TRUE,
       '#size' => 9,
       '#maxlength' => 7,
      );


  return system_settings_form($form);
  
  
  
  
  
  
  
  
  
  
  



  


/**
 * Helper function return all the taxonomy terms of a given node type
 * @param $type
 * The array of machine name of the content type that the function should look for taxonomy terms
 * the array format should be : array('machine_name');
 * @return
 *   An array of taxonomy terms containing tid => human name.
 */
/*function vt_commerce_api_get_vocabulary($type = array('rotation_main')) {
  
  if (empty($type) || !is_array($type)) {
    return FALSE;
  }

  $output = array();
  foreach (field_info_fields() as $field) {
    if ($field['type'] == 'taxonomy_term_reference' && is_array($field['bundles']['node'])) {
      foreach ($field['bundles']['node'] as $content_type) {
        if (in_array($content_type, $type)) {
          foreach ($field['settings']['allowed_values'] as $value) {
             $output[$value['vocabulary']] = $value['vocabulary'];
          }
        }
      }
    }
  }

  var_dump($output);
  return $output;
}*/

//vt_commerce_api_get_vocabulary(array('machine_name'));
  
  
  
}


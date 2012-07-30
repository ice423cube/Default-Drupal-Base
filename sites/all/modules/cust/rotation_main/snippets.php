<?php




















//VIDEO: How to display custom node data in forms and in the node display

/**
 * Implements hook_node_load().
 *
 * Pulls in data from the backup user table into the $node object.
 *
 * For more info, see:
 * http://api.drupal.org/api/drupal/modules--node--node.api.php/function/hook_node_load/7
 */
function stuff_node_load($nodes, $types) {
  $result = db_query('SELECT nid, username FROM {stuff_backup} WHERE nid IN(:nids)', array(':nids' => array_keys($nodes)));
  foreach ($result as $row) {
    $nodes[$row->nid]->stuff_backup_user = $row->username;
  }
}


//VIDEO: How to display custom node data in forms and in the node display

/**
 * Implements hook_node_view().
 *
 * Adding the backup user information to display in the node.
 *
 * For more info, see:
 * http://api.drupal.org/api/drupal/modules--node--node.api.php/function/hook_node_view/7
 */
function stuff_node_view($node, $view_mode, $langcode) {
  if ($node->stuff_backup_user != '') {
    $node->content['stuff_backup'] = array(
      '#username' => $node->stuff_backup_user,
      '#theme' => 'stuff_backup_user',
    );
  }
}


/**
 * Implements hook_theme().
 */
function stuff_theme() {
  return array(
    'stuff_backup_user' => array(
      'variables' => array('username' => NULL),
    ),
  );
}


/**
 * Themes the backup user information when viewing a node.
 */
function theme_stuff_backup_user($variables) {
  return '<h3>' . t('Backup user') . '</h3><p>' . $variables['username'] . '</p>';
}















//JS Farbtastic
var f = $.farbtastic('#picker');
var p = $('#picker').css('opacity', 0.25);

var selected;

$('.colorwell')
.each(function () { f.linkTo(this); $(this).css('opacity', 0.75); })
.focus(function() {
if (selected) {
$(selected).css('opacity', 0.75).removeClass('colorwell-selected');
}
f.linkTo(this);
p.css('opacity', 1);
$(selected = this).css('opacity', 1).addClass('colorwell-selected');
}); 




//JS Farbtastic?
function field_example_field_schema($field) {
  $columns = array(
    'rgb' => array(
      'type' => 'varchar',
      'length' => 7,
      'not null' => FALSE,
    ),
  );
  $indexes = array(
    'rgb' => array('rgb'),
  );
  return array(
    'columns' => $columns, 
    'indexes' => $indexes,
  );
}













//Use with schema
 return array(
	'rm_id' => array(
      'field_name'  => 'rm_id',
      'description' => 'The rotation identifier.',
      'type' => 'varchar',
      'length' => 32,
      'not null' => TRUE,
      'default' => '',
      'cardinality' => 1,
    ),
    'rotation_main_url' => array(
      'field_name' => 'rotation_main_url',
      'type'       => 'text',
      'cardinality' => 1,
    ),
	'rotation_main_large_image' => array(
      'field_name' => 'rotation_main_large_image',
      'type'       => 'image',
      'cardinality' => 1,
    ),
	'rotation_main_thumb_image' => array(
      'field_name' => 'rotation_main_thumb_image',
      'type'       => 'image',
      'cardinality' => 1,
    ),
	'rotation_main_caption' => array(
      'field_name' => 'rotation_main_caption',
      'type'       => 'text',
      'cardinality' => 1,
    ),
	'rotation_main_category' => array(
      'field_name' => 'rotation_main_category',
      'type'       => 'text',
	  'size'       => 'big',
      'cardinality' => FIELD_CARDINALITY_UNLIMITED,
    ),
	'primary key' => array('rm_id'),
  );
  
  
  
  
  
  
  
  
  
  
  
  /**
 * Helper function return all the taxonomy terms of a given node type
 * @param $type
 * The array of machine name of the content type that the function should look for taxonomy terms
 * the array format should be : array('machine_name');
 * @return
 *   An array of taxonomy terms containing tid => human name.
 */
function vt_commerce_api_get_vocabulary($type = array()) {
  // break if there are no types specified
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

  return $output;
}


$test = vt_commerce_api_get_vocabulary(array('rotation_main'));

echo 'test <br />';
var_dump($test);
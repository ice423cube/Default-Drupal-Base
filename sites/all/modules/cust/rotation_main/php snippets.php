<?php

//flush all cache url
//http://bioclinica:8082/admin_menu/flush-cache?destination=admin/structure/block/manage/rotation_main/1/configure

//set temp variables
$temp_field_x_array_length = count($node->rotation_main_category);
$temp_field_x_output = "";
$temp_field_x_counter = 0;

//main loop
for ($temp_field_x_counter = 0; $temp_field_x_counter < $temp_field_x_array_length-2; $temp_field_x_counter+= 1)
{


$temp_field_x_output = $node->rotation_main_category[$node->language][$temp_field_x_counter]['tid'];				
}





$terms = db_select('taxonomy_index', 'ti')
  ->fields('ti', array('tid', 'name'))
  ->leftJoin('taxonomy_term_data', 'ttd', 'ti.tid = ttd.tid')
  ->condition('vid', 2)
  ->condition('nid', $nid)
  ->execute();

foreach ($terms as $term) {
  // $term contains the object for the taxonomy term.
  var_dump($term);
}


foreach($Rockbands as $Rockband)
{
 echo "<tr>";
 foreach($Rockband as $item)
 {
  echo "<td>$item</td>";
 }
 echo "</tr>";
}





	  //testing grab contenty types within taxonomy
	function node_load_by_type($type, $limit = 15, $offset = 0) {
	  $query = new EntityFieldQuery();
	  $query->entityCondition('entity_type', 'node')
		->entityCondition('bundle', $type)
		->range($offset, $limit);
	  $results = $query->execute();
	  
	  return $results;
	}
	
	
  //None Worked so Far
  
  //$block = module_invoke("rotation_main", "block_view", "main");
  //drupal_add_region_content("content", theme("seven", $block));
  
  //$block = block_load('block', 'main');
  //$output = drupal_render(_block_get_renderable_array(_block_render_blocks(array($block))));
  //print $output;
  
  //$block = module_invoke('rotation_main', 'block', 'view', 'main');
  //print $block['content'];
  
  //$block = module_invoke('rotation_main', '1', '1');
  //echo $block['content']; 
  
  //block_load('rotation_main', '1');
  
  //$view = views_get_view('1');
  //print $view->preview('default');
  
  
  //*********************
  //Lookup all field Widgets
  //hook_field_widget_info(
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

/**
 * Implements hook_theme().
 *
 * We need run our forms through custom theme functions in order to build the
 * table structure which is required by tabledrag.js.  Before we can use our
 * custom theme functions, we need to implement hook_theme in order to register
 * them with Drupal.
 *
 * We are defining our theme hooks with the same name as the form generation
 * function so that Drupal automatically calls our theming function when the
 * form is displayed.
 */
function rotation_main_theme() {
  return array(
    // Theme function for the 'sortable' example
    'rotation_main_simple_form' => array(
      'render element' => 'form',
      //'file' => 'tabledrag_example_simple_form.inc',
    ),
  );
}
















/**
 * Build the rotation_main_example_form form
 *
 * @return
 *   A form array set for theming by theme_rotation_main_simple_form()
 */
function rotation_main_block_form($form_state) {
  // Identify that the elements in 'example_items' are a collection, to
  // prevent Form API from flattening the array when submitted.
  $form['example_items']['#tree'] = TRUE;

  // Fetch the example data from the database, ordered by weight ascending.
  //
  // This query excludes the last two tabledrag_example database rows, as
  // they are intended only for the 'parent/child' tabledrag examples.
  //$result = db_query('SELECT id, name, description, weight FROM {tabledrag_example} WHERE id < 8 ORDER BY weight ASC');
  
  
  foreach($array as $key => $term){
  
  $nid = $term;
  $node = node_load($nid);

	$rt_title = $node->title;
  
  
  // Iterate through each database result
  foreach ($result as $item) {

    // Create a form entry for this item.
    //
    // Each entry will be an array using the the unique id for that item as
    // the array key, and an array of table row data as the value.
    $form['example_items'][$item->id] = array(

      // We'll use a form element of type '#markup' to display the item name.
      'name' => array(
        '#markup' => check_plain($item->name),
      ),

      // We'll use a form element of type '#textfield' to display the item
      // description, which will allow the value to be changed via the form.
      // We limit the input to 255 characters, which is the limit we set on
      // the database field.
      'description' => array(
        '#type' => 'textfield',
        '#default_value' => check_plain($item->description),
        '#size' => 20,
        '#maxlength' => 255,
      ),

      // The 'weight' field will be manipulated as we move the items around in
      // the table using the tabledrag activity.  We use the 'weight' element
      // defined in Drupal's Form API.
      'weight' => array(
        '#type' => 'weight',
        '#title' => t('Weight'),
        '#default_value' => $item->weight,
        '#delta' => 10,
        '#title-display' => 'invisible',
      ),
    );
  }
}
  // Now we add our submit button, for submitting the form results.
  //
  // The 'actions' wrapper used here isn't strictly necessary for tabledrag,
  // but is included as a Form API recommended practice.
  $form['actions'] = array('#type' => 'actions');
  $form['actions']['submit'] = array( '#type' => 'submit', '#value' => t('Save Changes'));
  return $form;
}

/**
 * Theme callback for the rotation_main_simple_form form
 *
 * The theme callback will format the $form data structure into a table and
 * add our tabledrag functionality.  (Note that drupal_add_tabledrag should be
 * called from the theme layer, and not from a form declaration.  This helps
 * keep template files clean and readable, and prevents tabledrag.js from
 * being added twice accidently.
 *
 * @return
 *   The rendered tabledrag form
 */
function theme_rotation_main_simple_form($variables) {
  $form = $variables['form'];

  // Initialize the variable which will store our table rows
  $rows = array();

  // Iterate over each element in our $form['example_items'] array
  foreach (element_children($form['example_items']) as $id) {

    // Before we add our 'weight' column to the row, we need to give the
    // element a custom class so that it can be identified in the
    // drupal_add_tabledrag call.
    //
    // This could also have been done during the form declaration by adding
    //     '#attributes' => array('class' => 'example-item-weight'),
    // directy to the 'weight' element in tabledrag_example_simple_form().
    $form['example_items'][$id]['weight']['#attributes']['class'] = array('example-item-weight');

    // We are now ready to add each element of our $form data to the $rows
    // array, so that they end up as individual table cells when rendered
    // in the final table.  We run each element through the drupal_render()
    // function to generate the final html markup for that element.
    $rows[] = array(
      'data' => array(
        // Add our 'name' column
        drupal_render($form['example_items'][$id]['name']),
        // Add our 'description' column
        drupal_render($form['example_items'][$id]['description']),
        // Add our 'weight' column
        drupal_render($form['example_items'][$id]['weight']),
      ),
      // To support the tabledrag behaviour, we need to assign each row of the
      // table a class attribute of 'draggable'. This will add the 'draggable'
      // class to the <tr> element for that row when the final table is
      // rendered.
      'class' => array('draggable'),
    );
  }

  // We now define the table header values.  Ensure that the 'header' count
  // matches the final column count for your table.
  $header = array(t('Name'), t('Description'), t('Weight'));

  // We also need to pass the drupal_add_tabledrag() function an id which will
  // be used to identify the <table> element containing our tabledrag form.
  // Because an element's 'id' should be unique on a page, make sure the value
  // you select is NOT the same as the form ID used in your form declaration.
  $table_id = 'example-items-table';

  // We can render our tabledrag table for output.
  $output = theme('table', array('header' => $header, 'rows' => $rows, 'attributes' => array('id' => $table_id)));

  // And then render any remaining form elements (such as our submit button)
  $output .= drupal_render_children($form);

  // We now call the drupal_add_tabledrag() function in order to add the
  // tabledrag.js goodness onto our page.
  //
  // For a basic sortable table, we need to pass it:
  //   - the $table_id of our <table> element,
  //   - the $action to be performed on our form items ('order'),
  //   - a string describing where $action should be applied ('siblings'),
  //   - and the class of the element containing our 'weight' element.
  drupal_add_tabledrag($table_id, 'order', 'sibling', $group = 'example-item-weight', NULL, NULL, FALSE);
  

  return $output;
}

/**
 * Submit callback for the tabledrag_example_simple_form form
 *
 * Updates the 'weight' column for each element in our table, taking into
 * account that item's new order after the drag and drop actions have been
 * performed.
 */
function tabledrag_example_simple_form_submit($form, &$form_state) {
  // Because the form elements were keyed with the item ids from the database,
  // we can simply iterate through the submitted values.
  foreach ($form_state['values']['example_items'] as $id => $item) {
    db_query(
      "UPDATE {tabledrag_example} SET weight = :weight WHERE id = :id",
      array(':weight' => $item['weight'], ':id' => $id)
    );
  }
}











//DRAGABLE EXAMPLE 2
/**
* Implementation of hook_menu
*/
function draggabledemo_menu() {
  $items = array();

 
$items['draggabledemo'] = array(
    'title' => 'Draggable Sorting List Demo',
    'page callback' => 'drupal_get_form',
    'page arguments' => array('draggabledemo_sort_form'),
    'access arguments' => array('access content'),
  );

  return
$items;
}

/**
* Form for re-ordering draggabledemo
*/
function draggabledemo_sort_form($node) {
  $data = array(
            0 => 'First One',
            1 => 'Another One',
            2 => 'Some One',
          );
  $form = array();
  $form['list']['#tree'] = TRUE;
  $form['list']['#theme'] = 'draggabledemo_list_sort_form';
  foreach ($data AS $key => $title) {
    $form['list'][$key]['title'] = array('#value' => $title);
    $form['list'][$key]['sort'] = array('#type' => 'weight', '#delta' => count($data), '#default_value' => $key);
  }

 
$form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );

  return
$form;
}

/**
* Theme the re-ordering form
*/
function theme_draggabledemo_list_sort_form($form) {
  drupal_add_tabledrag('draggabledemo-sort', 'order', 'sibling', 'sort');
  $header = array('', 'title', 'sort');
  foreach (element_children($form) as $key) {
    // Add class to group weight fields for drag and drop.
    $form[$key]['sort']['#attributes']['class'] = 'sort';

    $row = array(''); //This is important. We need to start with an empty element for the drag handle.

    $row[] = drupal_render($form[$key]['title']);
    $row[] = drupal_render($form[$key]['sort']);
    $rows[] = array('data' => $row, 'class' => 'draggable'); //note the difference between $row and $rows
  }
  $output = theme('table', $header, $rows, array('id' => 'draggabledemo-sort'));
  $output .= drupal_render($form);
  return $output;
}

/**
* Implementation of hook_theme
*/
function draggabledemo_theme() {
  return array(
    'draggabledemo_list_sort_form' => array(
      'arguments' => array('form' => NULL),
    ),
  );
}






//Join Example
$query = db_select("field_data_field_age", "a");
$query->join("field_data_field_gender", "g", "a.entity_id = g.entity_id");
$query->join("field_data_field_phone_number", "p", "a.entity_id = p.entity_id AND g.entity_id = p.entity_id");
$query->join("field_data_field_student", "s", "a.entity_id = s.entity_id AND g.entity_id = s.entity_id AND p.entity_id = s.entity_id");
$query->join("field_data_field_live", "l", "a.entity_id = l.entity_id AND g.entity_id = l.entity_id AND p.entity_id = l.entity_id AND s.entity_id = l.entity_id");
$query->groupBy("p.entity_id");
$query->fields("p", array("field_phone_number_value"))
    ->condition("a.field_age_value", $values["age_lower"], '>=')
    ->condition("a.field_age_value", $values["age_upper"], '<=')
    ->condition("l.field_live_value", "Yes", =)
    ->condition("g.field_gender_value", $values["gender"], '=');

$phone_numbers = $query->execute();

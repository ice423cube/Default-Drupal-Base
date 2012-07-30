<?php
/**
 * @file
 * Theme callback for the rotation_main_block_form form
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
function theme_rotation_main_block_form($variables) {
  $form = $variables['form'];

  // Initialize the variable which will store our table rows
  $rows = array();

  // Iterate over each element in our $form['rotation_main_items'] array
  foreach (element_children($form['rotation_main_items']) as $key => $id) {
    
    //$idString = '"'.$id.'"';
    
    //print $idString . ' ';
    
    // Before we add our 'weight' column to the row, we need to give the
    // element a custom class so that it can be identified in the
    // drupal_add_tabledrag call.
    //
    // This could also have been done during the form declaration by adding
    //     '#attributes' => array('class' => 'rotation-main-item-weight'),
    // directy to the 'weight' element in tabledrag_example_simple_form().
    //$form['rotation_main_items'][$id]['weight']['#attributes']['class'] = array('rotation-main-item-weight')array('rotation-main-item-weight', 'rotation-main-item-weight-' . $delta);
    $form['rotation_main_items'][$id]['weight']['#attributes']['class'] = array('rotation-main-item-weight');


    // We are now ready to add each element of our $form data to the $rows
    // array, so that they end up as individual table cells when rendered
    // in the final table.  We run each element through the drupal_render()
    // function to generate the final html markup for that element.
    $rows[] = array(
      'data' => array(
        //Add our 'name' column
        drupal_render($form['rotation_main_items'][$id]['name']),
        
        //Add our 'description' column
        //drupal_render($form[$id]['description']),
        
        // Add our 'weight' column
        drupal_render($form['rotation_main_items'][$id]['weight']),
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
  //$header = array(t('Name'), t('Description'), t('Weight'));
  $header = array(t('Name'), t('Weight'));

  // We also need to pass the drupal_add_tabledrag() function an id which will
  // be used to identify the <table> element containing our tabledrag form.
  // Because an element's 'id' should be unique on a page, make sure the value
  // you select is NOT the same as the form id used in your form declaration.
  $table_id = 'rotation-main-items-table';

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
  drupal_add_tabledrag($table_id, 'order', 'sibling', $group = 'rotation-main-item-weight', NULL, NULL, FALSE);
 
 
  //var_dump($form['rotation_main_items']);
  
  return $output;
}
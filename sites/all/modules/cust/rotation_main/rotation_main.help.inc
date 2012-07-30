<?php
// $Id$

/**
 * @file
 * Admin page callback for the rotation module.
 */

/**
 * Builds and returns the trails settings form.
 */
function rotation_main_help() {
  
  
  //START OF FORM

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
}


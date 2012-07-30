// $Id:$

CONTENTS OF THIS FILE
---------------------

- Introduction
- Installation
- Additional Information


INTRODUCTION
------------

Current Maintainer: Joe Roberts <no drupal url yet or email address>

This is where you would put an example of what the module does and why it would be needed.


INSTALLATION
------------

This should outline a step-by-step explanation of how to install the module.

1. Install as usual, see http://drupal.org/node/70151


ADDITIONAL INFORMATION
-------------------------------------------------------

1. Getting Started with your first Rotation
2. Adding an Additional Rotation Steps
3. Configuring the Rotation Tips and Tricks
4. Different Style Rotation and Settings
5. Can I have a single Rotation Item show up in more than one place
6. Known Issues


1. Getting Started with your first Rotation:
-Instal Weight Module
-Instal Module
-Go to the Rotation Module Configuration page Configuration > Content Authoring > Rotation Module (/admin/config/content/rotation)
	-Configure it they way you want it to show up across all Rotations.
	-Be sure to read all the notes under each input to help you figure out how to best use the rotation.
	-Hit Save
-Edit Rotation Item Nodes to be what content you want
-Go to the blocks Structure > Blocks (/admin/structure/block) and drag the block "Rotation Location # (Rotation Main)" to the Content Area above the "Main Page Content" so the rotation appears on top.
-Hit Save Blocks
-Configure the block "Rotation Location # (Rotation Main)" in this case since is our first one it is Rotation Location 1 (Rotation Main)
	-Select the Location you want from the drop down. Since this is the first Rotation we will use the default location "Home Page" you can use this for any page it doesn't have to be the Home Page it is just a place holder name and you can even change the name in the taxonomy section of the website.
		-Don't see what you are looking for or want to change the defualt "Home Page" to a defferent name. Add a new or edit the vocabulary term Rotation Location by going to Structure >  Taxonomy > Rotation Locations  (/admin/structure/taxonomy/rotation_tax)
	-Change the "Visibility settings" and make sure that "Pages" is set to "Only The Listed Pages" and then put in the page you want this to show up on. Example use <front> will only display this block on the front page. If you do not do this it will automatically show up on every page.  In this example we will use <front> for the home page.
	-Hit Save
	-Select the block "Rotation Location 1 (Rotation Main)" again and configure it
	-Now re-order the Rotations to the order that you want
	-Hit Save
-Your roations should be displaying on the page you specified in the "Visibility Settings" inside the block. In this case it was <front>.



2. Adding an Additional Rotation Steps:
-Go to the Rotation Module Configuration page Configuration > Content Authoring > Rotation Module (/admin/config/content/rotation)
	-Update the "Total Number of Rotations" to the desired number of rotations in the case we want to add one more so we will change the number to "2"
	-Hit Save
-Add a new vocabulary term by going to Structure >  Taxonomy > Rotation Locations(/admin/structure/taxonomy/rotation_tax)
	-Add Term
	-Name it what you want (Usually a good practice to name it the same as the title) we will call it "Training"
	-Description is optional
	-Hit save
-Add new content that is the content type of Roation Item (/node/add/rotation-main)
	-Add in the required fields and hit save.
	-Under Location Select the newly created Taxonomy Term "Training"
	-Continue adding until all nodes you want for the new rotation have been created
	-Hit Save
-Go to the blocks Structure > Blocks (/admin/structure/block) and drag the block "Rotation Location # (Rotation Main)" to the Content Area above the "Main Page Content" so the rotation appears on top.
-Hit Save Blocks
-Configure the block "Rotation Location # (Rotation Main)" in this case it would be Rotation Location 2 (Rotation Main)
	-Select the Location you want from the drop down. We wil be selecting "Training" since we just created that taxonomy term.
		-Don't see what you are looking for or want to change the defualt "Home Page" to a defferent name. Add a new or edit the vocabulary term Rotation Location by going to Structure >  Taxonomy > Rotation Locations  (/admin/structure/taxonomy/rotation_tax)
	-Change the "Visibility settings" and make sure that "Pages" is set to "Only The Listed Pages" and then put in the page you want this to show up on. In this case we want it to only display on the Training page which is "training".
	-Hit Save
	-Select the block "Rotation Location 2 (Rotation Main)" again and configure it
	-Now re-order the Rotations to the order that you want
	-Hit Save
-Your roations should be displaying on the page you specified in the "Visibility Settings" inside the block. In this case it was "/training".






3. Configuring the Rotation Tips and Tricks:
-Total Number of Rotations: Enter the Number of Rotation you would like to display on this website. This will create a block for each of the sites so you can place it on the pages that you want to.

-Entire Rotation Information
	-Large Image Width: Choose a Width for your Large Image. Please Note: Make sure the images you are posting are set to this width. If they are larger they will be cropped.
	-Large Image Height: Choose a Height for your Large Image. Please Note: Make sure the images your are posting are set to this height. If they are larger they will be cropped.
	-Rotation Transition Time: In milliseconds 1,000 = 1 second.
	-Entire Background Color: Drag the color chart below to pick a color. The outside ring selects the color and the inside square changes the lightness or darkness of that color.  It is a good idea to match your background color.
	-Entire Rotation Rounded Corners: Rounds all the corners to help it not look so boxy-looking.
-Overlay Information
	-Selected Overlay Positions: Choose a position for the overlay area to display.  You can choose from Bottom, Top, Left or Right.
	-Overlay Width: Please Note: Remember if you choose top or bottom this field will be ignored. Choose a Width for the overlay area of 200px wide use "200".  Leave off the "px".
	-Overlay Height: Please Note: Remember if you choose right or left this field will be ingnored. Choose a Height for the overlay area of 100px tall use "100".  Leave off the "px".
	-Overlay Text Color: Please Note: The font-family and font-size will be inherited from your style sheet. Feel free to edit the class by changing (Rotation Links = .rotationLinks class) and/or (Rotation Header = .rotationHeader class).
	-Overlay Background Color: Drag the color chart below to pick a color. The outside ring selects the color and the inside square changes the lightness or darkness of that color.
	-Overlay Background Opacity: Choose a value between 0 (Completely Transparent) and 1 (Solid Color). Example: 0.80 is 80% transparent. If you do not want an overlay at all just set this value to 0.
-Filmstrip Information
	-Filmstip Position: You can change where the filmstrip shows up.  Select bottom, top or No Film Strip. No Film Strip will remove the filmstrip completely.
	-Filmstip Style: There are two styles you can setup for your filmstrip. Thumbnails = More traditional style with a thumbnail in the filmstrip. Numbers with Pop-up Thumbnails = Adds smaller numbers into the filmstrip area and allows you to use the thumbnails as popups to preview what is available for that number. It also allows you to use the captions as text to display what is available underneith the thumbnail.
	-Edit Thumbnail Information
		-Thumbnail Width: Choose a Width for your thumbnail images. If Filmstrip Style is set to "Numbers with Pop-up Thumbnails" then this value also determines the width of the pop-up. Please Note: Make sure the images you are posting are set to this width. If they are larger they will be cropped.
		-Thumbnail Height: Choose a Height for your thumbnail images. If Filmstrip Style is set to "Numbers with Pop-up Thumbnails" then this value is ignored. Please Note: Make sure the images you are posting are set to this height. If they are larger they will be cropped.
		-Numbers with Pop-up Thumbnails Background Color Only: If Filmstrip Style is set to "Thumbnails" then this value is ignored. This controls the color of the background of the numbers and the pop-up. Drag the color chart below to pick a color. The outside ring selects the color and the inside square changes the lightness or darkness of that color.
	-Edit Caption Information
		-Show Captions: Selecting "yes" will allow you to see captions under each thumbnail in the filmstrip.
		-Captions Height: This is the height of the caption area. 20 = 20px in height. If you have a longer caption you might want to make this a larger number. You can adjust the line-height be changing the ".caption" class.
		-Caption Text Color: Drag the color chart below to pick a color. The outside ring selects the color and the inside square changes the lightness or darkness of that color.
	-Filmstip Selected Image Border Color: Drag the color chart below to pick a color. The outside ring selects the color and the inside square changes the lightness or darkness of that color.
	-Filmstip Arrows and Pointer Color: Drag the color chart below to pick a color. The outside ring selects the color and the inside square changes the lightness or darkness of that color.



4. Different Style Rotation and Settings:
-Without Thumbnails: This setting has no thumbnails and it has arrows that overly the main large image which allow you to advance your rotation.
	-Settings: 
		-Set the "Filmstip Position" to "No Film Strip."
		-Optional: Without Overlay Background Color set "Overlay Background Opacity" to 0.
		-Optional: Add Rounded corners for a different look select "yes" for "Entire Rotation Rounded Corners"
-Standard with Thumbnails: Basic Large Image with Thumbnails below it.
	-Settings: 
			-Set the "Filmstip Position" to "top" or "bottom" depending on where you want the thumbnails to show up
			-Set the "Filmstip Style" to "Thumbnails"
			-Optional: Without Overlay Background Color set "Overlay Background Opacity" to 0.
			-Optional: Add Rounded corners for a different look select "yes" for "Entire Rotation Rounded Corners"
-Numbers with Pop-up Thumbnails: Large image with smaller numbers and a pop-up preview of the thumbnail and captions if used.
	-Settings: 
			-Set the "Filmstip Position" to "top" or "bottom" depending where you want the numbers and pop-up thumnails to show up.
			-Set the "Filmstip Style" to "Thumbnails"
			-Optional: Without Overlay Background Color set "Overlay Background Opacity" to 0.
			-Optional: Add Rounded corners for a different look select "yes" for "Entire Rotation Rounded Corners"



5. Can I have a single Rotation Item show up in more than one place:
Yes, it is easy.  All you have to do is open the node that you want to share across multiple Locations and scroll down to the Locations section and check any additional locations you want it to show up in.  There is a known issue that the is only one weight.  So you might have to work the wieghts between the mulitple to get it to show up where you want in each rotation.  But aside from that it is simple.	



6. Known Issues:
-Numbers with Pop-up Thumbnails can not have to many listing in it or it breaks and hides the arrows.
-One Rotation Item in multiple places needs to be played with because there is only one weight field per item.
-Multiple JS scripts with the same name does cause bugs.  You might need to remove them from your theme.


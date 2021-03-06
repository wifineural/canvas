Feature: Decorators

	** Make sure the test harness is running and listening to http://localhost:3001 ***

	As a human
	I want to create a canvas
	So I can build a graph

	Scenario: Test for adding a decorator to a node
		Then I resize the window size to 1200 width and 800 height

		Given I am on the test harness
		Given I have uploaded palette "modelerPalette.json"
		Given I have uploaded diagram "decoratorCanvas.json"

		Given I have toggled the app side api panel
		Given I have selected the "Set Node Decorations" API

		# Add a new decoration to the top left position
		When I select node "No Decorator" in the node drop-down list
		Then I update the decorations text area with ""[{"id": "123", "position": "topLeft"}]""
		And I call the API by clicking on the Submit button
		Then I verify node "No Decorator" has 1 decorators
		Then I verify node "No Decorator" has a decorator with id "123" at position x 10 y 5

		# Move the decoration to the top right position
		Then I update the decorations text area with ""[{"id": "123", "position": "topRight"}]""
		And I call the API by clicking on the Submit button
		Then I verify node "No Decorator" has 1 decorators
		Then I verify node "No Decorator" has a decorator with id "123" at position x 46 y 5

		# Add a new decoration to the bottom left position along with the existing decoration
		When I select node "No Decorator" in the node drop-down list
		Then I update the decorations text area with ""[{"id": "123", "position": "topRight"}, {"id": "345", "position": "bottomLeft"}]""
		And I call the API by clicking on the Submit button
		Then I verify node "No Decorator" has 2 decorators
		Then I verify node "No Decorator" has a decorator with id "123" at position x 46 y 5
		Then I verify node "No Decorator" has a decorator with id "345" at position x 10 y 41

		# Replace decorations with a new decoration at the bottom right position with an image and a hotspot
		When I select node "No Decorator" in the node drop-down list
		Then I update the decorations text area with ""[{"id": "678", "position": "bottomRight", "image": "/images/decorators/zoom-in_32.svg", "hotspot": true}]""
		And I call the API by clicking on the Submit button
		Then I verify node "No Decorator" has 1 decorators
		Then I verify node "No Decorator" has a decorator with id "678" at position x 46 y 41
		Then I verify node "No Decorator" has a decorator with id "678" which has an image "/images/decorators/zoom-in_32.svg"

		# Click on the hot spot and make sure it calls the callback function
		Then I click on the hotspot for decorator "678" on the "No Decorator" node
		Then I verify an entry in the console was made for the decorationHandler on decorator "678"

		# Add a decoration at a customized position
		Then I update the decorations text area with ""[{"id": "999", "x_pos": -20, "y_pos": -25}]""
		And I call the API by clicking on the Submit button
		Then I verify node "No Decorator" has 1 decorators
		Then I verify node "No Decorator" has a decorator with id "999" at position x -20 y -25

		# Add a two label decorations at customized positions
		Then I update the decorations text area with ""[{"id": "label_1", "x_pos": -20, "y_pos": -25, "label": "A first test label"}, {"id": "label_2", "x_pos": 40, "y_pos": 90, "label": "A second test label"}]""
		And I call the API by clicking on the Submit button
		Then I verify node "No Decorator" has 2 label decorators
		Then I verify node "No Decorator" has a label decorator with id "label_1" with label "A first test label" at position x -20 y -25
		Then I verify node "No Decorator" has a label decorator with id "label_2" with label "A second test label" at position x 40 y 90

		# Check the Big Node decorators are all positioned correctly based on their anchor nodePositions
		Then I verify node "Big Node" has 9 decorators
		Then I verify node "Big Node" has a decorator with id "1" at position x 0 y 0
		Then I verify node "Big Node" has a decorator with id "2" at position x 35 y 0
		Then I verify node "Big Node" has a decorator with id "3" at position x 70 y 0
		Then I verify node "Big Node" has a decorator with id "4" at position x 0 y 80
		Then I verify node "Big Node" has a decorator with id "5" at position x 35 y 80
		Then I verify node "Big Node" has a decorator with id "6" at position x 70 y 80
		Then I verify node "Big Node" has a decorator with id "7" at position x 0 y 160
		Then I verify node "Big Node" has a decorator with id "8" at position x 35 y 160
		Then I verify node "Big Node" has a decorator with id "9" at position x 70 y 160

	Scenario: Test for adding a decorator to a link
		Then I resize the window size to 1200 width and 800 height

		Given I am on the test harness
		Given I have uploaded palette "modelerPalette.json"
		Given I have uploaded diagram "decoratorCanvas.json"

		Then I verify link "Top Left-Top Right" has 3 decorators
		Then I verify link "Bottom Left-Bottom Right" has 3 decorators

		Then I verify link "Top Left-Top Right" has a decorator with id "assocDec1" at position x 370 y 133.5
		Then I verify link "Top Left-Top Right" has a decorator with id "assocDec2" at position x 478 y 133.5
		Then I verify link "Top Left-Top Right" has a decorator with id "assocDec3" at position x 586 y 133.5

		Then I verify link "Bottom Left-Bottom Right" has a decorator with id "123" at position x 373 y 225
		Then I verify link "Bottom Left-Bottom Right" has a decorator with id "456" at position x 478 y 225
		Then I verify link "Bottom Left-Bottom Right" has a decorator with id "789" at position x 583 y 225

		Given I have toggled the app side api panel
		Given I have selected the "Set Link Decorations" API

		# Remove all decorations from the association link
		When I select link "Top Left-Top Right" in the link drop-down list
		Then I update the decorations text area with ""[]""
		And I call the API by clicking on the Submit button
		Then I verify link "Top Left-Top Right" has 0 decorators

		# Remove all decorations from the node data link
		When I select link "Bottom Left-Bottom Right" in the link drop-down list
		Then I update the decorations text area with ""[]""
		And I call the API by clicking on the Submit button
		Then I verify link "Bottom Left-Bottom Right" has 0 decorators

		# Add a rectangle decorator to association link
		When I select link "Top Left-Top Right" in the link drop-down list
		Then I update the decorations text area with ""[{"id": "123"}]""
		And I call the API by clicking on the Submit button
		Then I verify link "Top Left-Top Right" has 1 decorators

		# Add a label decorator to association link
		Then I update the decorations text area with ""[{"id": "123", "label": "Link Decoration"}]""
		And I call the API by clicking on the Submit button
		Then I verify link "Top Left-Top Right" has 1 label decorators

		# Add an image decorator with a hotspot to the node data link
		When I select link "Bottom Left-Bottom Right" in the link drop-down list
		Then I update the decorations text area with ""[{"id": "456", "position": "source", "image": "/images/decorators/zoom-in_32.svg", "hotspot": true}]""
		And I call the API by clicking on the Submit button
		Then I verify link "Bottom Left-Bottom Right" has 1 decorators

		# Click on the hotspot and make sure it works
		Then I click on the hotspot for decorator "456" on the "Bottom Left-Bottom Right" link
		Then I verify an entry in the console was made for the decorationHandler on decorator "456"

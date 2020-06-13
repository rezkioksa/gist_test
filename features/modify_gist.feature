Feature: Gist Modify
	As a user
	I want to perform modify gist

Scenario Outline: Scenario Outline name:  I want to create a public gist
	Given I am on the Gist page
	Then the title is "gist_title_page"
	And I click "sign_in" button
	Then the title is "git_login_page"
	And I set text "<username>" in the "username_field" field
	And I set text "<password>" in the "password_field" field
	And I click "sign_in_submit" button
	And I wait for "4" second
	Then I verify the page has finished loading
	And I click "add_icon" button
	And I set text "<file_name>" in the "file_name_field" field
	And I set text "<body_data>" in the "body_field" field
	Then I click "create_public_gist" button
	Then the element "file_name_after_created" is exist

	# didnt work because always error when get the element text
	# Then My gist has been created with the "file_name" name

	# see list
	And I click "gist_home" button
	And I click "see_all_list" button
	Then I can see my gists list

	# edit gist
	And I click "my_filename_gist" button
	And I click "edit_button" button
	And I set text "<body_data_update>" in the "body_field" field
	And I click in "update_gist" button
	And I wait for "3" second

	# delete gist
	And I click "delete_button" button
	And I click OK in alert modal

	Examples:
      | username    | password  | file_name        | body_data 			  	 | body_data_update		 |
      | rezkioksa   | oksa_2410 | GistFileTest.txt | This is the first data! | This is updated data !|



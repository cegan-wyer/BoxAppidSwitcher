# Box Appid Switcher
A simple Chrome extension that replaces instances of 5-6 digits with a new number

I made this to alleviate an annoying repetitive task associated with my job - manually changing id numbers in all of the urls open in a window. This way I can just enter the new ID I want it to change to and all the tabs in the window will update with the new ID.

This will ignore any tab with a URL that contains the word "search" as well as tabs not in the active window.

New in version 1.4:
- Support for 6 digit appids
- Improved input validation
- Added validation for XDOC to change the URL back to the standard 
	format if "DocumentId" is detected in the URL

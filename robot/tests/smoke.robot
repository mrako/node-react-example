*** Settings ***

Resource   ${PROJECTROOT}${/}resources${/}common.robot

Test Teardown       Close All Browsers

*** Test cases ***

Should be able to show the homepage
    Open browser and go to homepage
    Verify homepage is open

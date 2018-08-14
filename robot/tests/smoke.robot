*** Settings ***

Resource   ${PROJECTROOT}${/}resources${/}common.robot

Test Teardown       Close All Browsers

*** Test cases ***

Should open the homepage
    Open browser and go to homepage
    Verify homepage is open

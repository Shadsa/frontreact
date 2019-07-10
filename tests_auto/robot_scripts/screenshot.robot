*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${REFBROWSER}   %{BROWSER}

*** Test Cases ***
The user can access to the app and see the home
    Open browser    %{URL}   ${REFBROWSER}
    Capture Page Screenshot		home.png
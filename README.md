## Local Setup

Step 1: Install nvm and node 18.

Step 2: Install freshworks CLI, follow the steps given in the below link to setup CLI
 - https://developers.freshworks.com/docs/app-sdk/v2.3/freshdesk/app-development-process/#install-the-fdk-+-cli

Step 3: `fdk run`

Step 4: Login with your freshdesk account, append `?dev=true` in the URL and reload the page to see the `Customer orders` page from the left side navigation menu (last menu item).

    Ex: https://gowthamrajrajendran.freshdesk.com/a/apps/indev-freshworksassignment?dev=true

## Customer orders App

This app displays the customer details and order details in the customer orders details page.

### Files and Folders
    .
    ├── README.md                 A file for your future self and developer friends to learn about app
    ├── app                       A folder to place all assets required for frontend components
    │   ├── index.html            A landing page for the user to use the app
    │   ├── scripts               JavaScript to place files frontend components business logic
    │   │   └── app.js
    │   └── styles                A folder to place all the styles for app
    │       ├── images
    │       │   └── icon.svg
    │       └── style.css
    ├── config                    A folder to place all the configuration files
    │   └── iparams.json
    └── manifest.json             A JSON file holding meta data for app to run on platform

Explore [more of app sample apps](https://community.developers.freshworks.com/t/freshworks-sample-apps/3604) on the Freshworks github respository.


Note:
1. If the AWS EC2 domain/IP changes, Please update the `AWS_DOMAIN` URL from the `order-details.js`.
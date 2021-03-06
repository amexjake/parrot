const webstoreClient = require('chrome-webstore-upload');
const fs = require('fs');
const path = require('path');

const parrotPath = path.join(__dirname, '..', 'parrot-devtools-extension.zip');
const parrotZipFile = fs.createReadStream(parrotPath);
const target = 'default'; // optional. Can also be 'trustedTesters'

const webStore = webstoreClient({
  extensionId: process.env.CHROME_WEBSTORE_PARROT_DEVTOOLS_APP_ID,
  clientId: process.env.CHROME_WEBSTORE_CLIENT_ID,
  clientSecret: process.env.CHROME_WEBSTORE_CLIENT_SECRET,
  refreshToken: process.env.CHROME_WEBSTORE_REFRESH_TOKEN,
});

webStore
  .fetchToken()
  .then(token => {
    // Token is a string
    console.log('token fetching success');
    webStore
      .uploadExisting(parrotZipFile, token)
      .then(uploadRes => {
        // Response is a Resource Representation
        // https://developer.chrome.com/webstore/webstore_api/items#resource
        console.log(uploadRes);
      })
      .catch(e => console.error(`error uploading zip: ${e}`));

    // webStore.publish(target, token).then(res => {
    //   // Response is documented here:
    //   // https://developer.chrome.com/webstore/webstore_api/items/publish
    // });
  })
  .catch(e => console.error(`error fetching token: ${e}`));

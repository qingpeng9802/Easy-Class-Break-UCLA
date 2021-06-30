// https://developers.google.com/web/ilt/pwa/integrating-analytics
// Analytics and service worker

'use strict';

// Set this to your tracking ID
const trackingId = 'UA-154846897-1';

function sendAnalyticsEvent(addedPayload) {

  console.log('Sending analytics event...');

  return self.registration.pushManager.getSubscription()
  .then(function(subscription) {
    /*
    if (subscription === null) {
      throw new Error('No subscription currently available.');
    }*/

    // Create hit data
    let payloadData = {
      // Version Number
      v: 1,
      // Client ID
      //cid: subscription.endpoint,

      // TODO: Now, there is no reliable solution to get unique id
      // in the service worker in the extension,
      // waiting for further improvement and discussion of manifest V3
      cid: '82cf2a45-a373-4d5b-8a44-b96fba9589a2',
      // Tracking ID
      tid: trackingId
    };

    payloadData = Object.assign(payloadData, addedPayload);

    // Format hit data into URI
    const payloadString = Object.keys(payloadData)
    .filter(function(analyticsKey) {
      return payloadData[analyticsKey];
    })
    .map(function(analyticsKey) {
      return analyticsKey + '=' + encodeURIComponent(payloadData[analyticsKey]);
    })
    .join('&');

    // Post to Google Analytics endpoint
    console.log(JSON.stringify(payloadString));
    return fetch('https://www.google-analytics.com/collect', {
      method: 'post',
      body: payloadString
    });
  })
  .then(function(response) {
    if (!response.ok) {
      return response.text()
      .then(function(responseText) {
        throw new Error(
          'Bad response from Google Analytics:\n' + response.status
        );
      });
    } else {
      console.log(JSON.stringify(addedPayload) + 'sent, check the Analytics dashboard!');
    }
  })
  .catch(function(err) {
    console.warn('Unable to send the analytics event', err);
  });
}

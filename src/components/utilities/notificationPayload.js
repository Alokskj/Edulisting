export function notificationPayload (userName){
    return({
        title: `You received a new message from ${userName}`,
        body: 'Check your new messages on EduListing',
        click_action: 'https://edulisting.in/',
        icon: '/images/icons/edulisitingRounded.png',
        tag: 'message-notification',
        requireInteraction: true,
        vibrate: [200, 100, 200],
      })
  };
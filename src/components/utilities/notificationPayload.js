export function notificationPayload (userName){
    return({
        title: `${userName} just message you`,
        body: 'Checkout your new messages on edulisting',
        click_action: 'https://edulisting.in/',
        icon: '/images/icons/edulisitingRounded.png',
        tag: 'message-notification',
        
      })
  };
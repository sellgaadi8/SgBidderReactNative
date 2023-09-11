type ON_PUSH_NOTIFICATION = 'sgSeller/notifications/push-notification';

type PushNotificationClickAction = 'details_page' | 'deal_won_page';

type PushNotificationState = {
  body: string;
  title: string;
  click_to_action: {
    id: string;
    page: PushNotificationClickAction;
  } | null;
  called: boolean;
};

type PushNotificationAction = {
  type: ON_PUSH_NOTIFICATION;
  payload: PushNotificationState;
};

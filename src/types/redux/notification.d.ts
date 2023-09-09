type NotificationItem = {
  id: string;
  uuid: string;
  type_id: string;
  type_value: string;
  user_id: string;
  message: string;
  title: string;
  click_action: PushNotificationClickAction;
  is_read: number;
  is_important: string;
  status: string;
  created_at: string;
  updated_at: string;
  btn_label: string;
  extra_details: string;
};

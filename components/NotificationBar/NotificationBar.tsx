import { useAppSelector } from '@/app/lib/hooks';
import { Notification } from '@mantine/core';

function NotificationBar() {
  const { notificationBarState } = useAppSelector(state => state.store)
  return (
    notificationBarState.show ?
      <Notification withBorder title={notificationBarState.title} color={notificationBarState.isError === true ? 'red' : 'blue'} withCloseButton >
        {notificationBarState.description}
      </Notification>
      : null
  );
}

export default NotificationBar
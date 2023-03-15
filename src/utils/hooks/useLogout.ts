import { awsOnSignOut } from 'src/services/aws';
import { deleteHttpNotificationDevice } from 'src/services/http';
import { useNotificationStore, usePersistStore, useUserStore } from 'src/store';
import { useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
    const { resetCount } = useNotificationStore();
    const { setUserAuth } = useUserStore();
    const { deviceUniqueId } = usePersistStore();

    const queryClient = useQueryClient();

    const onLogout = async () => {
        setUserAuth({ loading: true, type: 'none' });
        if (deviceUniqueId) {
            await deleteHttpNotificationDevice(deviceUniqueId);
        }
        awsOnSignOut();
        resetCount(); // Reset Notifications
        queryClient.clear(); // Clear all queries
    };

    return onLogout;
};

export default useLogout;

import { awsOnSignOut } from 'src/services/aws';
import { deleteHttpNotificationDevice } from 'src/services/http';
import { useNotificationStore, usePersistStore, useUserStore } from 'src/store';
import { useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
    const { resetCount } = useNotificationStore();
    const { setAuthLoading } = useUserStore();
    const { deviceUniqueId } = usePersistStore();

    const queryClient = useQueryClient();

    const onLogout = async () => {
        setAuthLoading(true);
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

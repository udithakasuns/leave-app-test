import { awsOnSignOut } from 'src/services/aws';
import { deleteHttpNotificationDevice } from 'src/services/http';
import { usePersistStore, useUserStore } from 'src/store';
import { useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
    const { setAuthLoading } = useUserStore();
    const { deviceUniqueId } = usePersistStore();

    const queryClient = useQueryClient();

    const onLogout = async () => {
        setAuthLoading(true);
        if (deviceUniqueId) {
            await deleteHttpNotificationDevice(deviceUniqueId);
        }
        awsOnSignOut();
        queryClient.clear();
    };

    return onLogout;
};

export default useLogout;

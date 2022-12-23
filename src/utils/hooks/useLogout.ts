import { awsOnSignOut } from 'src/services/aws';
import { deleteHttpNotificationDevice } from 'src/services/http';
import { usePersistStore, useUserStore } from 'src/store';

const useLogout = () => {
    const { setAuthLoading } = useUserStore();
    const { deviceUniqueId } = usePersistStore();

    const onLogout = async () => {
        setAuthLoading(true);
        if (deviceUniqueId) {
            await deleteHttpNotificationDevice(deviceUniqueId);
        }
        awsOnSignOut();
    };

    return onLogout;
};

export default useLogout;

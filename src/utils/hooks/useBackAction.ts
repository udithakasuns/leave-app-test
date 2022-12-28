import { useNavigation } from '@react-navigation/native';
import { DrawerScreenNavigationProp } from 'src/navigators/types';
import { useNotificationStore } from 'src/store';

const useBackAction = () => {
    const navigation = useNavigation<DrawerScreenNavigationProp>();
    const { notifyUserRole } = useNotificationStore();

    const onGoBack = () => {
        if (notifyUserRole === 'MANAGER') {
            navigation.jumpTo('ManagerHome');
            return true;
        }
        navigation.jumpTo('EmployeeHome');
        return true;
    };

    return onGoBack;
};

export default useBackAction;

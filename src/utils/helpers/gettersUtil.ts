import jwtDecode from 'jwt-decode';
import { AccessTokenPayload } from 'src/services/aws/types';
import { UserRole } from '../types';

export const getCurrentUserRoleFromToken = (accessToken: string): UserRole => {
    const decodedAccesToken: AccessTokenPayload = jwtDecode(accessToken);
    const cognitoUserGroups = decodedAccesToken['cognito:groups'];
    let userRole: UserRole = 'employee';
    if (
        cognitoUserGroups &&
        cognitoUserGroups.find(user => user === 'managers')
    ) {
        userRole = 'manager';
    }
    return userRole;
};

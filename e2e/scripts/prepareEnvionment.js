/* eslint-disable */

const mysql = require('mysql2/promise');
const moment = require('moment');

async function getConnection() {
    const { LEAVE_DB_URL } = process.env;
    const { LEAVE_DB_USERNAME } = process.env;
    const { LEAVE_DB_PASSWORD } = process.env;
    const { LEAVE_DB_NAME } = process.env;
    const connection = await mysql.createConnection({
        host: LEAVE_DB_URL,
        user: LEAVE_DB_USERNAME,
        password: LEAVE_DB_PASSWORD,
        database: LEAVE_DB_NAME,
    });
    return connection;
}

async function resetUserLeaveEntitlements(connection, employeeUsername) {
    const monthDatePattern = `'${moment().format('YYYY')}-${moment().format(
        'MM',
    )}-%'`;

    const [userResults] = await connection.execute(
        `SELECT user_id FROM user WHERE email='${employeeUsername}'`,
    );
    const { user_id } = userResults[0];
    const [entitlementResults] = await connection.execute(
        `SELECT * FROM leave_entitlement WHERE employee_id = '${user_id}'`,
    );
    for (const entitlement of entitlementResults) {
        const { entitlement_id } = entitlement;
        await connection.execute(
            `UPDATE leave_entitlement SET total_hours_used = '0' WHERE (entitlement_id = '${entitlement_id}')`,
        );
    }
    await connection.execute(
        `DELETE FROM leave_request WHERE employee_id = '${user_id}'`,
    );
    await connection.execute(
        `UPDATE holiday SET is_active='0' WHERE date like ${monthDatePattern}`,
    );
    await connection.end();
    console.log(`Environment prepared successfully`);
}

(async () => {
    const EMPLOYEE_USERNAME = process.env.EMP_USERNAME;
    let connection;
    try {
        connection = await getConnection();
        await resetUserLeaveEntitlements(connection, EMPLOYEE_USERNAME);
    } catch (error) {
        if (connection) {
            await connection.end();
        }
        console.log('Error occured on environment preparation', error);
        process.exit(1);
    }
})();

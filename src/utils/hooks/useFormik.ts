/* eslint-disable no-duplicate-case */
import { UseMutateFunction } from '@tanstack/react-query';
import { FormikProps, useFormik as useForm } from 'formik';
import { ApplyFormValues } from 'src/utils/types';
import * as yup from 'yup';
import { showErrorToast } from '../alerts';
import { ErrorCodes } from '../helpers/errorCodes';
import { States } from '../types/index';

export const useFormik = (
    mutate: UseMutateFunction<
        any,
        unknown,
        Omit<ApplyFormValues, 'entitlements'>,
        unknown
    >,
) => {
    const registerValidationSchema = yup.object().shape({});

    const formik: FormikProps<ApplyFormValues> = useForm<ApplyFormValues>({
        validationSchema: registerValidationSchema,
        initialValues: {
            typeId: 0,
            requestDesc: '',
            startDate: '',
            endDate: '',
            entitlements: [],
        },
        onSubmit: values => {
            if (
                values.typeId === 0 &&
                values.startDate === '' &&
                values.leaveState === undefined
            ) {
                formik.setErrors({
                    typeId: 'error',
                    startDate: 'error',
                    leaveState: 'error',
                });
                showErrorToast(ErrorCodes.APPLY_CONFIRMATION_COMMON);
                return;
            }

            if (
                values.typeId === 0 &&
                values.leaveState === undefined &&
                values.endDate === ''
            ) {
                formik.setErrors({
                    typeId: 'error',
                    leaveState: 'error',
                });
                showErrorToast(ErrorCodes.APPLY_CONFIRMATION_COMMON);
                return;
            }

            if (
                values.leaveState === undefined &&
                values.endDate === '' &&
                values.startDate === ''
            ) {
                formik.setErrors({
                    leaveState: 'error',
                    startDate: 'error',
                });
                showErrorToast(ErrorCodes.APPLY_CONFIRMATION_COMMON);
                return;
            }

            if (values.typeId === 0 && values.startDate === '') {
                formik.setErrors({
                    typeId: 'error',
                    startDate: 'error',
                });
                showErrorToast(ErrorCodes.APPLY_CONFIRMATION_COMMON);
                return;
            }

            if (values.typeId === 0) {
                formik.setErrors({
                    typeId: 'error',
                });
                showErrorToast(ErrorCodes.APPLY_CONFIRMATION_LEAVE_TYPE);
                return;
            }

            if (values.startDate === '') {
                formik.setErrors({
                    startDate: 'error',
                });
                showErrorToast(ErrorCodes.APPLY_CONFIRMATION_DATE);
                return;
            }

            if (values.leaveState === undefined && values.endDate === '') {
                formik.setErrors({
                    leaveState: 'leaveStateError',
                });
                showErrorToast(ErrorCodes.APPLY_CONFIRMATION_DURATION);
                return;
            }

            let leaveState;
            if (values.endDate === '' && values.leaveState !== undefined) {
                leaveState = values.leaveState;
            }
            mutate({
                typeId: values.typeId,
                startDate: values.startDate,
                endDate:
                    values.endDate === '' ? values.startDate : values.endDate,
                requestDesc: values.requestDesc,
                leaveState: leaveState ?? States.FULLDAY,
            });
        },
    });
    return [formik];
};

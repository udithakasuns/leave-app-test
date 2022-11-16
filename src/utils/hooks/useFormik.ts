import { UseMutateFunction } from '@tanstack/react-query';
import { FormikProps, useFormik as useForm } from 'formik';
import { ApplyFormValues } from 'src/utils/types';
import * as yup from 'yup';

export const useFormik = (
    mutate: UseMutateFunction<
        any,
        unknown,
        Omit<ApplyFormValues, 'entitlements'>,
        unknown
    >,
) => {
    const registerValidationSchema = yup.object().shape({
        typeId: yup.string(),
    });

    const formik: FormikProps<ApplyFormValues> = useForm<ApplyFormValues>({
        validationSchema: registerValidationSchema,
        initialValues: {
            typeId: 1,
            requestDesc: '',
            startDate: '',
            endDate: '',
            entitlements: [],
        },
        onSubmit: values => {
            mutate({
                typeId: values.typeId,
                startDate: '2022-10-06',
                endDate: '2022-10-06',
                requestDesc: values.requestDesc,
                leaveState: values.leaveState,
            });
        },
    });
    return [formik];
};

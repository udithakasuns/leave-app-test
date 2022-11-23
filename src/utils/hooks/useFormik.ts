import { UseMutateFunction } from '@tanstack/react-query';
import { FormikProps, useFormik as useForm } from 'formik';
import { ApplyFormValues } from 'src/utils/types';
import * as yup from 'yup';
import { States } from '../types/index';

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
            console.log(values.startDate);
            console.log(values.endDate);
            mutate({
                typeId: values.typeId,
                startDate: values.startDate,
                endDate:
                    values.endDate === '' ? values.startDate : values.endDate,
                requestDesc: values.requestDesc,
                leaveState: States.FULLDAY,
            });
        },
    });
    return [formik];
};

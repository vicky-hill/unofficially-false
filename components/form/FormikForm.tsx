'use client'

import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormikInput from './FormikInput'

const validation = Yup.object().shape({
    email: Yup.string().optional(),
    projectName: Yup.string().optional()
});

interface Values {
    name: string;
    projectName: string;
}

const initialValues: Values = {
    name: '',
    projectName: ''
};

export default function FormikForm({ }) {
    const onSubmit = async (values: Values, { setSubmitting, resetForm }: any) => {
        try {
            setSubmitting(true);

            console.log(values);

            resetForm();
            setSubmitting(false);
        } catch (err) {
            console.log('Error submitting form:', err);
            setSubmitting(false);
        }
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validation}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <FormikInput name="name" />
                        <FormikInput name="projectName"  />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
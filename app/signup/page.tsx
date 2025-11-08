'use client'

import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormikInput from '@/components/form/FormikInput'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import api from '@/utils/api'
import { Button } from 'antd'

const validation = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required()
});

interface Values {
    email: string;
    password: string;
}

const initialValues: Values = {
    email: '',
    password: ''
};

export default function Signup({ }) {
    const onSubmit = async (values: Values, { setSubmitting, resetForm }: any) => {
        try {
            setSubmitting(true);

            const { email, password } = values;
            const { user }: any = await createUserWithEmailAndPassword(auth, email, password);

            const createdUser = await api.post('/users', {
                userId: user.uid,
                email
            });

            localStorage.setItem('token', user.accessToken);
 
            resetForm();
            setSubmitting(false);
        } catch (err) {
            console.log('Error submitting form:', err);
            setSubmitting(false);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-[90vh]'>
            <h1 className='mb-10'>Signup</h1>
          
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validation}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6 w-56">
                        <FormikInput name="email" />
                        <FormikInput name="password" />
                        <Button htmlType='submit' className='w-full mt-5'>Sign up</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
'use client'

import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormikInput from '@/components/form/FormikInput'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { useRouter } from 'next/navigation'
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

export default function Login({ }) {
    const router = useRouter();

    const onSubmit = async (values: Values, { setSubmitting, resetForm }: any) => {
        try {
            setSubmitting(true);

            const { email, password } = values;
            const { user }: any = await signInWithEmailAndPassword(auth, email, password);

            localStorage.setItem('token', user.accessToken);

            router.push('/drinks');

            resetForm();
            setSubmitting(false);
        } catch (err) {
            console.log('Error submitting form:', err);
            setSubmitting(false);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-[90vh]'>
            <h1 className='mb-10'>Login</h1>

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validation}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6 w-56">
                        <FormikInput name="email" />
                        <FormikInput name="password" />
                        <Button htmlType='submit' className='w-full mt-5'>Login</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
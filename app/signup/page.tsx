'use client'

import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormikInput from '@/components/form/FormikInput'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import api from '@/utils/api'
import Link from 'next/link'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import {checkUserSession, useCurrentUser} from '@/redux/slices/user.slice';


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
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
   const { isAuthenticated } = useCurrentUser();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            await dispatch(checkUserSession(user));
        });

        return unsubscribeAuth;
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/drinks')
        }
    }, [isAuthenticated])

    const onSubmit = async (values: Values, { setSubmitting, resetForm }: any) => {
        try {
            setSubmitting(true);

            const { email, password } = values;
            const { user }: any = await createUserWithEmailAndPassword(auth, email, password);

            await api.post('/users', {
                userId: user.uid,
                email
            });

            localStorage.setItem('token', user.accessToken);

            router.push('/drinks');

            dispatch(checkUserSession(user));

            resetForm();
            setSubmitting(false);
        } catch (err) {
            console.log('Error submitting form:', err);
            setSubmitting(false);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-[90vh]'>
            <h1 className='mb-10 text-neutral-50 text-3xl font-bold'>Sign Up</h1>
          
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validation}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6 w-[75%]">
                        <FormikInput name="email" />
                        <FormikInput type="password" name="password" />
                        <Button htmlType='submit' className='w-full mt-5 bg-[#363642]! text-neutral-50! hover:bg-[#42424e]! border-[#42424e]!'>Sign up</Button>
                    </Form>
                )}
            </Formik>
            
            <p className='text-neutral-400 text-sm mt-4'>
                Already have an account? <Link href='/login' className='text-neutral-50 hover:text-neutral-200'>Login</Link>
            </p>
        </div>
    )
}
'use client'

import { Setting } from '@/redux/slices/settings.slice'
import { Switch, Button } from 'antd'
import Link from 'next/link'
import { HiUsers } from 'react-icons/hi'
import Protect from '@/components/layout/Protect'
import { useState, useEffect } from 'react'
import api from '@/utils/api'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import FormikInput from '@/components/form/FormikInput'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { addDrink } from '@/redux/slices/drinks.slice'

const validation = Yup.object().shape({
    name: Yup.string().required(),
    price: Yup.number().required()
});

interface DrinkValues {
    name: string;
    price: string;
}

const initialValues: DrinkValues = {
    name: '',
    price: ''
};

export default function page() {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [settings, setSettings] = useState<any>(null);

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        getCurrentUser();
    }, [])

    useEffect(() => {
        currentUser?.isAdmin && getSettings();
    }, [currentUser])

    const getCurrentUser = async () => {
        const user = await api.get('/users/current');
        setCurrentUser(user);
    }

    const getSettings = async () => {
        const res: any = await api.get('/settings');
        setSettings({
            imagesOn: res.find((setting: Setting) => setting.name === 'images').active,
            logoOn: res.find((setting: Setting) => setting.name === 'logo').active,
            descriptionOn: res.find((setting: Setting) => setting.name === 'description').active,
        });
    }

    const onChange = async (name: 'images' | 'logo' | 'description', checked: boolean) => {
        const settingIds = {
            images: 1,
            logo: 2,
            description: 3 
        }

        try {
            await api.put(`/settings/${settingIds[name]}`, { active: checked });
            
            setSettings((settings: any) => ({
                ...settings,
                [`${name}On`]: checked
            }));
        } catch (err) {
            console.log(err);
        }
    }

    const onSubmit = async (values: DrinkValues, { setSubmitting, resetForm }: any) => {
        try {
            setSubmitting(true);

            dispatch(addDrink(values));
            
            resetForm();
            setSubmitting(false);
        } catch (err) {
            console.log('Error submitting form:', err);
            setSubmitting(false);
        }
    }

    if (!currentUser?.isAdmin || !settings) return null;

    return (
        <Protect>
            <div className='flex h-[80vh] flex-col justify-center items-center gap-5 relative'>
                <Link href='/admin'>
                    <HiUsers size={20} color='white' className='absolute top-7 right-9' />
                </Link>

                <p className='text-neutral-50 text-2xl font-bold mb-5'>Settings</p>
                <div className='w-full px-12 space-y-4'>
                    <div className='text-white flex gap-3'>
                        <Switch value={settings.imagesOn} className='w-3' onChange={(e) => onChange('images', e)} />
                        <p>Images</p>
                    </div>
                    <div className='text-white flex gap-3'>
                        <Switch value={settings.descriptionOn} className='w-3' onChange={(e) => onChange('description', e)} />
                        <p>Description</p>
                    </div>
                    <div className='text-white flex gap-3'>
                        <Switch value={settings.logoOn} className='w-3' onChange={(e) => onChange('logo', e)} />
                        <p>Logo</p>
                    </div>
                </div>

                <p className='text-neutral-50 text-2xl font-bold mb-5 mt-10'>Add drink</p>
                <div className='w-full px-12'>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validation}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                <FormikInput name="name" />
                                <FormikInput name="price" type="number" />
                                <Button htmlType='submit' className='w-full mt-5 bg-[#363642]! text-neutral-50! hover:bg-[#42424e]! border-[#42424e]!'>Add Drink</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Protect>
    )
}
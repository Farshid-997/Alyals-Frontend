'use client';

import UMBreadCrumb from '@/components/ui/UMBreadCrumb';


import { SelectOptions } from '@/components/Froms/FormMultiSelectField';
import FormSelectField from '@/components/Froms/FormSelectField';
import { useUserIdQuery } from '@/redux/api/adminApi/userApi';
import { useAddNotificationMutation } from '@/redux/api/notificationApi';
import { getUserInfo } from '@/services/auth.service';
import { Button, message } from 'antd';
import Form from '../../../../../components/Froms/Form';
import FormInput from '../../../../../components/Froms/FormInput';
import FormTextArea from '../../../../../components/Froms/FormTextArea';

function CreateNotificationPage() {
 const { userId } = getUserInfo() as any;
 const { data } = useUserIdQuery(userId);
 const id = data?.id;
  const [addNotification] = useAddNotificationMutation();
  const onSubmit = async (formData: any) => {
    try {

     const notificationData = {
       ...formData,
       userId: id,
     };
      const res = await addNotification(notificationData).unwrap();
    console.log("res",res)
      message.success('Notification  added successfully');
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const base = 'admin';

  const notificationType = ['promotional', 'normal', 'payment', 'service'];

  const notificationOptions = notificationType.map((notification, index) => {
    return {
      label: notification,
      value: notification,
    };
  });

 

  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: 'manage-category', link: `/${base}/manage-category` },
        ]}
      />
      <h1 className="text-3xl my-3 font-bold pl-4">
        Create Notification to the user
      </h1>
      <Form submitHandler={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="title" label="title" />
          </div>

          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormTextArea name="content" label="Content" rows={4} />
          </div>

         

          <div style={{ margin: '1px 0px' }}>
            <FormSelectField
              options={notificationOptions as SelectOptions[]}
              name="notificationType"
              label="NotificationType"
            />
          </div>
        </div>

        <Button
          className="bg-blue-900 ml-4 mt-3"
          type="primary"
          htmlType="submit"
        >
          Add Notification
        </Button>
      </Form>
    </div>
  );
}

export default CreateNotificationPage;

'use client';



import { SelectOptions } from '@/components/Froms/FormMultiSelectField';
import FormSelectField from '@/components/Froms/FormSelectField';

import { useAddNotificationToAllUserMutation } from '@/redux/api/notificationApi';

import { Button, message } from 'antd';
import Form from '../../../../../components/Froms/Form';
import FormInput from '../../../../../components/Froms/FormInput';
import FormTextArea from '../../../../../components/Froms/FormTextArea';

function CreateNotificationPage() {


  const [addNotificationToAllUser] = useAddNotificationToAllUserMutation();
  const onSubmit = async (data: any) => {
    try {

     
      const res = await addNotificationToAllUser(data).unwrap();
   
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
     
      <h1 className="text-3xl my-3 font-bold pl-4">
        Create Notification To All User
      </h1>
      <Form submitHandler={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="title" label="Title" />
          </div>

          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormTextArea name="content" label="Content" rows={4} />
          </div>

         

          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
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

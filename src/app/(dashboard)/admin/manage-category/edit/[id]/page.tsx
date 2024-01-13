'use client';

import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useCategoryIdQuery, useUpdatecategoryMutation } from '@/redux/api/adminApi/categoryApi';

import { Button, message } from 'antd';
import Form from './../../../../../../components/Froms/Form';
import FormInput from './../../../../../../components/Froms/FormInput';
import FormTextArea from './../../../../../../components/Froms/FormTextArea';

export default function UpdateCategory({ params }: { params: { id: string } }) {
  const { data } = useCategoryIdQuery(params?.id);
  
  const [updatecategory] = useUpdatecategoryMutation();
 
  const defaultValues = {
    name: data?.name || '',
    description: data?.description || '',
   
  };
  const onSubmit = async (datas: any) => {
    try {
     
      const id = data?.id;
      const res = await updatecategory({ id, body: datas }).unwrap();
      
      if ('id' in res) {
        message.success('Category Updated successfully');
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };
  
  const base = 'admin';
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: 'manage-category', link: `/${base}/manage-category` },
        ]}
      />
      <h1 className="text-3xl my-3 font-bold pl-4">Update Category</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div className="grid grid-cols-1">
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="name" label="Name" />
          </div>
        
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormTextArea name="description" label="Description" rows={4} />
          </div>
         
         
         
         
        </div>

        <Button
          className="btn btn-primary ml-4 mt-3 bg-blue-500"
          type="primary"
          htmlType="submit"
        >
          Update
        </Button>
      </Form>
    </div>
  );
}

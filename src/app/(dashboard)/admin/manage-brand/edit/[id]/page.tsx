'use client';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useBrandIdQuery, useUpdatebrandMutation } from '@/redux/api/adminApi/brandApi';
import { Button, message } from 'antd';
import Form from './../../../../../../components/Froms/Form';
import FormInput from './../../../../../../components/Froms/FormInput';
import FormTextArea from './../../../../../../components/Froms/FormTextArea';

export default function UpdateBrand({ params }: { params: { id: string } }) {
  const { data } = useBrandIdQuery(params?.id);

  const [updatebrand] = useUpdatebrandMutation();
//   const { data: brandID, isLoading } = useAllbrandsQuery({});

  const defaultValues = {
    name: data?.name || '',
    description: data?.description || '',
   
  };
  const onSubmit = async (datas: any) => {
    try {
      
      const id = data?.id;
      const res = await updatebrand({ id, body: datas }).unwrap();
      
      if ('id' in res) {
        message.success('Brand Updated successfully');
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
          { label: 'manage-brand', link: `/${base}/manage-brand` },
        ]}
      />
      <h1 className="text-3xl my-3 font-bold pl-4">Update Product</h1>
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

'use client';

import Form from '@/components/Froms/Form';
import FormInput from '@/components/Froms/FormInput';
import FormTextArea from '@/components/Froms/FormTextArea';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { useAddblogMutation } from '@/redux/api/adminApi/blogApi';
import { useUserIdQuery } from '@/redux/api/adminApi/userApi';
import { getUserInfo } from '@/services/auth.service';
import { Button, message } from 'antd';

function CreateBlogsPage() {
  const [addBlogs, { isLoading, error, isSuccess }] = useAddblogMutation();
 const { userId } = getUserInfo() as any;
 const { data } = useUserIdQuery(userId);
 const id = data?.id;


  const onSubmit = async (data: any) => {
   
    try {
      data.authorId = id;
      console.log(data);
      const res = await addBlogs(data).unwrap();
      
      message.success('Blogs added successfully');
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const base = 'admin';
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: 'manage-blog', link: `/${base}/manage-blog` },
        ]}
      />
      <h1 className="text-3xl my-3 font-bold pl-4">Create Blogs</h1>
      <Form submitHandler={onSubmit}>
        <div className="grid grid-cols-1 gap-2">
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="authorName" label="Author Name" />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="title" label="Title" />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormTextArea name="content" label="Contents" rows={10} />
          </div>
          <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
            <FormInput name="image" label="Image" />
          </div>
        </div>

        <Button
          className="btn bg-blue-500 btn-primary ml-4 mt-3"
          type="primary"
          htmlType="submit"
        >
          add
        </Button>
      </Form>
    </div>
  );
}

export default CreateBlogsPage;

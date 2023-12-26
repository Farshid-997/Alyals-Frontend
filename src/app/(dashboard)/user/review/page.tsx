'use client';
import Form from '@/components/Froms/Form';
import FormInput from '@/components/Froms/FormInput';
import FormTextArea from '@/components/Froms/FormTextArea';
import { useUserIdQuery } from '@/redux/api/adminApi/userApi';
import { useAddreviewMutation } from '@/redux/api/reviewApi';
import { getUserInfo } from '@/services/auth.service';
import { Button, message } from 'antd';


export default function ReviewPage() {
  const { userId } = getUserInfo() as any;
  const { data } = useUserIdQuery(userId);
  const id = data?.id;

  const [addreview] = useAddreviewMutation();

  const onSubmit = async (formData: any) => {
    try {
      const reviewData = {
        ...formData,
        userId: id,
      };

      const res = await addreview(reviewData).unwrap();

      message.success('Review added successfully');
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const base = 'user';
  return (
    <div>
      <div>
        <h1 className="text-3xl my-3 font-bold pl-4">Review</h1>
        <Form submitHandler={onSubmit}>
          <div className="grid grid-cols-1 gap-2">
            <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
              <FormInput name="rating" label="Rating" type="number" />
            </div>

            <div className="w-full sm:col-span-2 xl:col-span-1 px-4">
              <FormTextArea name="content" label="Content" rows={4} />
            </div>
          </div>

          <Button
            className="bg-blue-500 ml-4 mt-3"
            type="primary"
            htmlType="submit"
          >
            Review
          </Button>
        </Form>
      </div>
    </div>
  );
}

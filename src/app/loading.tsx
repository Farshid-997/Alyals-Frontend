import { Row } from 'antd';
import Image from 'next/image';
import loader from '../Assest/loading.gif';
const Loading = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
      }}
    >
      <Image src={loader} alt=""></Image>
    </Row>
  );
};

export default Loading;

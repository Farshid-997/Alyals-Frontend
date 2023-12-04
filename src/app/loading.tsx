import { Row } from 'antd';
import loader from '../Assest/loading.gif';
import Image from 'next/image';
const Loading = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
      }}
    >
      <Image src={loader} alt="" style={{ color: '#1E3A8A' }}></Image>
    </Row>
  );
};

export default Loading;

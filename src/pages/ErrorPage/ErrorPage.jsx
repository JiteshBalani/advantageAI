import { Result } from 'antd';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='pt-[70px]'>
    <Result
    status="404"
    title=<div className='text-[#D3145A] font-semibold'>404</div>
    subTitle=<div className='text-md text-black'>Sorry, the page you visited does not exist.</div>
    extra={<Link to='/'><button className='bg-[#D3145A] text-white cursor-pointer text-lg p-2 font-medium border'>Back Home</button></Link>}
  />
  </div>
  )
}

export default ErrorPage;
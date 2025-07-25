import { Result } from 'antd';

const ErrorPage = () => {
  return (
    <Result
    status="404"
    title=<div className='text-[#D3145A] font-semibold'>404</div>
    subTitle=<div className='text-md text-black'>Sorry, the page you visited does not exist.</div>
    extra={<button className='bg-amber-400 text-lg p-2 font-medium border'>Back Home</button>}
  />
  )
}

export default ErrorPage;
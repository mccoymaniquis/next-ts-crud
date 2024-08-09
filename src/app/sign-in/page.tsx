import { ReactElement } from "react";
import SignIn from '@/screens/sign-in'


const page = async (): Promise<ReactElement> => {
  return <section className='h-screen w-screen bg-gray-100 '><SignIn/></section>;
};

export default page;

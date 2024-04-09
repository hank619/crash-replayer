/*
 * @Author: Hong.Zhang
 * @Date: 2023-11-09 14:29:51
 * @Description:
 */
import { useState } from 'react';
import Content from './components/Content';
import Sider from './components/Sider';

export default function Welcome() {
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  return (
    <div className="w-full h-full flex">
      <Sider value={customer} onChange={setCustomer} />
      <Content customer={customer} />
    </div>
  );
}

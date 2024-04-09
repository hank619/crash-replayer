/*
 * @Author: Hong.Zhang
 * @Date: 2024-04-07 16:46:21
 * @Description:
 */
import { request } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Input, Space, Spin } from 'antd/es';
import cls from 'classnames';
import { useEffect, useState } from 'react';

interface ISiderProps {
  value?: Customer;
  onChange: (value: Customer) => void;
}

const Sider = (props: ISiderProps) => {
  const { value, onChange } = props;
  const [input, setInput] = useState('');

  const { data, run, loading } = useRequest(
    () => {
      return request(`/events/${input}`);
    },
    {
      manual: true,
    },
  );

  const search = () => {
    run();
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <div className="w-1/3 bg-gray pt-20 flex flex-col items-center">
      <Space.Compact>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={search}>Search</Button>
      </Space.Compact>
      <Spin spinning={loading}>
        <div className="mt-10 flex flex-col gap-4 ">
          {data?.map((item: Customer) => (
            <div
              key={item.customerId}
              onClick={() => onChange(item)}
              className={cls('cursor-pointer', {
                'text-primary': item.customerId === value?.customerId,
                'text-black': item.customerId !== value?.customerId,
              })}
            >
              {item.customerId}
            </div>
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default Sider;

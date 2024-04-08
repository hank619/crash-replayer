// 全局共享数据示例
import { useState } from 'react';

const useGlobal = () => {
  const [name, setName] = useState('');
  return {
    name, 
    setName,
  }
};

export default useGlobal;

/*
 * @Author: Hong.Zhang
 * @Date: 2023-11-09 14:29:51
 * @Description:
 */
import { COLORS, DEFAULT_COLOR_PLATE } from '@/constants/theme';
import { Button, ColorPicker } from 'antd';
import { Color } from 'antd/es/color-picker';
import { ColorFactory } from 'antd/es/color-picker/color';
import { useState } from 'react';

export default function Welcome() {
  const [color, setColor] = useState<Color>(
    new ColorFactory(DEFAULT_COLOR_PLATE[COLORS.primary]),
  );

  return (
    <div className="w-fit mt-48 m-auto flex flex-col items-center gap-4">
      <div className="text-primary">Welcome</div>
      <ColorPicker value={color} onChange={setColor} showText />
      <Button
        type="primary"
        onClick={() => {
          const a: any = undefined;
          console.log(a.name);
        }}
      >
        Click
      </Button>
    </div>
  );
}

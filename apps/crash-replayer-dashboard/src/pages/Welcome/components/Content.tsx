/*
 * @Author: Hong.Zhang
 * @Date: 2024-04-07 16:46:44
 * @Description:
 */
import { PlayCircleOutlined } from '@ant-design/icons';
import { request } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Modal } from 'antd/es';
import { useRef, useState } from 'react';
import { unpack } from 'rrweb';
import rrwebPlayer from 'rrweb-player';
import DisplayItem from './DisplayItem';

const Content = ({ customer }: { customer?: Customer }) => {
  const [visible, setVisible] = useState(false);
  const replayContainerRef = useRef<HTMLDivElement | null>(null);
  const { data, run, loading } = useRequest<Customer, any[]>(
    () => request(`/events/${customer?.browserId}`),
    {
      manual: true,
      onSuccess() {
        setVisible(true);
      },
    },
  );
  return (
    <div className="w-2/3 flex items-center justify-center">
      {customer ? (
        <div>
          {Object.entries(customer ?? {}).map(([key, value]) => (
            <DisplayItem label={key} value={value} key={key} />
          ))}
          <Button
            type="primary"
            onClick={() => {
              run();
            }}
            loading={loading}
          >
            Replay
          </Button>
        </div>
      ) : (
        <div>Please Select a Customer</div>
      )}
      <Modal
        title="Replay"
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        destroyOnClose
      >
        <PlayCircleOutlined
          className="text-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={() => {
            const replayer = new rrwebPlayer({
              target: replayContainerRef.current!,
              props: {
                events: JSON.parse(data?.events ?? ''),
                unpackFn: unpack,
                width: 900,
                height: 500,
              },
            });
            replayer.play();
          }}
        >
          Replay
        </PlayCircleOutlined>
        <div ref={replayContainerRef} className="h-[580px] w-[900px] m-auto" />
      </Modal>
    </div>
  );
};

export default Content;

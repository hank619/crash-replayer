/*
 * @Author: Hong.Zhang
 * @Date: 2024-04-08 13:24:14
 * @Description:
 */
const DisplayItem = ({ label, value }: { label: string; value?: string }) => {
  return (
    <div className="flex">
      <div>{label}:</div>
      <div>{value}</div>
    </div>
  );
};

export default DisplayItem;

export const ProgressBar = ({ data }) => {
  const completedPercentage = Math.floor(
    (data.filter((item) => item.isModuleRead).length / data.length) * 100
  );

  return (
    <div>
      <div
        style={{
          width: '100%',
          backgroundColor: '#e0e0e0',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            width: `${completedPercentage}%`,
            background: 'linear-gradient(90deg, #3FC500, #76c7c0)', // Gradient for a more stylish look
            height: '10px', // Thinner height
            transition: 'width 0.3s ease-in-out',
          }}
        />
      </div>
    </div>
  );
};
interface ProgressBar2Props {
  title: string;
  color: string;
  label: string;
}
export const ProgressBar2: React.FC<ProgressBar2Props> = ({
  title = '',
  color = '',
  label = '',
}) => {
  return (
    <div>
      <div className='flex justify-between mb-1'>
        <span className='text-[18px] font-semibold leading-4 text-[#414D55]'>
          {title}
        </span>
        <span className='text-[16px] font-medium leading-4 text-darkBlue'>
          {label}
        </span>
      </div>
      <div className='w-full bg-[#E4EAF0] rounded-full h-[16px]'>
        <div
          className='h-[16px] rounded-full'
          style={{ width: label, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

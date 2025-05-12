import PropTypes from 'prop-types';

const BottomSheet = ({ isOpen, toggleBottomSheet, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Overlay */}
      <div
        className='fixed inset-0 bg-black bg-opacity-50'
        onClick={toggleBottomSheet}
      ></div>

      {/* Bottom Sheet Content */}
      <div className='fixed bottom-0 left-0 w-full max-h-[70%] overflow-y-auto bg-white rounded-t-lg shadow-lg p-4'>
        <button
          className='text-gray-500 hover:text-gray-700 absolute top-2 right-4'
          onClick={toggleBottomSheet}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

BottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleBottomSheet: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default BottomSheet;

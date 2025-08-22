interface ConfirmPopUpProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmPopUp = ({ message, onConfirm, onCancel }: ConfirmPopUpProps) => {
  return (
    <div className="z-100 absolute flex justify-center items-center bg-black/80 w-screen h-screen">
      <div className="bg-pink-5 shadow-md px-10 py-6 rounded text-center">
        <h2 className="shadow-blue-8 small-text-cst text-2xl lg:text-3xl">
          {message}
        </h2>
        <div className="flex justify-center gap-10 lg:gap-25 mt-6">
          <button
            onClick={onCancel}
            className="bg-white hover:bg-gray-600 active:bg-gray-400 px-4 py-2 rounded hover:text-white active:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 px-4 py-2 rounded text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopUp;

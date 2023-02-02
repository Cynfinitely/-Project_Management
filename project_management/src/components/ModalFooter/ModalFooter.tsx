
interface IModalFooterProps {  
  cancelClick: () => void
}

const ModalFooter = ({cancelClick} : IModalFooterProps) => {

  return (
    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      <button
        type="submit" 
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Accept
      </button>
      <button 
        type="button" 
        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-500 bg-gray-500 px-4 py-2 text-base font-medium shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={() => cancelClick()}
      >
        Cancel
      </button>
    </div>
  )
}

export default ModalFooter
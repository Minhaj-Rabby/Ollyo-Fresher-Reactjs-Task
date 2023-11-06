import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const Header = ({ selectedImageDatas, handledeleteSelectedData }) => {

  return (
    <div className='border-b-2 bg-white border-slate-300 sticky top-0 z-50 px-6'>
      {
        //Specifying the Header to display
        selectedImageDatas == 0 ?
          < >
            <div className='container mx-auto navbar'>
              <h3 className='font-bold text-xl'>
                Gallery</h3>
            </div>
          </>
          :
          <>

            <div className=" container mx-auto navbar">
              <div className="flex-1">
                {/* Showing The Number of Selected Images  */}
                <div className='flex items-center'>
                  <FontAwesomeIcon className='h-6 text-blue-700 mr-3' icon={faCheckSquare} />
                  <h3 className='font-bold text-xl'>{selectedImageDatas.length} Files Selected</h3>
                </div>

              </div>


              <div className="flex-none gap-2">
                {/* Deletng Selected Images */}
                <div className="dropdown dropdown-end">
                  <h3 onClick={handledeleteSelectedData} className='text-red-600 font-semibold text-lg	'>Delete files</h3>
                </div>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default Header;
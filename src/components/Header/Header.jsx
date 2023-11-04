import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'

const Header = ({selectedComponents,handleTodeleteSelectedComponents}) => {

  return (
    <div className='border-b-2 bg-white border-slate-300 sticky top-0 z-50 px-6'>
      {
        selectedComponents == 0 ?
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
                <div className='flex items-center'>
                  <FontAwesomeIcon className='h-6 text-blue-700 mr-3' icon={faCheckSquare} />
                  <h3 className='font-bold text-xl'>{selectedComponents.length} Files Selected</h3>
                </div>

              </div>
              <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                  <h3 onClick={handleTodeleteSelectedComponents} className='text-red-600 font-semibold text-lg	'>Delete files</h3>
                </div>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default Header
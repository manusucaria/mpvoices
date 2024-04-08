import { openSans600, openSans800 } from '@/utils/fonts/fonts'
import React from 'react'

const Modal = ({
  isOpen,
  leggend,
  onClose,
  callback,
  leggendClose,
  isCheckedIcon = false
}) => {
  return (
    <>
      {isOpen && (
        <div className="bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50">
          <div className="w-2/3 sm:w-1/2 md:w-1/3 max-w-[25rem] h-auto p-10 rounded-md bg-white text-black">
            {isCheckedIcon && (
              <div className="w-full text-orange-600 flex items-center justify-center pb-5">
                <svg
                  width="24"
                  height="22"
                  viewBox="0 0 24 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.20871 21.7946C7.77121 21.7946 8.19309 21.5234 8.87612 20.9207L12.3214 17.8672H18.3984C21.4219 17.8672 23.1194 16.1395 23.1194 13.1562V5.36157C23.1194 2.37831 21.4219 0.650635 18.3984 0.650635H5.59153C2.56809 0.650635 0.870544 2.37831 0.870544 5.36157V13.1562C0.870544 16.1395 2.60827 17.8672 5.52121 17.8672H5.93304V20.3482C5.93304 21.2422 6.40514 21.7946 7.20871 21.7946ZM7.7009 19.5848V16.7221C7.7009 16.1294 7.44979 15.8984 6.87724 15.8984H5.64175C3.74331 15.8984 2.83929 14.9442 2.83929 13.0959V5.42184C2.83929 3.57363 3.74331 2.61938 5.64175 2.61938H18.3382C20.2366 2.61938 21.1507 3.57363 21.1507 5.42184V13.0959C21.1507 14.9442 20.2366 15.8984 18.3382 15.8984H12.2109C11.6083 15.8984 11.3069 15.9988 10.8851 16.4408L7.7009 19.5848ZM10.9252 14.0301C11.2868 14.0301 11.5982 13.8593 11.8092 13.5279L16.2991 6.50666C16.4297 6.29572 16.5502 6.05465 16.5502 5.83367C16.5502 5.33144 16.1083 4.99997 15.6362 4.99997C15.3348 4.99997 15.0636 5.17072 14.8527 5.5022L10.8851 11.8705L9.01675 9.48992C8.77568 9.17854 8.53461 9.06805 8.23327 9.06805C7.74108 9.06805 7.35938 9.46983 7.35938 9.96202C7.35938 10.2031 7.44979 10.4241 7.62054 10.635L9.99108 13.5379C10.2623 13.8794 10.5536 14.0301 10.9252 14.0301Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
            <p className={`Text-balanced text-center text-xl pb-5 ${openSans600.className}`}>
              {leggend}
            </p>
            <div
              className={`text-orange-600 flex justify-center gap-14 mt-4 ${openSans800.className}`}
            >
              {callback && (
                <button className="hover:text-orange-300" onClick={callback}>
                  Si
                </button>
              )}
              <button className="hover:text-orange-300" onClick={onClose}>
                {leggendClose || 'No'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Modal

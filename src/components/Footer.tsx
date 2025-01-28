import React from 'react'
import { Film, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <div className='w-screen h-fit bg-indigo-700 px-[20px] py-[40px] text-white'>
      <div className='flex flex-col gap-[28px]'>
        <div className='flex flex-col gap-[12px]'>
          <div className='flex items-center gap-[8px]'>
            <Film />
            <p className='font-bold text-xl'>Movie Z</p>
          </div>
          <h2>© 2024 Movie Z. All Rights Reserved.</h2>
        </div>

        <div className='flex flex-col gap-[12px]'>
          <h2 className='text-lg font-semibold'>Contact Information</h2>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-y-[24px]'>
              <div className='flex h-fit items-center gap-x-[12px] flex-row-reverse'>
                <div>
                  <p className='font-medium'>Email:</p>
                  <p>support@movieZ.com</p>
                </div>
                <Mail />
              </div>

              <div className='flex h-fit items-center gap-x-[12px] flex-row-reverse justify-end'>
                <div>
                  <p className='font-medium'>Phone:</p>
                  <p>+976 (11) 123-4567</p>
                </div>
                <Phone />
              </div>
            </div>

            <div className='flex flex-col gap-y-[12px]'>
              <h2 className='text-lg font-semibold'>Follow Us</h2>
              <p>Instagram</p>
              <p>YouTube</p>
              <p>Facebook</p>
              <p>Twitter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

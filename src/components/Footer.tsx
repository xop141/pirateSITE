import React from 'react';
import { Film, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
  
    <div className="w-full h-fit px-5 py-10 text-white bg-gray-900">
      <div className="flex flex-col gap-7 lg:flex-row w-full justify-between">
       
        <div className="flex flex-col gap-3 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Film />
            <p className="font-bold text-xl">Movie Z</p>
          </div>
          <h2>© 2024 Movie Z. All Rights Reserved.</h2>
        </div>

       
        <div className="flex flex-col gap-3 p-4 rounded-lg lg:w-[50%]">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <div className="flex justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Mail />
                <div>
                  <p className="font-medium">Email:</p>
                  <p>support@movieZ.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone />
                <div>
                  <p className="font-medium">Phone:</p>
                  <p>+976 (11) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">Follow Us</h2>
              <p>Instagram</p>
              <p>YouTube</p>
              <p>Facebook</p>
              <p>Twitter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

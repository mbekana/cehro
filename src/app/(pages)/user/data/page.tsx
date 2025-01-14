import UserLayout from '@/app/components/layout/UserLayout';
import React from 'react';

const NewsCard = () => {
  return (
    <>
      <UserLayout />
      <div className="flex w-full h-screen bg-white  justify-center  ">
        <div className="flex w-[1000px] h-[600px] bg-black  justify-center items-center pr-4 pl-4">
          <div className="w-1/3 h-full bg-black flex justify-center items-center ">
            <img 
              src="/news_image.jpg" 
              alt="News" 
              className="max-w-full max-[200px] object-contain"
            />
          </div>

          <div className="w-2/3 h-full flex flex-col justify-center bg-black ml-10">
            <h2 className="text-2xl font-bold text-white mb-4">
              KIRIBATI: COURT HEARS APPEAL FROM <br />
              JUDGE LAMBOURNE AS RULING PARTY <br />
              STAYS IN POWER
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              07.01.2025 Kiribati Latest Developments
            </p>
            <div className="mb-6">
              <span className="inline-block bg-gray-600 rounded-full px-4 py-2 text-sm font-semibold text-gray-300 mr-2 mb-1">
                TAGS: POLITICAL INTERFERENCE
              </span>
            </div>

            <a href="#" className="text-blue-400 hover:underline font-medium text-lg">
              READ MORE
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;

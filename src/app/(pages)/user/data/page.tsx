import UserLayout from '@/app/components/layout/UserLayout';
import React from 'react';

const NewsCard = () => {
  const newsList = [
    {
      image: '/ethiopia_bus_accident.jpg',
      title: 'MAJOR BUS ACCIDENT IN SOUTHERN ETHIOPIA LEAVES 20 DEAD',
      date: '07.01.2025',
      description: 'A tragic accident occurred on the road to Hawassa, raising concerns over road safety.',
      tags: ['ACCIDENT', 'TRANSPORTATION'],
      link: '#'
    },
    {
      image: '/ethiopia_fire.jpeg',
      title: 'FIRE ENGULFS MARKET IN ADDIS ABABA: DOZENS OF SHOPS DESTROYED',
      date: '07.01.2025',
      description: 'A massive fire at Merkato caused extensive damage, displacing many vendors.',
      tags: ['FIRE', 'DISASTER'],
      link: '#'
    },
    {
      image: '/ethiopia_security.webp',
      title: 'SECURITY FORCES CLASH WITH PROTESTERS IN OROMIA REGION',
      date: '07.01.2025',
      description: 'Demonstrations over land disputes escalated into violent clashes in Oromia.',
      tags: ['PROTEST', 'CONFLICT'],
      link: '#'
    },
    {
      image: '/ethiopia_theft.jpeg',
      title: 'BANK ROBBERY IN DIRE DAWA: SUSPECTS APPREHENDED',
      date: '07.01.2025',
      description: 'A daring daytime robbery at a Dire Dawa bank was foiled by local authorities.',
      tags: ['CRIME', 'BANKING'],
      link: '#'
    }
  ];
  return (
    <>
      <UserLayout />
      <div className="flex flex-col w-full bg-white justify-center items-center py-8">
        {newsList.map((news, index) => (
          <div
            key={index}
            className="flex w-[1000px] h-[500px] bg-black justify-center items-center mb-8 pr-4 pl-4 rounded-lg"
          >
            {/* Image Section */}
            <div className="w-1/3 h-full bg-black flex justify-center items-center">
              <img
                src={news.image}
                alt="News"
                className="max-w-full max-h-[200px] object-contain"
              />
            </div>

            {/* Content Section */}
            <div className="w-2/3 h-full flex flex-col justify-center bg-black ml-10">
              <h2 className="text-2xl font-bold text-white mb-4">{news.title}</h2>
              <p className="text-gray-300 text-lg mb-6">{news.date} - {news.description}</p>
              <div className="mb-6">
                {news.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-block bg-gray-600 rounded-full px-4 py-2 text-sm font-semibold text-gray-300 mr-2 mb-1"
                  >
                    TAGS: {tag}
                  </span>
                ))}
              </div>
              <a href={news.link} className="text-blue-400 hover:underline font-medium text-lg">
                READ MORE
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewsCard;

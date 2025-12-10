// JuiceMenu.jsx
import React from "react";
import { BeakerIcon, FireIcon, SparklesIcon } from "@heroicons/react/24/outline";

const categories = [
  {
    name: "عصائر باردة",
    icon: <BeakerIcon className="w-12 h-12 text-green-500" />,
    description: "عصائر طبيعية منعشة وباردة",
  },
  {
    name: "مشروبات ساخنة",
    icon: <FireIcon className="w-12 h-12 text-red-500" />,
    description: "شاي، قهوة ومشروبات دافئة",
  },
  {
    name: "عصائر طاقة",
    icon: <SparklesIcon className="w-12 h-12 text-yellow-500" />,
    description: "مشروبات طبيعية لتعطيك طاقة",
  },
  {
    name: "عصائر عضوية",
    icon: <SparklesIcon className="w-12 h-12 text-green-700" />,
    description: "عصائر صحية وعضوية 100%",
  },
];

const JuiceMenu = () => {
  return (
    <div className="bg-yellow-50 min-h-screen py-10">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-green-700 mb-10">
        منيو المشروبات
      </h1>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4">{cat.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{cat.name}</h2>
            <p className="text-gray-500">{cat.description}</p>
            <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors">
              أطلب الآن
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JuiceMenu;

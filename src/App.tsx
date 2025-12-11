import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import "./App.css";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  createdAt?: number;
}

interface MenuSection {
  category: string;
  items: MenuItem[];
  lastItemTimestamp?: number;
}

export default function App() {
  const [menu, setMenu] = useState<MenuSection[]>([]);

  useEffect(() => {
    const menuRef = ref(db, "menu");
    const unsubscribe = onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const sections: MenuSection[] = Object.keys(data)
        .map((category) => {
          const itemsObj = data[category];
          const items: MenuItem[] = Object.entries(itemsObj)
            .filter(([key]) => key !== "createdAt")
            .map(([id, value]: any) => ({ id, ...value }))
            .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

          return {
            category,
            items,
            lastItemTimestamp: items.length
              ? Math.max(...items.map((i) => i.createdAt || 0))
              : 0,
          };
        })
        .sort((a, b) => (a.lastItemTimestamp || 0) - (b.lastItemTimestamp || 0));

      setMenu(sections);
    });

    return () => unsubscribe();
  }, []);

  return (
    
    <div
      className="min-h-screen flex flex-col font-sans"
      dir="rtl"
      style={{
        background: "linear-gradient(to bottom, #f9f7ff, #f0fff6)",
      }}
    >
      {/* اللوجو في أعلى الصفحة */}
      <div className="w-full flex justify-center mt-8 mb-4">
        <img
          src="/logo_akila.png"
          alt="Logo"
          className="w-72 h-auto object-contain"
        />
      </div>

      {/* المحتوى */}
      <main className="flex-1 max-w-3xl mx-auto space-y-10 w-full px-6 py-6">
        {menu.map((section) => (
          <div key={section.category}>
            <h2
              className="text-2xl font-bold mb-4 border-b-2 pb-2"
              style={{
                color: "#B22271", // لون مطابق للوجو
                borderColor: "#5C3A0F",
                fontFamily: "Tajawal, sans-serif",
              }}
            >
              {section.category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl shadow-md bg-white flex justify-between items-center 
                  text-gray-900 transition-all duration-200 hover:shadow-lg"
                >
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <div className="text-lg font-semibold text-[#CCC20D]">
                    {item.price} ₪
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* الفوتر */}
<footer
  className="text-gray-700 py-5 rounded-t-3xl text-sm font-bold"
  style={{
    background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(204, 194, 13, 0.5))"
  }}
>
  <div className="container mx-auto flex justify-between items-center px-5">
    
    {/* بيانات المحل على اليمين */}
    <div className="text-left">
      © 2025 بوظة وبراد عكيلة  <br />
       للتواصل: 0592270295
    </div>
    
{/* بيانات المطور على اليسار */}
     <div className="text-right">
      تطوير: Eng. Mohammed Eljoujo <br />
      للتواصل: 0592133357
    </div>
  </div>
</footer>



    </div>
  );
}

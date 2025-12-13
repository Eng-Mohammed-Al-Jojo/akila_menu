import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import "./App.css";
import { FaMapMarkerAlt, FaPhone, FaCode } from "react-icons/fa";

interface MenuItem {
  id: string;
  name: string;
  price: string | number[]; // يمكن أن يكون رقم واحد أو مصفوفة لثلاث أسعار
  createdAt?: number;
  visible?: boolean;
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
      <div className="w-full flex justify-center mt-8 mb-4">
        <img
          src="/logo_akila.png"
          alt="Logo"
          className="w-72 h-auto object-contain"
        />
      </div>

      <main className="flex-1 max-w-3xl mx-auto space-y-10 w-full px-6 py-6">
        {menu.map((section) => (
          <div key={section.category}>
            <h2
              className="text-2xl font-bold mb-4 border-b-2 pb-2"
              style={{
                color: "#B22271",
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
                  className={`p-5 rounded-2xl shadow-md flex justify-between items-center 
                    ${
                      !item.visible
                        ? "bg-white-100 text-gray-900 transition-all shadow-md shadow-[#b8779b] duration-200 hover:shadow-lg hover:shadow-[#e56fb0]"
                        : "bg-gray-100 text-gray-400 line-through"
                    }`}
                >
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <div className="text-lg font-semibold text-[#CCC20D]">
                    ₪ {Array.isArray(item.price) ? item.price.join(" | ") : item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      <footer
        className="text-gray-700 py-5 rounded-t-3xl text-sm font-bold"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(204, 194, 13, 0.5))",
          direction: "rtl",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-5 gap-4 text-center md:text-right">
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt /> شارع الثورة بجوار تاج مول
            </div>
            <div className="flex items-center gap-1">
              <FaPhone /> <span dir="rtl">0592270295</span>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center md:justify-start text-xs">
            Eng. Mohammed Eljoujo <FaCode />
          </div>
        </div>
      </footer>
    </div>
  );
}

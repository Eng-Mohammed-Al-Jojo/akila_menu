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
        background: "linear-gradient(to bottom, #f9f7ff, #f0fff6)", // خلفية pastel هادئة
      }}
    >
      {/* رأس الصفحة */}
      <header
        className="text-white text-center p-6 rounded-b-3xl shadow-md"
        style={{
          background: "linear-gradient(to right, #a78bfa, #6ee7b7)", // تدرج هادئ موف-أخضر
        }}
      >
        <h1
          className="text-4xl font-bold"
          style={{ fontFamily: "Tajawal, sans-serif" }}
        >
          عكيلة للبراد والبوظة
        </h1>
      </header>
  {/* اللوجو */}
  <div className="flex justify-center mb-8">
    <img
      src="/logo.png"
      alt="Logo"
      className="w-max h-auto object-contain "
    />
  </div>
      {/* محتوى الصفحة */}
      <main className="flex-1 max-w-3xl mx-auto space-y-10 w-full px-6 py-10">
        {menu.map((section) => (
          <div key={section.category}>
            <h2 className="text-2xl font-semibold text-purple-700 mb-4 border-b-2 border-green-200 pb-2">
              {section.category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl shadow-md bg-white flex justify-between items-center text-gray-900 transition-all duration-200 hover:shadow-lg"
                >
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <div className="text-lg font-semibold">{item.price} ₪</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* تذييل الصفحة */}
      <footer
        className="text-gray-700 text-center py-5 rounded-t-3xl text-sm"
        style={{
          background: "#e0f7f1", // خلفية هادئة
        }}
      >
        © 2025 عكيلة للبراد والبوظة — تطوير: Eng. Mohammed Eljoujo
      </footer>
    </div>
  );
}


import './App.css'


export default function MenuApp() {
  const menu = [
    {
      category: "الوجبات الرئيسية",
      items: [
        { name: "شاورما دجاج", price: "4.00₪ | 6.00₪" },
        { name: "برغر لحم", price: "6.50₪" },
        { name: "بيتزا مارغريتا", price: "5.50₪" },
      ],
    },
    {
      category: "المشروبات",
      items: [
        { name: "عصير برتقال طبيعي", price: "2.00₪" },
        { name: "كوكاكولا", price: "1.50₪" },
        { name: "مياه معدنية", price: "1.00₪" },
      ],
    },
    {
      category: "المشروبات 2",
      items: [
        { name: "عصير برتقال طبيعي", price: "2.00₪" },
        { name: "كوكاكولا", price: "1.50₪" },
        { name: "مياه معدنية", price: "1.00₪" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <header className="bg-red-600 text-white text-center p-6 rounded-2xl shadow-xl mb-6">
        <h1 className="text-3xl font-bold">عكيلة للبراد و البوظة</h1>
      </header>

      <div className="max-w-2xl mx-auto space-y-8">
        {menu.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold text-red-600 border-b-2 border-red-600 pb-2 mb-4">
              {section.category}
            </h2>

            <div className="space-y-4">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-2xl shadow flex justify-between items-center hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <span className="text-lg font-bold text-gray-800">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

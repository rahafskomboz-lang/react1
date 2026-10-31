import { useState } from "react";

/* ================= مصفوفة المنتجات (المهمة 2) ================= */
const PRODUCTS = [
  {
    id: 1,
    name: "سماعات لاسلكية",
    category: "إلكترونيات",
    price: 120,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "سماعات بلوتوث بجودة صوت عالية وبطارية تدوم 24 ساعة.",
  },
  {
    id: 2,
    name: "ساعة ذكية",
    category: "إلكترونيات",
    price: 250,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    description: "تتبّع النشاط البدني والنوم مع إشعارات الهاتف.",
  },
  {
    id: 3,
    name: "حقيبة ظهر",
    category: "إكسسوارات",
    price: 60,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    description: "حقيبة متينة ومقاومة للماء تناسب الدراسة والسفر.",
  },
  {
    id: 4,
    name: "نظارة شمسية",
    category: "إكسسوارات",
    price: 45,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    description: "نظارة بحماية كاملة من الأشعة فوق البنفسجية.",
  },
  {
    id: 5,
    name: "كوب حراري",
    category: "منزلية",
    price: 25,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&q=80",
    description: "يحافظ على حرارة المشروب لمدة 8 ساعات.",
  },
  {
    id: 6,
    name: "مصباح مكتبي",
    category: "منزلية",
    price: 35,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
    description: "إضاءة LED قابلة للتعديل وموفّرة للطاقة.",
  },
];

/* ================= Header (متجاوب + قائمة موبايل) ================= */
function Header({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: "#home", label: "الرئيسية" },
    { href: "#products", label: "المنتجات" },
    { href: "#contact", label: "اتصل بنا" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-indigo-600 sm:text-2xl">متجري</h1>

        {/* روابط الشاشات الكبيرة */}
        <nav className="hidden gap-6 text-gray-700 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-indigo-600">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-indigo-600 px-3 py-1 text-sm text-white">
            🛒 {cartCount}
          </span>
          {/* زر القائمة للموبايل */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded border px-3 py-1 text-xl md:hidden"
            aria-label="القائمة"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* قائمة الموبايل */}
      {menuOpen && (
        <nav className="flex flex-col border-t bg-white px-4 py-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-gray-700 hover:text-indigo-600"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ================= Hero ================= */
function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-l from-indigo-600 to-purple-600 px-4 py-14 text-center text-white sm:py-20"
    >
      <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">أهلاً بك في متجرنا</h2>
      <p className="mb-8 text-base opacity-90 sm:text-lg">منتجات مختارة بعناية وبأفضل الأسعار</p>
      <a
        href="#products"
        className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 hover:bg-gray-100"
      >
        تصفّح المنتجات
      </a>
    </section>
  );
}

/* ================= صورة المنتج (مع بديل إذا فشل التحميل) ================= */
function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-44 w-full items-center justify-center bg-gray-200 text-5xl sm:h-48">
        🛍️
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-44 w-full object-cover sm:h-48"
    />
  );
}

/* ================= ProductCard (يستقبل المنتج عبر props) ================= */
function ProductCard({ name, image, price, description, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAdd = () => {
    onAddToCart(quantity);
    setMessage(`تمت إضافة ${quantity} × ${name} إلى السلة ✅`);
    setQuantity(1);
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
      <ProductImage src={image} alt={name} />

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="my-2 flex-1 text-sm text-gray-600">{description}</p>
        <p className="mb-3 font-semibold text-indigo-600">{price} ₪</p>

        <div className="mb-3 flex items-center justify-center gap-4">
          <button onClick={decrease} className="h-9 w-9 rounded bg-gray-200 hover:bg-gray-300">
            −
          </button>
          <span className="w-6 text-center font-semibold">{quantity}</span>
          <button onClick={increase} className="h-9 w-9 rounded bg-gray-200 hover:bg-gray-300">
            +
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="w-full rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700"
        >
          أضف إلى السلة
        </button>

        {message && (
          <p className="mt-3 rounded bg-green-100 p-2 text-center text-sm text-green-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

/* ================= Filters (شريط جانبي، يُطوى على الموبايل) ================= */
function Filters({ categories, selected, setSelected, maxPrice, setMaxPrice }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:w-64 md:shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className="mb-3 w-full rounded-lg bg-white py-2 font-semibold shadow md:hidden"
      >
        {open ? "إخفاء الفلاتر ▲" : "إظهار الفلاتر ▼"}
      </button>

      <aside className={`${open ? "block" : "hidden"} h-fit rounded-xl bg-white p-4 shadow md:block`}>
        <h3 className="mb-3 text-lg font-bold">الفلاتر</h3>

        <p className="mb-2 font-semibold">الفئة</p>
        {["الكل", ...categories].map((cat) => (
          <label key={cat} className="mb-1 flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="category"
              checked={selected === cat}
              onChange={() => setSelected(cat)}
            />
            {cat}
          </label>
        ))}

        <p className="mb-2 mt-4 font-semibold">أعلى سعر: {maxPrice} ₪</p>
        <input
          type="range"
          min="0"
          max="300"
          step="5"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
      </aside>
    </div>
  );
}

/* ================= Products ================= */
function Products({ onAddToCart }) {
  const [selected, setSelected] = useState("الكل");
  const [maxPrice, setMaxPrice] = useState(300);

  const categories = [...new Set(PRODUCTS.map((p) => p.category))];

  const filtered = PRODUCTS.filter(
    (p) => (selected === "الكل" || p.category === selected) && p.price <= maxPrice
  );

  return (
    <section id="products" className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">منتجاتنا</h2>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <Filters
          categories={categories}
          selected={selected}
          setSelected={setSelected}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              description={product.description}
              onAddToCart={onAddToCart}
            />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-500">لا توجد منتجات مطابقة.</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ================= Contact (خريطة + نموذج) ================= */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  const inputClass =
    "mb-3 w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none";

  return (
    <section id="contact" className="bg-gray-100 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">اتصل بنا</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <iframe
            title="map"
            className="h-64 w-full rounded-xl border-0 shadow sm:h-80 md:h-full md:min-h-80"
            src="https://www.openstreetmap.org/export/embed.html?bbox=35.22%2C32.20%2C35.31%2C32.24&layer=mapnik"
          />

          <form onSubmit={handleSubmit} className="rounded-xl bg-white p-5 shadow sm:p-6">
            <input name="name" value={form.name} onChange={handleChange} placeholder="الاسم" required className={inputClass} />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="البريد الإلكتروني" required className={inputClass} />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="رسالتك" rows="4" required className={inputClass} />
            <button type="submit" className="w-full rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700">
              إرسال
            </button>
            {sent && (
              <p className="mt-3 rounded bg-green-100 p-2 text-center text-green-700">
                تم إرسال رسالتك بنجاح ✅
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ================= Footer ================= */
function Footer() {
  return (
    <footer className="bg-gray-900 px-4 py-6 text-center text-sm text-gray-300 sm:text-base">
      <p>© {new Date().getFullYear()} متجري — جميع الحقوق محفوظة</p>
    </footer>
  );
}

/* ================= App ================= */
function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (qty) => setCartCount((prev) => prev + qty);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 text-gray-800">
      <Header cartCount={cartCount} />
      <Hero />
      <Products onAddToCart={handleAddToCart} />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
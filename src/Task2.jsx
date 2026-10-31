import { useState } from "react";

// مصفوفة المنتجات: اسم + صورة + سعر + وصف
const products = [
    { id: 1, name: "سماعات لاسلكية", image: "https://picsum.photos/seed/headphones/400/300", price: 120, description: "سماعات بلوتوث بجودة صوت عالية." },
    { id: 2, name: "ساعة ذكية", image: "https://picsum.photos/seed/watch/400/300", price: 250, description: "تتبّع النشاط البدني والنوم." },
    { id: 3, name: "حقيبة ظهر", image: "https://picsum.photos/seed/bag/400/300", price: 60, description: "حقيبة متينة ومقاومة للماء." },
    { id: 4, name: "كوب حراري", image: "https://picsum.photos/seed/mug/400/300", price: 25, description: "يحافظ على حرارة المشروب 8 ساعات." },
];

// مكوّن المنتج: يستقبل بياناته عبر props
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
        <div className="overflow-hidden rounded-xl bg-white shadow">
            <img src={image} alt={name} className="h-44 w-full object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="my-2 text-sm text-gray-600">{description}</p>
                <p className="mb-3 font-semibold text-indigo-600">{price} ₪</p>

                <div className="mb-3 flex items-center gap-3">
                    <button onClick={decrease} className="h-8 w-8 rounded bg-gray-200 hover:bg-gray-300">−</button>
                    <span className="w-6 text-center">{quantity}</span>
                    <button onClick={increase} className="h-8 w-8 rounded bg-gray-200 hover:bg-gray-300">+</button>
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

function App() {
    const [cartCount, setCartCount] = useState(0);

    return (
        <div dir="rtl" className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">المنتجات</h1>
                    <span className="rounded-full bg-indigo-600 px-4 py-1 text-white">
                        🛒 السلة: {cartCount}
                    </span>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            description={product.description}
                            onAddToCart={(qty) => setCartCount(cartCount + qty)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
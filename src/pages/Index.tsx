import { useState } from 'react';
import Icon from '@/components/ui/icon';
import Header from '@/components/shop/Header';
import HomePage from '@/components/shop/HomePage';
import CatalogPage from '@/components/shop/CatalogPage';
import ProfilePage from '@/components/shop/ProfilePage';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  features: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Премиум Наушники Pro',
    price: 12990,
    category: 'Аудио',
    image: 'https://cdn.poehali.dev/projects/f04c52d8-127a-4610-8ea6-d852af0260f8/files/0db86172-bd37-4f0b-a46d-10dbf3b5f4a1.jpg',
    rating: 4.8,
    features: ['Шумоподавление', 'Беспроводные', '24ч работы']
  },
  {
    id: 2,
    name: 'Умные Часы Ultra',
    price: 24990,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/f04c52d8-127a-4610-8ea6-d852af0260f8/files/83c21582-8938-41e4-ba77-2e55a739f6ef.jpg',
    rating: 4.9,
    features: ['GPS', 'Водонепроницаемые', 'Пульсометр']
  },
  {
    id: 3,
    name: 'Профессиональная Камера X',
    price: 54990,
    category: 'Фото',
    image: 'https://cdn.poehali.dev/projects/f04c52d8-127a-4610-8ea6-d852af0260f8/files/d5d19e7b-6a66-40e2-8ce1-ec83a01b47e1.jpg',
    rating: 5.0,
    features: ['4K видео', '48MP', 'Стабилизация']
  },
  {
    id: 4,
    name: 'Беспроводные Наушники Mini',
    price: 6990,
    category: 'Аудио',
    image: 'https://cdn.poehali.dev/projects/f04c52d8-127a-4610-8ea6-d852af0260f8/files/0db86172-bd37-4f0b-a46d-10dbf3b5f4a1.jpg',
    rating: 4.5,
    features: ['Компактные', '12ч работы', 'Быстрая зарядка']
  },
  {
    id: 5,
    name: 'Фитнес-Браслет Active',
    price: 3990,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/f04c52d8-127a-4610-8ea6-d852af0260f8/files/83c21582-8938-41e4-ba77-2e55a739f6ef.jpg',
    rating: 4.3,
    features: ['Мониторинг сна', 'IP68', 'Уведомления']
  },
  {
    id: 6,
    name: 'Портативная Камера Vlog',
    price: 19990,
    category: 'Фото',
    image: 'https://cdn.poehali.dev/projects/f04c52d8-127a-4610-8ea6-d852af0260f8/files/d5d19e7b-6a66-40e2-8ce1-ec83a01b47e1.jpg',
    rating: 4.7,
    features: ['Full HD', 'Wi-Fi', 'Сенсорный экран']
  }
];

const CATEGORIES = ['Все', 'Аудио', 'Аксессуары', 'Фото'];

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCategory = (category: string) => {
    if (category === 'Все') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
      );
    }
  };

  const filteredProducts = PRODUCTS.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <HomePage
            products={PRODUCTS}
            setActiveTab={setActiveTab}
            addToCart={addToCart}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogPage
            filteredProducts={filteredProducts}
            categories={CATEGORIES}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            addToCart={addToCart}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage products={PRODUCTS} />
        )}
      </main>

      <footer className="mt-20 bg-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Sparkles" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">ModernShop</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Ваш надежный магазин современных гаджетов и аксессуаров
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О нас</li>
                <li>Вакансии</li>
                <li>Партнеры</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Помощь</li>
                <li>Доставка</li>
                <li>Возврат</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>8 (800) 123-45-67</li>
                <li>info@modernshop.ru</li>
                <li>Москва, Россия</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 ModernShop. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

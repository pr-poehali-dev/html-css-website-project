import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ModernShop
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('home')}
              className="transition-all"
            >
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button
              variant={activeTab === 'catalog' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('catalog')}
              className="transition-all"
            >
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Каталог
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('profile')}
              className="transition-all"
            >
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
          </nav>

          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-gradient-to-r from-primary to-secondary">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                      {cart.map(item => (
                        <Card key={item.product.id}>
                          <CardContent className="p-4 flex gap-4">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.product.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.product.price.toLocaleString('ru-RU')} ₽
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="ml-auto"
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Итого:</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {cartTotal.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <section className="rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-12 mb-12 text-white relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-5xl font-bold mb-4">Новая коллекция 2025</h2>
                <p className="text-xl mb-6 text-white/90">
                  Откройте для себя самые современные гаджеты с невероятными скидками до 50%
                </p>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => setActiveTab('catalog')}
                >
                  Смотреть каталог
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
                <Icon name="Sparkles" size={400} />
              </div>
            </section>

            <section className="mb-12">
              <h3 className="text-3xl font-bold mb-6">Популярные товары</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.slice(0, 3).map(product => (
                  <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-6">
                      <div className="relative mb-4 overflow-hidden rounded-xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary">
                          ⭐ {product.rating}
                        </Badge>
                      </div>
                      <Badge variant="secondary" className="mb-2">
                        {product.category}
                      </Badge>
                      <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex justify-between items-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Button
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-none">
                <CardContent className="p-6 text-center">
                  <Icon name="Truck" size={48} className="mx-auto mb-4 text-primary" />
                  <h4 className="font-semibold mb-2">Быстрая доставка</h4>
                  <p className="text-sm text-muted-foreground">Доставим за 1-2 дня</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-none">
                <CardContent className="p-6 text-center">
                  <Icon name="Shield" size={48} className="mx-auto mb-4 text-secondary" />
                  <h4 className="font-semibold mb-2">Гарантия качества</h4>
                  <p className="text-sm text-muted-foreground">2 года официальной гарантии</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-none">
                <CardContent className="p-6 text-center">
                  <Icon name="CreditCard" size={48} className="mx-auto mb-4 text-accent" />
                  <h4 className="font-semibold mb-2">Удобная оплата</h4>
                  <p className="text-sm text-muted-foreground">Любым удобным способом</p>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Каталог товаров</h2>
            
            <div className="grid lg:grid-cols-4 gap-6">
              <Card className="lg:col-span-1 h-fit sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Icon name="SlidersHorizontal" size={20} />
                    Фильтры
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Категории</h4>
                      <div className="space-y-2">
                        {CATEGORIES.map(category => (
                          <div key={category} className="flex items-center gap-2">
                            <Checkbox
                              id={category}
                              checked={category === 'Все' ? selectedCategories.length === 0 : selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <label htmlFor={category} className="text-sm cursor-pointer">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Цена</h4>
                      <Slider
                        min={0}
                        max={60000}
                        step={1000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-3"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
                        <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedCategories([]);
                        setPriceRange([0, 60000]);
                      }}
                    >
                      <Icon name="RotateCcw" size={16} className="mr-2" />
                      Сбросить фильтры
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-3">
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-muted-foreground">
                    Найдено товаров: <span className="font-semibold text-foreground">{filteredProducts.length}</span>
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="relative mb-4 overflow-hidden rounded-xl">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary">
                            ⭐ {product.rating}
                          </Badge>
                        </div>
                        <Badge variant="secondary" className="mb-2">
                          {product.category}
                        </Badge>
                        <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0 flex justify-between items-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        <Button
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                        >
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="User" size={48} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Иван Петров</h2>
                    <p className="text-muted-foreground">ivan.petrov@example.com</p>
                    <Badge className="mt-2 bg-gradient-to-r from-primary to-secondary">
                      Премиум клиент
                    </Badge>
                  </div>
                </div>

                <Tabs defaultValue="orders" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="orders">Заказы</TabsTrigger>
                    <TabsTrigger value="info">Информация</TabsTrigger>
                    <TabsTrigger value="settings">Настройки</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="orders" className="mt-6">
                    <div className="space-y-4">
                      {[1, 2, 3].map(order => (
                        <Card key={order}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-semibold mb-1">Заказ #{1234 + order}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(2024, 11, 25 - order).toLocaleDateString('ru-RU')}
                                </p>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Доставлен
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                {[1, 2].map(img => (
                                  <img
                                    key={img}
                                    src={PRODUCTS[order - 1].image}
                                    alt="Product"
                                    className="w-12 h-12 object-cover rounded-lg"
                                  />
                                ))}
                              </div>
                              <span className="font-semibold">
                                {(15000 + order * 5000).toLocaleString('ru-RU')} ₽
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="info" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">Контактная информация</h4>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Icon name="Phone" size={16} />
                            <span>+7 (999) 123-45-67</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Icon name="Mail" size={16} />
                            <span>ivan.petrov@example.com</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Icon name="MapPin" size={16} />
                            <span>Москва, ул. Примерная, д. 123, кв. 45</span>
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Статистика</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-none">
                            <CardContent className="p-4 text-center">
                              <p className="text-2xl font-bold text-primary">12</p>
                              <p className="text-sm text-muted-foreground">Заказов</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-none">
                            <CardContent className="p-4 text-center">
                              <p className="text-2xl font-bold text-secondary">245K</p>
                              <p className="text-sm text-muted-foreground">Потрачено</p>
                            </CardContent>
                          </Card>
                          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-none">
                            <CardContent className="p-4 text-center">
                              <p className="text-2xl font-bold text-accent">8</p>
                              <p className="text-sm text-muted-foreground">Отзывов</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Email уведомления</h4>
                          <p className="text-sm text-muted-foreground">Получать новости и акции</p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">SMS уведомления</h4>
                          <p className="text-sm text-muted-foreground">О статусе заказа</p>
                        </div>
                        <Checkbox defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">Push уведомления</h4>
                          <p className="text-sm text-muted-foreground">В приложении</p>
                        </div>
                        <Checkbox />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                        Сохранить настройки
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
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

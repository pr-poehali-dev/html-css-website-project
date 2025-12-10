import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  features: string[];
}

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: { product: Product; quantity: number }[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cart,
  cartOpen,
  setCartOpen,
  updateQuantity,
  removeFromCart
}: HeaderProps) {
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
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
  );
}

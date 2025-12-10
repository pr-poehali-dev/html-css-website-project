import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  features: string[];
}

interface HomePageProps {
  products: Product[];
  setActiveTab: (tab: string) => void;
  addToCart: (product: Product) => void;
}

export default function HomePage({ products, setActiveTab, addToCart }: HomePageProps) {
  return (
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
          {products.slice(0, 3).map(product => (
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
  );
}

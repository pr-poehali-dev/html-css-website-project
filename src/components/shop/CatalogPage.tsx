import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  features: string[];
}

interface CatalogPageProps {
  filteredProducts: Product[];
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  addToCart: (product: Product) => void;
}

export default function CatalogPage({
  filteredProducts,
  categories,
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  addToCart
}: CatalogPageProps) {
  return (
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
                  {categories.map(category => (
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
                  toggleCategory('Все');
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
  );
}

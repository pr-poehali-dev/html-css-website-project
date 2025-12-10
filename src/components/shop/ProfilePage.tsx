import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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

interface ProfilePageProps {
  products: Product[];
}

export default function ProfilePage({ products }: ProfilePageProps) {
  return (
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
                              src={products[order - 1].image}
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
  );
}

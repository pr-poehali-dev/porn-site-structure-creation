import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  specs: string[];
  rating: number;
  reviews: number;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Смартфон ProMax Ultra',
    price: 89990,
    oldPrice: 99990,
    image: 'https://cdn.poehali.dev/projects/44b068fc-86b0-4cc6-bf5e-28a6dfb37924/files/b83a3df6-241f-4c27-b4c1-404b8fa12cd3.jpg',
    category: 'Смартфоны',
    specs: ['6.7" AMOLED', '256 ГБ', '5G', '108 МП'],
    rating: 4.8,
    reviews: 342
  },
  {
    id: 2,
    name: 'Беспроводные наушники AirSound Pro',
    price: 24990,
    image: 'https://cdn.poehali.dev/projects/44b068fc-86b0-4cc6-bf5e-28a6dfb37924/files/03789012-5613-4076-ba12-7f9d1e4753a6.jpg',
    category: 'Аудио',
    specs: ['Active ANC', '40 часов', 'Bluetooth 5.3', 'Hi-Res Audio'],
    rating: 4.9,
    reviews: 567
  },
  {
    id: 3,
    name: 'Умные часы SmartWatch Elite',
    price: 34990,
    oldPrice: 39990,
    image: 'https://cdn.poehali.dev/projects/44b068fc-86b0-4cc6-bf5e-28a6dfb37924/files/3830ce76-67d0-4a3c-b3a6-1be46f52904e.jpg',
    category: 'Носимые',
    specs: ['AMOLED дисплей', 'GPS', 'Пульсометр', '7 дней'],
    rating: 4.7,
    reviews: 234
  },
  {
    id: 4,
    name: 'Ноутбук UltraBook Pro 15',
    price: 129990,
    image: 'https://cdn.poehali.dev/projects/44b068fc-86b0-4cc6-bf5e-28a6dfb37924/files/b83a3df6-241f-4c27-b4c1-404b8fa12cd3.jpg',
    category: 'Компьютеры',
    specs: ['Intel i7', '16 ГБ RAM', '512 ГБ SSD', '15.6" 4K'],
    rating: 4.6,
    reviews: 189
  },
  {
    id: 5,
    name: 'Планшет TabPro Max',
    price: 64990,
    oldPrice: 74990,
    image: 'https://cdn.poehali.dev/projects/44b068fc-86b0-4cc6-bf5e-28a6dfb37924/files/b83a3df6-241f-4c27-b4c1-404b8fa12cd3.jpg',
    category: 'Планшеты',
    specs: ['12.9" Retina', '256 ГБ', 'Apple M2', 'Face ID'],
    rating: 4.9,
    reviews: 421
  },
  {
    id: 6,
    name: 'Портативная колонка BoomBox 360',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/44b068fc-86b0-4cc6-bf5e-28a6dfb37924/files/03789012-5613-4076-ba12-7f9d1e4753a6.jpg',
    category: 'Аудио',
    specs: ['360° звук', 'IPX7', '24 часа', 'Bass Boost'],
    rating: 4.5,
    reviews: 156
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Смартфоны', 'Аудио', 'Носимые', 'Компьютеры', 'Планшеты'];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === 'Все'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Zap" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TechStore
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#delivery" className="text-sm font-medium hover:text-primary transition-colors">Доставка</a>
              <a href="#reviews" className="text-sm font-medium hover:text-primary transition-colors">Отзывы</a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-primary to-secondary">
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
                      <Icon name="ShoppingBag" className="mx-auto mb-4 text-muted-foreground" size={48} />
                      <p className="text-muted-foreground">Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                        {cart.map(item => (
                          <div key={item.id} className="flex gap-4 p-4 rounded-lg border bg-card">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{item.name}</h4>
                              <p className="text-lg font-bold text-primary mt-1">
                                {item.price.toLocaleString('ru-RU')} ₽
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 ml-auto text-destructive"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-lg font-bold">
                          <span>Итого:</span>
                          <span className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {cartTotal.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                        <Button className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-primary to-secondary text-white">
            🔥 Скидки до 30% на хиты сезона
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Электроника нового поколения
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Откройте мир инноваций с нашей коллекцией премиальных гаджетов и техники
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="h-14 px-8 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Icon name="ShoppingBag" className="mr-2" size={20} />
              Смотреть каталог
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base">
              <Icon name="Sparkles" className="mr-2" size={20} />
              Акции и скидки
            </Button>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Каталог товаров</h3>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/50">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden bg-gradient-to-br from-muted to-background">
                    {product.oldPrice && (
                      <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-accent to-destructive text-white">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </Badge>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{product.category}</Badge>
                    <div className="flex items-center gap-1 ml-auto">
                      <Icon name="Star" size={16} className="fill-accent text-accent" />
                      <span className="text-sm font-semibold">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                  </div>
                  <CardTitle className="mb-3 text-xl group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="Check" size={14} className="text-primary" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through mb-1">
                        {product.oldPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={18} />
                    В корзину
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Heart" size={18} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-center">Условия доставки</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Truck" className="text-white" size={32} />
                </div>
                <CardTitle>Быстрая доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Доставка по Москве — 1 день. По России — 2-5 дней. Бесплатно от 5000 ₽
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Icon name="CreditCard" className="text-white" size={32} />
                </div>
                <CardTitle>Удобная оплата</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Картой онлайн, наличными курьеру, рассрочка 0% до 12 месяцев
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-destructive flex items-center justify-center">
                  <Icon name="ShieldCheck" className="text-white" size={32} />
                </div>
                <CardTitle>Гарантия качества</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Официальная гарантия на все товары. Обмен и возврат в течение 14 дней
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-10 text-center">Отзывы покупателей</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Алексей М.', rating: 5, text: 'Отличный магазин! Быстрая доставка, товар соответствует описанию. Рекомендую!' },
              { name: 'Мария К.', rating: 5, text: 'Купила смартфон со скидкой. Очень довольна качеством и сервисом. Спасибо!' },
              { name: 'Дмитрий П.', rating: 4, text: 'Хороший выбор техники, адекватные цены. Буду заказывать ещё.' }
            ].map((review, idx) => (
              <Card key={idx} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                      {review.name[0]}
                    </div>
                    <div>
                      <CardTitle className="text-base">{review.name}</CardTitle>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-2xl text-center">
          <h3 className="text-3xl font-bold mb-6">Контакты</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Icon name="Phone" className="text-primary" size={24} />
              <a href="tel:+74951234567" className="text-xl font-semibold hover:text-primary transition-colors">
                +7 (495) 123-45-67
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="Mail" className="text-primary" size={24} />
              <a href="mailto:info@techstore.ru" className="text-xl font-semibold hover:text-primary transition-colors">
                info@techstore.ru
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="MapPin" className="text-primary" size={24} />
              <p className="text-xl">Москва, ул. Примерная, д. 1</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t bg-card">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 TechStore. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

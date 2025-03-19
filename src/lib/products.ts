
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  colors: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Air Cloud Runners",
    category: "Running",
    price: 189.99,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    colors: ["Black", "White", "Red"],
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Street Motion 2",
    category: "Lifestyle",
    price: 159.99,
    salePrice: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    colors: ["White", "Blue", "Gray"],
    isFeatured: true,
  },
  {
    id: "3",
    name: "Elite Performance Pro",
    category: "Running",
    price: 219.99,
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
    colors: ["Black", "Red", "Blue"],
    isFeatured: true,
  },
  {
    id: "4",
    name: "Urban Flex Sneakers",
    category: "Lifestyle",
    price: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
    colors: ["Gray", "White", "Green"],
    isNew: true,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Trail Dominator",
    category: "Hiking",
    price: 179.99,
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    colors: ["Brown", "Green", "Black"],
    isFeatured: true,
  },
  {
    id: "6",
    name: "Sport Velocity X",
    category: "Basketball",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1605348532760-6753d2c43329",
    colors: ["Black", "Purple", "White"],
    isFeatured: true,
  },
  {
    id: "7",
    name: "Classic Canvas",
    category: "Casual",
    price: 89.99,
    salePrice: 69.99,
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    colors: ["White", "Black", "Navy"],
  },
  {
    id: "8",
    name: "Aqua Grip Water Shoes",
    category: "Water Sports",
    price: 99.99,
    imageUrl: "https://images.unsplash.com/photo-1604163546180-039a1781c0d2",
    colors: ["Blue", "Black", "Teal"],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

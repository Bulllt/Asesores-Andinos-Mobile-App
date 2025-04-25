export const mockProducts = Array.from({ length: 50 }, (_, i) => ({
  id: `PROD-${1000 + i}`,
  name: `Product ${i + 1}`,
  category: ["Electronics", "Clothing", "Home", "Food", "Sports"][i % 5],
  brand: ["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"][i % 5],
}));

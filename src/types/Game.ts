export interface Game {
  title: string,
  icon: string,

  price: number,
  discountedPrice?: number | null,
  popularity: number,
  id: number,
};

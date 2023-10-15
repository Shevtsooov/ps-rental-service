export interface Game {
  title: string,
  icon: string,
  iconLink: string,
  gameId: string,
  poster: string,
  description: string,
  videoReview: string,
  videoGameplay: string,
  price: number,
  discountedPrice: string | null,
  category: string[],
  players: string,
  disclaimers: string[],
  releasedOn: string,
  isAvailable: boolean,
  popularity: number,
  collection: string
};

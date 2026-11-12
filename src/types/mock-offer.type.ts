/** Заготовка одного предложения, возвращаемая JSON-server. */
export type MockOffer = {
  id: string;
  title: string;
  description: string;
  previewImage: string;
  images: string[];
  host: {
    name: string;
    email: string;
    avatarUrl?: string;
    isPro: boolean;
  };
};

export type RootStackParamList = {
  Home: undefined;
  AttractionDetail: { attractionId: string };
  Gallery: { images: string[] | undefined };
  Map: {
    coordinates: { lat: number; lon: number } | undefined;
    name: string | undefined;
    city: string | undefined;
  };
};

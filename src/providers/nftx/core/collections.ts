// TODO: should most likely be moved to a DB entry
export const collections: Map<string, Collection> = new Map<string, Collection>(
  [
    [
      'uwucrew',
      { contract: '0xf75140376d246d8b1e5b8a48e3f00772468b3c0c', size: 9670 },
    ],
  ],
);

export interface Collection {
  contract: string;
  size: number;
}

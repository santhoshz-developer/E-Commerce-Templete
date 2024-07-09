export interface Item {
  id: string;
  content: string;
  imageUrl: string;
  showDeleteButton?: boolean; // Optional property
}

export type ItemsMap = {
  header: Item[];
  body: Item[];
  footer: Item[];
};

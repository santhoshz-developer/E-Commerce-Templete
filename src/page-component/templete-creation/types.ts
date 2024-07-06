export interface Item {
    id: string;
    content: string;
    imageUrl: string;
  }
  
  export type ItemsMap = {
    header: Item[];
    body: Item[];
    footer: Item[];
  };
  
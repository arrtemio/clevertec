export interface CreateOrderProps {
  order: boolean;
  dateOrder: string;
  book: string;
  customer: string;
}

export interface CreateOrderData {
  data: CreateOrderProps
}

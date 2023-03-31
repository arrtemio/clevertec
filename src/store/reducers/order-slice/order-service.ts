import { AxiosResponse } from 'axios';
import { $auth } from '../../../http';
import { CreateOrderData } from '../../../types/actions/orderTypes'

export class OrderService {
  static async createOrder(data: CreateOrderData): Promise<AxiosResponse> {
    return $auth.post('/bookings', data);
  }

  static async updateOrder(data: CreateOrderData, bookingId: number): Promise<AxiosResponse> {
    return $auth.put(`/bookings/${bookingId}`, data);
  }

  static async deleteOrder(bookingId: number): Promise<AxiosResponse> {
    return $auth.delete(`/bookings/${bookingId}`);
  }
}

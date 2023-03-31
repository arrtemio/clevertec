import { AppDispatch } from '../../store';
import { CreateOrderData } from '../../../types/actions/orderTypes';
import { orderSlice } from './order-slice';
import { OrderService } from './order-service';

export const createOrder = (
  data: CreateOrderData
) => async (dispatch: AppDispatch) => {
  try {
    dispatch(orderSlice.actions.createOrder());

    await OrderService.createOrder(data);

    dispatch(orderSlice.actions.createOrderSuccess());

  } catch (e: any) {

    dispatch(orderSlice.actions.createOrderError({
      message: e.message,
      status: e.response.status
    }));
  }
}

export const updateOrder = (
  data: CreateOrderData, bookingId: number
) => async (dispatch: AppDispatch) => {
  try {
    dispatch(orderSlice.actions.updateOrder());

    await OrderService.updateOrder(data, bookingId);

    dispatch(orderSlice.actions.updateOrderSuccess());

  } catch (e: any) {

    dispatch(orderSlice.actions.updateOrderError({
      message: e.message,
      status: e.response.status
    }));
  }
}

export const deleteOrder = (bookingId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(orderSlice.actions.deleteOrder());

    await OrderService.deleteOrder(bookingId);

    dispatch(orderSlice.actions.deleteOrderSuccess());

  } catch (e: any) {

    dispatch(orderSlice.actions.deleteOrderError({
      message: e.message,
      status: e.response.status
    }));
  }

}

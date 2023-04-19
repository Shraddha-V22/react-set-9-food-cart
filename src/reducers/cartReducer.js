export const cartReducer = (cart, { type, payload }) => {
  switch (type) {
    case "ADD":
      if (!cart.find((item) => item.id === payload.id)) {
        payload.quantity = 1;
        return [...cart, payload];
      }
    case "INC_QTY":
      return cart.map((item) =>
        item.id === payload.id && item.quantity !== 5
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case "DEC_QTY":
      if (payload.quantity === 1) {
        return cart.filter((item) => item.id !== payload.id);
      } else {
        return cart.map((item) =>
          item.id === payload.id && item.quantity !== 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    case "REMOVE":
      return cart.filter((item) => item.id !== payload);
    case "COUPON":
      return cart.map((item) => ({
        ...item,
        price: (item.price - 5).toFixed(2),
      }));
    default:
      return cart;
  }
};

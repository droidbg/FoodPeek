import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

/**
 * Global shopping cart, shared across the app and persisted to localStorage.
 *
 * State shape: a map of `{ [id]: CartLine }` where a line is
 * `{ id, name, price, imageId, isVeg, qty }` (price in paise).
 */
const CartContext = createContext(null);

const STORAGE_KEY = "foodpeek:cart:v1";

const loadInitialCart = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const { item } = action;
      const existing = state[item.id];
      return {
        ...state,
        [item.id]: { ...item, qty: (existing?.qty ?? 0) + 1 },
      };
    }
    case "DECREMENT": {
      const existing = state[action.id];
      if (!existing) return state;
      if (existing.qty <= 1) {
        const { [action.id]: _removed, ...rest } = state;
        return rest;
      }
      return { ...state, [action.id]: { ...existing, qty: existing.qty - 1 } };
    }
    case "REMOVE": {
      if (!state[action.id]) return state;
      const { [action.id]: _removed, ...rest } = state;
      return rest;
    }
    case "CLEAR":
      return {};
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable (private mode / quota) — cart stays in memory */
    }
  }, [items]);

  // Dispatch-only actions never depend on state, so keep them stable.
  const add = useCallback((item) => dispatch({ type: "ADD", item }), []);
  const decrement = useCallback(
    (id) => dispatch({ type: "DECREMENT", id }),
    [],
  );
  const removeItem = useCallback((id) => dispatch({ type: "REMOVE", id }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const value = useMemo(() => {
    const lines = Object.values(items);
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      totalPaise: lines.reduce(
        (sum, line) => sum + line.qty * (line.price ?? 0),
        0,
      ),
      qtyOf: (id) => items[id]?.qty ?? 0,
      add,
      decrement,
      removeItem,
      clear,
    };
  }, [items, add, decrement, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

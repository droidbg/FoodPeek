import { createContext, useContext, useMemo, useReducer } from "react";

/**
 * Menu-scoped cart. Holds the items a user has added while browsing a single
 * restaurant's menu and powers the Add steppers and the floating order bar.
 *
 * State shape: a map of `{ [id]: { id, name, price, qty } }` (price in paise).
 */
const MenuCartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT": {
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
        const next = { ...state };
        delete next[action.id];
        return next;
      }
      return { ...state, [action.id]: { ...existing, qty: existing.qty - 1 } };
    }
    case "CLEAR":
      return {};
    default:
      return state;
  }
};

export const MenuCartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, {});

  const value = useMemo(() => {
    const list = Object.values(items);
    return {
      items,
      count: list.reduce((sum, item) => sum + item.qty, 0),
      totalPaise: list.reduce(
        (sum, item) => sum + item.qty * (item.price ?? 0),
        0,
      ),
      qtyOf: (id) => items[id]?.qty ?? 0,
      add: (item) => dispatch({ type: "INCREMENT", item }),
      remove: (id) => dispatch({ type: "DECREMENT", id }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [items]);

  return (
    <MenuCartContext.Provider value={value}>
      {children}
    </MenuCartContext.Provider>
  );
};

export const useMenuCart = () => {
  const context = useContext(MenuCartContext);
  if (!context) {
    throw new Error("useMenuCart must be used within a MenuCartProvider");
  }
  return context;
};

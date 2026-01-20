# FoodPeek - React Industry Standard Folder Structure

## 📁 Project Structure

```
client/src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (Shimmer, Symbols, etc.)
│   ├── layout/          # Layout components (Header, Footer)
│   ├── About.js
│   ├── Accordian.js
│   ├── AccordionBody.js
│   ├── Contact/
│   ├── Error.js
│   ├── Footer/
│   ├── Header/
│   ├── Menu/
│   ├── NoInternet.js
│   ├── NonVegSymbol.js
│   ├── RestaurantCard.js
│   ├── Shimmer.js
│   ├── User.js
│   ├── UserCard.js
│   └── VegSymbol.js
│
├── features/            # Feature-based modules (future organization)
│   ├── restaurants/     # Restaurant listing feature
│   ├── menu/           # Menu viewing feature
│   └── cart/           # Shopping cart feature
│
├── hooks/              # Custom React hooks
│   ├── useMenu.js      # Menu data fetching with SWR
│   ├── useOnlineStatus.js
│   └── useRestaurants.js  # Restaurant list fetching with SWR
│
├── lib/                # Third-party library configurations
│   └── swr-provider.js # SWR global configuration
│
├── pages/              # Page components (route components)
│   ├── cart/
│   │   └── Cart.js
│   ├── home/
│   │   ├── Home.js
│   │   └── Restaurants.js
│   └── menu/
│       └── Menu.js
│
├── services/           # API service layer
│   └── api.js         # API endpoints, fetcher, and SWR config
│
├── utils/              # Utility functions and constants
│   ├── constants.js    # App constants (deprecated - moved to services/api.js)
│   ├── colors.js
│   ├── footer-list.js
│   ├── res-list.js
│   ├── UserContext.js
│   └── useRestaurantMenu.js (deprecated - use hooks/useMenu.js)
│
└── App.js             # Root application component
```

---

## 🎯 Key Improvements

### 1. **SWR Integration**
- ✅ Centralized API service layer (`services/api.js`)
- ✅ Custom hooks using SWR (`hooks/useRestaurants.js`, `hooks/useMenu.js`)
- ✅ Global SWR configuration (`lib/swr-provider.js`)
- ✅ Automatic caching, revalidation, and deduplication
- ✅ Better error handling and loading states

### 2. **Separation of Concerns**
- **Components**: Pure UI components
- **Hooks**: Data fetching and business logic
- **Services**: API configuration and endpoints
- **Pages**: Route-level components
- **Utils**: Helper functions

### 3. **Performance Benefits**
- ✅ Automatic request deduplication
- ✅ Cache-first data fetching
- ✅ Background revalidation
- ✅ Optimistic UI updates
- ✅ Reduced network requests

---

## 📝 Migration Guide

### Old Pattern (Manual Fetch)
```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  };
  fetchData();
}, []);
```

### New Pattern (SWR)
```javascript
const { restaurants, isLoading, isError } = useRestaurants();
```

---

## 🔄 Data Flow

```
User Action
    ↓
Component (uses custom hook)
    ↓
Custom Hook (useSWR)
    ↓
Service Layer (api.js)
    ↓
API Endpoint
    ↓
SWR Cache ← → Component (auto-updates)
```

---

## 🚀 Benefits of This Structure

### **Scalability**
- Easy to add new features
- Clear separation of concerns
- Modular architecture

### **Maintainability**
- Easy to find and update code
- Consistent patterns across the app
- Better code organization

### **Performance**
- Automatic caching with SWR
- Reduced network requests
- Optimized re-renders

### **Developer Experience**
- Clear file organization
- Easy to onboard new developers
- Industry-standard patterns

---

## 📚 File Naming Conventions

- **Components**: PascalCase (e.g., `RestaurantCard.js`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useRestaurants.js`)
- **Utils**: camelCase (e.g., `constants.js`)
- **Services**: camelCase (e.g., `api.js`)
- **Pages**: PascalCase (e.g., `Home.js`)

---

## 🔧 SWR Features Used

1. **Automatic Revalidation**
   - On window focus
   - On network reconnect
   - On interval (configurable)

2. **Request Deduplication**
   - Multiple components can use the same hook
   - Only one network request is made

3. **Cache Management**
   - Automatic cache invalidation
   - Manual cache mutation
   - Optimistic updates

4. **Error Handling**
   - Automatic retry on error
   - Configurable retry count
   - Error boundaries support

---

## 📖 Usage Examples

### Fetching Restaurant List
```javascript
import { useRestaurants } from '../../hooks/useRestaurants';

function RestaurantList() {
  const { restaurants, isLoading, isError } = useRestaurants();
  
  if (isLoading) return <Shimmer />;
  if (isError) return <Error />;
  
  return <div>{/* Render restaurants */}</div>;
}
```

### Fetching Menu Data
```javascript
import useMenu from '../../hooks/useMenu';

function Menu() {
  const menuData = useMenu();
  
  if (!menuData) return <Shimmer />;
  
  return <div>{/* Render menu */}</div>;
}
```

---

## 🎯 Next Steps (Future Improvements)

1. **Feature-based Organization**
   - Move related components to feature folders
   - Example: `features/restaurants/components/RestaurantCard.js`

2. **TypeScript Migration**
   - Add type safety
   - Better IDE support
   - Fewer runtime errors

3. **State Management**
   - Add Zustand or Redux for global state
   - Keep SWR for server state

4. **Testing**
   - Unit tests for hooks
   - Integration tests for features
   - E2E tests for critical flows

---

## 📦 Dependencies

- **swr**: ^2.x - Data fetching and caching
- **react**: ^19.x - UI library
- **react-router**: ^7.x - Routing

---

## 🔗 Resources

- [SWR Documentation](https://swr.vercel.app/)
- [React Best Practices](https://react.dev/learn)
- [Folder Structure Guide](https://www.robinwieruch.de/react-folder-structure/)

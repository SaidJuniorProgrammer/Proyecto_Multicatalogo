import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard.tsx";
import Catalogo from "./components/Catalogo";
import MiRed from "./components/MiRed.tsx";
import Carrito from "./components/Carrito";
import Login from "./components/Login";
import DetalleProducto from "./components/DetalleProducto";
import Storefront from "./components/Storefront";
import Checkout from "./components/Checkout";
import Confirmacion from "./components/Confirmacion";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
  const { userRole } = useAuth();
  return userRole === "admin" ? <Outlet /> : <Navigate to="/tienda" replace />;
};

const CartBoundary = ({ children }: { children: ReactNode }) => {
  const { userEmail } = useAuth();
  return <CartProvider key={userEmail ?? "anonimo"}>{children}</CartProvider>;
};

function App() {
  return (
    <CartBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route element={<AdminRoute />}>
                <Route index element={<Dashboard />} />
                <Route path="mi-red" element={<MiRed />} />
              </Route>
              <Route path="tienda" element={<Storefront />} />
              <Route path="catalogo" element={<Catalogo />} />
              <Route path="producto/:id" element={<DetalleProducto />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="confirmacion" element={<Confirmacion />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartBoundary>
  );
}

export default App;
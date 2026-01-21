import { createBrowserRouter } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
import HowItWorksPage from "../features/how-it-works/pages/HowItWorksPage";
import ContactPage from "../features/contact/pages/ContactPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/como-funciona", element: <HowItWorksPage /> },
  { path: "/contacto", element: <ContactPage /> },
]);
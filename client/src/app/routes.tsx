import { createBrowserRouter } from "react-router-dom";
import CatsPage from "../features/cats/pages/CatsPage";
import HowItWorksPage from "../features/how-it-works/pages/HowItWorksPage";
import ContactPage from "../features/contact/pages/ContactPage";

export const router = createBrowserRouter([
  { path: "/", element: <CatsPage /> },
  { path: "/como-funciona", element: <HowItWorksPage /> },
  { path: "/contacto", element: <ContactPage /> },
]);
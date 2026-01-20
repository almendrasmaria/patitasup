import { createBrowserRouter } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
import HowItWorksPage from "../features/how-it-works/pages/HowItWorksPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/como-funciona", element: <HowItWorksPage /> },
]);
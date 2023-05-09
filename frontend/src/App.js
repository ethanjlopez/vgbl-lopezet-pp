import React, { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from "react-dom/client";

// Stylings
import "./css/App.css";
// Pages
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import GameEntryPage from "./pages/GameEntryPage";
// Root Layout
import RootLayout from "./layouts/RootLayout";
import BrowsePage from "./pages/BrowsePage";
import CollectionPage from "./pages/CollectionPage";
import WishlistPage from "./pages/WishlistPage";
import PlayingPage from "./pages/PlayingPage";
import CompletedPage from "./pages/CompletedPage";
import PlannedPage from "./pages/PlannedPage";
import DroppedPage from "./pages/DroppedPage";
import BacklogPage from "./pages/BacklogPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="/:id" element={<GameEntryPage />} />
      <Route path="browse" element={<BrowsePage />} />
      <Route path="collection" element={<CollectionPage />} />
      <Route path="wishlist" element={<WishlistPage />} />
      <Route path="playing" element={<PlayingPage />} />
      <Route path="completed" element={<CompletedPage />} />
      <Route path="planned" element={<PlannedPage />} />
      <Route path="dropped" element={<DroppedPage />} />
      <Route path="backlog" element={<BacklogPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Trending from "./pages/Trending";
import ReaderDashboard from "./pages/ReaderDashboard";
import Community from "./pages/Community";
import Governance from "./pages/Governance";
import Profile from "./pages/Profile";
import MangaDetail from "./pages/MangaDetail";
import ChapterReader from "./pages/ChapterReader";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/reader-dashboard" element={<ReaderDashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/community" element={<Community />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manga/:id" element={<MangaDetail />} />
        <Route path="/read/:mangaId/:chapterId" element={<ChapterReader />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { YearProvider } from "./contexts/YearContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Details from "./components/Details";
import Members from "./components/Members";

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <YearProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Details/:eventId" element={<Details />} />
          <Route path="/members" element={<Members />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </YearProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;

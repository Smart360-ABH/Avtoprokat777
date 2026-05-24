import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import BranchesPage from "@/pages/BranchesPage";
import BookingPage from "@/pages/BookingPage";
import GaragePage from "@/pages/GaragePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/catalog" component={CatalogPage} />
              <Route path="/branches" component={BranchesPage} />
              <Route path="/booking" component={BookingPage} />
              <Route path="/garage" component={GaragePage} />
              <Route>
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h1 className="font-serif text-4xl font-bold text-foreground mb-4">404</h1>
                    <p className="text-muted-foreground mb-6">Страница не найдена</p>
                    <a href="/" className="text-primary hover:underline font-medium">На главную</a>
                  </div>
                </div>
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

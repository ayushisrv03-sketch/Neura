import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AuthPage from "@/pages/AuthPage";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import Onboarding from "@/pages/Onboarding";
import { Route, Switch } from "wouter";
import { useDyslexiaFont } from "./hooks/useLearningPreferences";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import TopicLesson from "./pages/TopicLesson";
import AITutorPage from "./pages/AITutorPage";

// Public marketing/auth routes live at the top level. Everything under
// /dashboard is the authenticated app: <DashboardLayout> (rendered inside
// Home/TopicLesson) redirects to /login on the client whenever there's no
// session, and the server additionally refuses to serve /dashboard* HTML to
// a logged-out request (see server/_core/index.ts's guardProtectedPages),
// so a direct/typed-in visit is caught even before the SPA loads.
function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Landing} />
      <Route path={"/login"} component={() => <AuthPage defaultTab="login" />} />
      <Route path={"/signup"} component={() => <AuthPage defaultTab="signup" />} />
      <Route path={"/onboarding"} component={Onboarding} />
      <Route path={"/dashboard"} component={Home} />
      <Route path={"/dashboard/tutor/:topic"} component={AITutorPage} />
      <Route path={"/dashboard/tutor"} component={AITutorPage} />
      <Route path={"/dashboard/lessons/:topic"} component={TopicLesson} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  useDyslexiaFont();

  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

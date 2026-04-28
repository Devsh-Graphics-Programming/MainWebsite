import { Switch, Route, Router as WouterRouter } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Nabla from "@/pages/nabla";
import Services from "@/pages/services";
import NotFound from "@/pages/not-found";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="antialiased h-dvh flex flex-col">
            <Navbar />
            <div className="p-4 flex-1">
                {children}
            </div>
            <Footer />
        </div>
    );
}

function Router() {
    return (
        <Layout>
            <Switch>
                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/nabla" component={Nabla} />
                <Route path="/services" component={Services} />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    );
}

function App() {
    return (
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
        </WouterRouter>
    );
}

export default App;

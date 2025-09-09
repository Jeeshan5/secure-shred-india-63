import { useState } from "react";
import { SecureWiperHeader } from "./secure-wiper-header";
import { HomeScreen } from "./home-screen";
import { ProgressScreen } from "./progress-screen";
import { CertificateScreen } from "./certificate-screen";

type AppState = "home" | "progress" | "certificate";

export function SecureWiperApp() {
  const [currentScreen, setCurrentScreen] = useState<AppState>("home");
  const [certificate, setCertificate] = useState<any>(null);

  const handleStartWipe = () => {
    setCurrentScreen("progress");
  };

  const handleWipeComplete = (cert: any) => {
    setCertificate(cert);
    setCurrentScreen("certificate");
  };

  const handleNewWipe = () => {
    setCertificate(null);
    setCurrentScreen("home");
  };

  return (
    <div className="min-h-screen bg-background">
      <SecureWiperHeader />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        {currentScreen === "home" && (
          <HomeScreen onStartWipe={handleStartWipe} />
        )}
        
        {currentScreen === "progress" && (
          <ProgressScreen onComplete={handleWipeComplete} />
        )}
        
        {currentScreen === "certificate" && certificate && (
          <CertificateScreen 
            certificate={certificate} 
            onNewWipe={handleNewWipe} 
          />
        )}
      </main>
      
      <footer className="border-t bg-background/95 backdrop-blur mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>
              🇮🇳 Proudly supporting India's circular economy and e-waste management initiative
            </p>
            <p className="text-xs">
              Compliant with NIST SP 800-88, DoD 5220.22-M, and ISO 27001 standards
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
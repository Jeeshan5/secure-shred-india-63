import { ThemeProvider } from "@/components/theme-provider";
import { SecureWiperApp } from "@/components/secure-wiper-app";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="secure-wiper-theme">
      <SecureWiperApp />
    </ThemeProvider>
  );
};

export default Index;

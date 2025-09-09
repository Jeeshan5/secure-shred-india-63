import { Shield } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Badge } from "@/components/ui/badge";

export function SecureWiperHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground floating-element">
            <Shield className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gradient">Secure Data Wiper</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Professional Data Sanitization
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="hidden sm:inline-flex">
            v1.0.0
          </Badge>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
import { useState } from "react";
import { Shield, Zap, RotateCcw, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import securityHero from "@/assets/security-hero.jpg";

interface HomeScreenProps {
  onStartWipe: () => void;
}

export function HomeScreen({ onStartWipe }: HomeScreenProps) {
  const [isStarting, setIsStarting] = useState(false);
  const { toast } = useToast();

  const handleStartWipe = async () => {
    setIsStarting(true);
    
    // Simulate security check
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // In real app, this would check admin permissions
      toast({
        title: "Security Check Complete",
        description: "Administrator permissions verified. Initializing secure wipe...",
      });
      
      setTimeout(() => {
        onStartWipe();
        setIsStarting(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Permission Error",
        description: "Administrator privileges required for secure data wiping.",
        variant: "destructive",
      });
      setIsStarting(false);
    }
  };

  const securityFeatures = [
    {
      icon: RotateCcw,
      title: "Multi-Pass Overwrite",
      description: "DoD 5220.22-M standard with 3-pass verification",
      badge: "Military Grade"
    },
    {
      icon: FileText,
      title: "Compliance Certificate",
      description: "Digitally signed proof of secure data erasure",
      badge: "NIST SP 800-88"
    },
    {
      icon: CheckCircle2,
      title: "Sector Verification",
      description: "Complete HPA/DCO and SSD sector sanitization",
      badge: "100% Coverage"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="security-hero relative rounded-3xl p-8 md:p-12 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${securityHero})` }}
        />
        <div className="relative z-10 text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center floating-element">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient">
              Professional Data Wiping
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Securely erase sensitive data with military-grade algorithms. 
              Ensuring complete data sanitization for responsible IT asset disposal.
            </p>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleStartWipe}
              disabled={isStarting}
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-floating animate-bounce-in"
            >
              {isStarting ? (
                <>
                  <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" />
                  Initializing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Start Secure Wipe
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Warning Alert */}
      <Alert className="border-destructive/50 bg-destructive/5 animate-slide-up">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <AlertDescription className="text-destructive font-medium">
          <strong>Critical Warning:</strong> This process will permanently and irreversibly 
          delete ALL data on the selected storage device. Ensure you have backed up any 
          important files before proceeding.
        </AlertDescription>
      </Alert>

      {/* Security Features */}
      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {securityFeatures.map((feature, index) => (
          <Card 
            key={index} 
            className="glass-card hover:shadow-floating transition-all duration-300 hover:-translate-y-1 animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <Badge 
                  variant="secondary" 
                  className="security-badge text-xs"
                >
                  {feature.badge}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="text-center space-y-2 pt-4">
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>NIST Compliant</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>Audit Ready</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>Secure & Verified</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Trusted by organizations across India for secure IT asset recycling
        </p>
      </div>
    </div>
  );
}
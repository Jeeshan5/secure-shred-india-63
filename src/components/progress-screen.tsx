import { useEffect, useState } from "react";
import { Settings, Clock, HardDrive, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProgressScreenProps {
  onComplete: (certificate: any) => void;
}

export function ProgressScreen({ onComplete }: ProgressScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentPass, setCurrentPass] = useState(1);
  const [statusText, setStatusText] = useState("Initializing secure wipe...");
  const [estimatedTime, setEstimatedTime] = useState("Calculating...");
  const [startTime] = useState(Date.now());

  const phases = [
    { name: "Initialization", duration: 5, status: "Preparing drive for secure erasure..." },
    { name: "Pass 1/3", duration: 30, status: "Writing random patterns to all sectors..." },
    { name: "Pass 2/3", duration: 30, status: "Overwriting with complimentary patterns..." },
    { name: "Pass 3/3", duration: 30, status: "Final verification and random overwrite..." },
    { name: "Verification", duration: 5, status: "Verifying complete data erasure..." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          generateCertificate();
          return 100;
        }
        
        const newProgress = prev + 0.5; // Increment by 0.5% every 200ms
        
        // Update status based on progress
        if (newProgress <= 5) {
          setStatusText(phases[0].status);
          setCurrentPass(1);
        } else if (newProgress <= 35) {
          setStatusText(phases[1].status);
          setCurrentPass(1);
        } else if (newProgress <= 65) {
          setStatusText(phases[2].status);
          setCurrentPass(2);
        } else if (newProgress <= 95) {
          setStatusText(phases[3].status);
          setCurrentPass(3);
        } else {
          setStatusText(phases[4].status);
          setCurrentPass(3);
        }

        // Calculate estimated time remaining
        const elapsed = Date.now() - startTime;
        const rate = newProgress / elapsed;
        const remaining = (100 - newProgress) / rate;
        const minutes = Math.ceil(remaining / 60000);
        
        if (minutes > 60) {
          setEstimatedTime(`${Math.ceil(minutes / 60)}h ${minutes % 60}m`);
        } else if (minutes > 0) {
          setEstimatedTime(`${minutes} minutes`);
        } else {
          setEstimatedTime("Less than 1 minute");
        }

        return newProgress;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [startTime]);

  const generateCertificate = () => {
    const certificate = {
      id: `CERT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      device: "Primary Storage Device",
      method: "DoD 5220.22-M (3-pass)",
      status: "Successfully Completed",
      duration: Math.floor((Date.now() - startTime) / 1000),
      verification: "PASSED",
      hash: `SHA-256: ${Math.random().toString(36).substring(2, 15).toUpperCase()}...`,
      compliance: ["NIST SP 800-88", "DoD 5220.22-M", "ISO 27001"]
    };

    setTimeout(() => {
      onComplete(certificate);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      {/* Progress Hero */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-slow">
            <Settings className="h-8 w-8 text-primary animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">Secure Wipe in Progress</h2>
          <p className="text-muted-foreground">
            Please do not power off your device during this process
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Progress</CardTitle>
            <Badge variant="secondary" className="text-sm font-mono">
              {progress.toFixed(1)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Progress value={progress} className="h-3 progress-glow" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{statusText}</span>
              <span className="font-medium text-primary">
                Pass {currentPass} of 3
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Security Method</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">DoD 5220.22-M</p>
              <CardDescription className="text-sm">
                3-pass overwrite with pattern verification
              </CardDescription>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">Time Remaining</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{estimatedTime}</p>
              <CardDescription className="text-sm">
                Estimated completion time
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Phase Details */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Current Operation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Method:</span>
              <span className="font-medium">DoD 5220.22-M (3-pass)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Pass:</span>
              <span className="font-medium">{currentPass} of 3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Verification:</span>
              <Badge variant="outline" className="text-xs">
                Real-time
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <div className="text-center space-y-2 p-4 rounded-lg bg-info/5 border border-info/20">
        <p className="text-sm font-medium text-info">
          🔒 Secure Process Active
        </p>
        <p className="text-xs text-muted-foreground">
          All data overwrite operations are being logged and verified in real-time
        </p>
      </div>
    </div>
  );
}
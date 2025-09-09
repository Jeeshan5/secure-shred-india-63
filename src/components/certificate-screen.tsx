import { useState } from "react";
import { CheckCircle2, Download, RotateCcw, FileText, Shield, Clock, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface CertificateScreenProps {
  certificate: any;
  onNewWipe: () => void;
}

export function CertificateScreen({ certificate, onNewWipe }: CertificateScreenProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExportCertificate = async () => {
    setIsExporting(true);
    
    // Simulate certificate generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // In real app, this would generate and download PDF/JSON
      const certificateData = {
        ...certificate,
        exportedAt: new Date().toISOString(),
        format: "PDF"
      };
      
      // Simulate download
      const blob = new Blob([JSON.stringify(certificateData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `secure-wipe-certificate-${certificate.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Certificate Exported",
        description: "Secure wipe certificate has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      {/* Success Hero */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center animate-bounce-in">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-success">
            Wipe Completed Successfully
          </h2>
          <p className="text-muted-foreground">
            Data has been securely erased and verified according to industry standards
          </p>
        </div>
      </div>

      {/* Certificate Card */}
      <Card className="glass-card shadow-floating">
        <CardHeader className="bg-success-gradient text-success-foreground rounded-t-lg">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6" />
            <div>
              <CardTitle className="text-xl">Secure Wipe Certificate</CardTitle>
              <CardDescription className="text-success-foreground/80">
                Digitally verified proof of data sanitization
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Certificate Details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Certificate ID:</span>
                <span className="font-mono text-sm">{certificate.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge className="bg-success text-success-foreground">
                  {certificate.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Device:</span>
                <span className="text-sm font-medium">{certificate.device}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Method:</span>
                <span className="text-sm font-medium">{certificate.method}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Duration:</span>
                <span className="text-sm font-medium">
                  {formatDuration(certificate.duration)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Verification:</span>
                <Badge variant="outline" className="text-success border-success">
                  {certificate.verification}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timestamp */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Completed:</span>
            </div>
            <span className="text-sm font-medium">
              {new Date(certificate.timestamp).toLocaleString()}
            </span>
          </div>

          {/* Hash Verification */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Verification Hash:</span>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <code className="text-xs font-mono break-all">{certificate.hash}</code>
            </div>
          </div>

          {/* Compliance Standards */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Compliance Standards:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {certificate.compliance.map((standard: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  ✓ {standard}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleExportCertificate}
          disabled={isExporting}
          variant="outline"
          size="lg"
          className="flex-1 sm:flex-none"
        >
          {isExporting ? (
            <>
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export Certificate
            </>
          )}
        </Button>
        
        <Button
          onClick={onNewWipe}
          size="lg"
          className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Start New Wipe
        </Button>
      </div>

      {/* Security Notice */}
      <div className="text-center space-y-2 p-4 rounded-lg bg-success/5 border border-success/20">
        <p className="text-sm font-medium text-success">
          🔒 Device Ready for Safe Disposal
        </p>
        <p className="text-xs text-muted-foreground">
          This certificate serves as legal proof that all data has been irreversibly destroyed 
          according to international standards. Safe for IT asset recycling.
        </p>
      </div>
    </div>
  );
}
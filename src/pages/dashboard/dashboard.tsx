import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [printers, setPrinters] = useState<any[]>([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Get available printers when component mounts
    const getPrinters = async () => {
      try {
        const availablePrinters = await (window as any).ipcRenderer.invoke("get-printers");
        setPrinters(availablePrinters);
        // console.log("Available printers:", availablePrinters);
      } catch (error) {
        console.error("Error getting printers:", error);
        toast({
          title: "Error",
          description: "Failed to get available printers",
          variant: "destructive",
        });
      }
    };
    
    getPrinters();
    
    // Listen for print success/failure messages
    const handlePrintSuccess = () => {
      setIsPrinting(false);
      toast({
        title: "Success",
        description: "Print job sent successfully!",
      });
    };
    
    const handlePrintError = (_event: any, error: string) => {
      console.log(error);
      
      setIsPrinting(false);
      toast({
        title: "Print Error",
        description: error || "Failed to send print job",
        variant: "destructive",
      });
    };
    
    // Add timeout to reset printing state if no response
    const printTimeout = setTimeout(() => {
      if (isPrinting) {
        setIsPrinting(false);
        toast({
          title: "Warning",
          description: "Print request timed out. Please check printer status.",
          variant: "destructive",
        });
      }
    }, 10000); // 10 seconds timeout
    
    (window as any).ipcRenderer.on("print-success", handlePrintSuccess);
    (window as any).ipcRenderer.on("print-error", handlePrintError);
    
    return () => {
      (window as any).ipcRenderer.off("print-success", handlePrintSuccess);
      (window as any).ipcRenderer.off("print-error", handlePrintError);
      clearTimeout(printTimeout);
    };
  }, [toast]);

  const handlePrint = async () => {
    setIsPrinting(true);
    
    const order = {
      id: "ORD-12345",
      date: "2025-08-23",
      items: [
        { name: "Stol", qty: 1, price: 500000 },
        { name: "Stul", qty: 4, price: 150000 },
      ],
      total: 1100000,
      customer: "Tillayev Ikromjon",
    };

    try {
      // Use the preload script's ipcRenderer
      (window as any).ipcRenderer.send("print-receipt", order);
    } catch (error) {
      console.error("Error sending print request:", error);
      toast({
        title: "Error",
        description: "Failed to send print request",
        variant: "destructive",
      });
      setIsPrinting(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="space-y-4">
        <Button variant={"secondary"} onClick={handlePrint} disabled={isPrinting} >
          {isPrinting ? "Printing..." : "Print Receipt"}
        </Button>
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Available Printers:</h2>
          {printers.length > 0 ? (
            <div className="space-y-2">
              {printers.map((printer, index) => (
                <div key={index} className="p-3 bg-gray-100 rounded-lg">
                  <p className="font-medium">{printer.name}</p>
                  <p className="text-sm text-gray-600">
                    Status: {printer.status === 1 ? "Ready" : "Not Ready"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Default: {printer.isDefault ? "Yes" : "No"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No printers found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
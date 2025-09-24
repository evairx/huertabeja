"use client";
import {
  createContext,
  PropsWithChildren,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

interface AlertContextType {
  open: boolean;
  message: string;
  showAlert: (msg: string, duration?: number) => void;
  percentage: number;
}

export const AlertContext = createContext<AlertContextType>({
  open: false,
  message: "",
  showAlert: () => {},
  percentage: 0,
});

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [percentage, setPercentage] = useState(100);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showAlert = useCallback((msg: string, duration = 3500) => {
    if (timerRef.current) clearInterval(timerRef.current);

    setMessage(msg);
    setOpen(true);
    setPercentage(100);

    const steps = 100;
    const intervalTime = duration / steps;
    let progress = 100;

    timerRef.current = setInterval(() => {
      progress -= 1;
      setPercentage(progress);

      if (progress <= 0) {
        clearInterval(timerRef.current!);
        setOpen(false);
      }
    }, intervalTime);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <AlertContext.Provider value={{ open, message, showAlert, percentage }}>
      {children}
    </AlertContext.Provider>
  );
};

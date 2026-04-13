import { useEffect, useState } from "react";

let listeners: ((msg: string) => void)[] = [];

export const triggerToast = (message: string) => {
  listeners.forEach((l) => l(message));
};

const Toast = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const listener = (msg: string) => {
      setMessage(msg);
      setTimeout(() => setMessage(""), 3000);
    };

    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-green-500 text-black px-6 py-3 rounded-xl font-bold shadow-xl animate-pulse z-50">
      {message}
    </div>
  );
};

export default Toast;
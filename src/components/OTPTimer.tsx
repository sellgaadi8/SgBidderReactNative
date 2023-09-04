/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef} from 'react';

type OTPTimerProps = {
  setCanRequestOtp: (value: boolean) => void;
  setSeconds: (value: string) => void;
};

export default function OTPTimer({
  setCanRequestOtp,
  setSeconds,
}: OTPTimerProps) {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    startTimer();

    return () => clearTimer();
  }, []);

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }

  /**
   * Timer for 30 seconds, so user must wait for 30 seconds every time when otp requested
   */
  function startTimer() {
    setCanRequestOtp(false);

    const startedAt = new Date();
    const waitTill = new Date(
      new Date().setSeconds(startedAt.getSeconds() + 30),
    );

    timerRef.current = setInterval(() => {
      const now = new Date();
      const difference = waitTill.getTime() - now.getTime();

      if (difference <= 0) {
        clearTimer();
        setCanRequestOtp(true);
        setSeconds('30');
      } else {
        setSeconds(difference.toString().slice(0, -3));
      }
    }, 1000);
  }

  return null;
}

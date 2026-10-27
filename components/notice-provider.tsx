"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type Notice = { message: string; title: string };
const NoticeContext = createContext<(notice: Notice) => void>(() => {});

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!notice) return;
    const element = dialog.current;
    opener.current = document.activeElement as HTMLElement;
    element?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      opener.current?.focus();
    };
  }, [notice]);

  return (
    <NoticeContext.Provider value={setNotice}>
      {children}
      <dialog
        ref={dialog}
        className="notice-dialog"
        aria-labelledby="notice-title"
        aria-describedby="notice-description"
        onCancel={() => setNotice(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              setNotice(null);
          }
        }}
      >
        <button
          type="button"
          className="modal-close"
          onClick={() => setNotice(null)}
          aria-label="Close dialog"
          autoFocus
        >
          ×
        </button>
        <span className="eyebrow">Pyinyar Lam Sone 2027</span>
        <h2 id="notice-title">{notice?.title}</h2>
        <p id="notice-description">{notice?.message}</p>
        <a href="mailto:meseventservices@gmail.com" className="btn btn-navy">
          Contact Organizers →
        </a>
      </dialog>
    </NoticeContext.Provider>
  );
}

export function NoticeButton({
  message,
  title = "Coming Soon",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { message: string }) {
  const show = useContext(NoticeContext);
  return (
    <button {...props} type="button" onClick={() => show({ message, title })}>
      {children}
    </button>
  );
}

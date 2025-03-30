import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
          // <Toast key={id} {...props}>
          //   <div className="grid gap-1">
          //     {title && <ToastTitle>{title}</ToastTitle>}
          //     {description && (
          //       <ToastDescription>{description}</ToastDescription>
          //     )}
          //   </div>
          //   {action}
          //   <ToastClose />
          // </Toast>
        );
      })}
      <ToastViewport className="sm:bottom-1/2 sm:right-1/2 sm:flex-col sm:translate-x-1/2 sm:translate-y-1/2" />
    </ToastProvider>
  );
}

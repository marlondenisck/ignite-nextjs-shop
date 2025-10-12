import { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps} from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const buttonVariants = cva(
  // Estilos base
  "bg-green300 text-white rounded border-0 px-2 py-1 hover:brightness-75 transition-all",
  {
    variants: {
      // Você pode adicionar variantes se precisar
      size: {
        default: "px-2 py-1",
        large: "px-4 py-2",
      }
    },
    defaultVariants: {
      size: "default",
    }
  }
)

interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

  export function Button({ className, size, children, ...props }: ButtonProps) {
    return (
      <button className={twMerge(buttonVariants({ size, className }))} {...props}>
        <span className="font-bold">{children}</span>
      </button>
    )
}
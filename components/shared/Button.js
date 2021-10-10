import Link from "next/link";
import cn from "classnames";

function Button({
  appearance = "primary",
  children,
  href = "/",
  className,
  disabled,
  ...props
}) {
  const styles = {
    button:
      "py-2 px-4 inline-flex justify-center rounded-md shadow-sm text-sm border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    primary: "border-transparent text-white bg-indigo-600 hover:bg-indigo-700",
    secondary: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50",
    disabledPrimary: "text-white bg-indigo-200 cursor-not-allowed",
  };

  if (disabled) {
    return (
      <button
        className={cn(styles.button, className, {
          [styles.disabledPrimary]: disabled,
        })}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href}>
        <a
          className={cn(styles.button, className, {
            [styles.primary]: appearance === "primary",
            [styles.secondary]: appearance === "secondary",
          })}
          {...props}
        >
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === "primary",
        [styles.secondary]: appearance === "secondary",
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

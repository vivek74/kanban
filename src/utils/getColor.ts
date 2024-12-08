export type Color =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

export function getColor(): Color {
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    undefined,
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex] as Color;
}

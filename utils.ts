export function formatTime (timestamp: number): string {
  return (~~timestamp).toString().padStart(2, "0");
}
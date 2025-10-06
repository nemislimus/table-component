import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

/**
 * Props для компонента FilterInput
 */
interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Компонент поля ввода для фильтрации
 *
 * Реализует фильтрацию в реальном времени с иконкой поиска
 */
export function FilterInput({ value, onChange, placeholder = "Поиск..." }: FilterInputProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}

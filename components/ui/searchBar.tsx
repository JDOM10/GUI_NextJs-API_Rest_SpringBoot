import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const options = ['clientes', 'planes', 'pagos', 'suscripciones', 'resultados', 'suscribete', 'inicio'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
  };

  const handleSearch = (option?: string) => {
    const searchQuery = option || query;
    switch (searchQuery) {
      case 'clientes':
        router.push('/clientes');
        break;
      case 'planes':
        router.push('/planes');
        break;
      case 'pagos':
        router.push('/pagos');
        break;
      case 'suscripciones':
        router.push('/suscripciones');
        break;
        case 'resultados':
        router.push('/resultados');
        break;
        case 'suscribete':
        router.push('/suscribete');
        break;
        case 'inicio':
        router.push('/');
        break;
      default:
        alert('No hay resultados para esa búsqueda.');
    }
    setQuery('');
  };

  return (
    <div className="relative flex items-center space-x-2">
      <Input 
        placeholder="Buscar..." 
        value={query}
        onChange={handleInputChange}
        className="max-w-xs"
      />
      <Button onClick={() => handleSearch()} className="bg-black text-white">
        Buscar
      </Button>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSearch()}
            >
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
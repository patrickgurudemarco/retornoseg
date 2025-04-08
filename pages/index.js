
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [negocios, setNegocios] = useState([]);

  useEffect(() => {
    const fetchNegocios = async () => {
      const { data, error } = await supabase.from('negocios').select('*');
      if (!error) setNegocios(data);
    };
    fetchNegocios();
  }, []);

  return (
    <div>
      <h1>Painel de Comissões</h1>
      {negocios.map((n) => (
        <div key={n.id}>
          {n.cliente} - {n.produto} - R$ {n.comissao_vendedor}
        </div>
      ))}
    </div>
  );
}

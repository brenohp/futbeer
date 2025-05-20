'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TestSupabase() {
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('jogadores').select('*');
      if (error) {
        console.error('Erro ao buscar jogadores:', error);
      } else {
        console.log('Jogadores:', data);
      }
    }
    fetchData();
  }, []);

  return <div>Teste Supabase - Veja o console do navegador</div>;
}

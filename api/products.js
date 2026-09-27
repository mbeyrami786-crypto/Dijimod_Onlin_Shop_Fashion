import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { category, amazing, search, limit, sort } = req.query;
      let query = supabase.from('products').select('*').order('id', { ascending: true });
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      if (amazing === 'true') {
        query = query.eq('is_amazing', true);
      }
      if (search && String(search).trim() !== '') {
        const s = String(search).trim();
        query = query.or(`title_en.ilike.%${s}%,title_fa.ilike.%${s}%,title_ar.ilike.%${s}%,brand.ilike.%${s}%`);
      }
      if (sort === 'cheapest') query = query.order('discount_price', { ascending: true });
      else if (sort === 'expensive') query = query.order('discount_price', { ascending: false });
      else if (sort === 'rating') query = query.order('rating', { ascending: false });
      if (limit) query = query.limit(parseInt(String(limit), 10));
      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const body = req.body;
      const { data, error } = await supabase.from('products').insert(body).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    if (req.method === 'PUT') {
      const { id, ...rest } = req.body;
      if (!id) return res.status(400).json({ error: 'id required' });
      const { data, error } = await supabase.from('products').update(rest).eq('id', id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'id required' });
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API products error:', err);
    return res.status(500).json({ error: err.message });
  }
}

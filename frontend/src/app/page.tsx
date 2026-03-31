'use client';
import { useEffect, useState } from 'react';

interface Contact {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Función para traer los contactos del Backend
  const fetchContacts = async () => {
    try {
      const res = await fetch('http://localhost:3000/contacts');
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Error conectando al backend:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Función para guardar un nuevo contacto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:3000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    setName('');
    setEmail('');
    fetchContacts(); // Refrescar la lista
  };

  // Función para eliminar
  const deleteContact = async (id: number) => {
    await fetch(`http://localhost:3000/contacts/${id}`, { method: 'DELETE' });
    fetchContacts();
  };

  return (
    <main className="p-10 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6 text-center">Agenda de Contactos</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 border">
        <div className="mb-4">
          <input 
            type="text" placeholder="Nombre completo" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
            value={name} onChange={(e) => setName(e.target.value)} required
          />
        </div>
        <div className="mb-6">
          <input 
            type="email" placeholder="Correo electrónico" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
            value={email} onChange={(e) => setEmail(e.target.value)} required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar Contacto
        </button>
      </form>

      {/* Lista de Contactos */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border">
        <h2 className="bg-gray-100 p-4 font-semibold border-b">Lista</h2>
        <ul className="divide-y divide-gray-200">
          {contacts.length === 0 && <p className="p-4 text-gray-500 text-center text-sm">No hay contactos guardados</p>}
          {contacts.map((c) => (
            <li key={c.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
              <div>
                <p className="font-medium text-gray-800">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email}</p>
              </div>
              <button 
                onClick={() => deleteContact(c.id)}
                className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
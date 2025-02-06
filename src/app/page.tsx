"use client"
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod'; // Importando Zod
import { zodResolver } from '@hookform/resolvers/zod'; // Adaptador para React Hook Form

let count = 0;

export default function Home() {
  count++;

  console.log('Renderização da página:', count);

  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);

  const schema = z.object({
    name: z.string().min(1, { message: 'Nome é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }).min(1, { message: 'Email é obrigatório' }),
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: formState,
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Dados do formulário:', data);
    Object.keys(data).forEach((key) => {
      dispatch({ type: 'UPDATE_FORM', payload: { name: key, value: data[key] } });
    });
  };
  
  console.log('!@# watch', watch('email'))

  return (
    <div className='flex flex-col justify-center items-center h-screen' style={{ padding: '20px' }}>
      <h1>Teste de Formulário com Redux, React Hook Form e Zod</h1>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-4' style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Nome:</label>
          <input
            className='text-black'
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>} {/* Exibindo erro de validação */}
        </div>

        <div className='space-y-4' style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email:</label>
          <input
            className='text-black'
            type="text"
            id="email"
            {...register('email')}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>} {/* Exibindo erro de validação */}
        </div>

        <button className='w-full bg-white text-black rounded-lg' type="submit">Enviar</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Dados do Formulário:</h3>
        <p><strong>Nome:</strong> {formState.name}</p>
        <p><strong>Email:</strong> {formState.email}</p>
      </div>
    </div>
  );
}

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mockear servicios para evitar errores en las páginas que los usan
jest.mock('../services/oficinasService', () => ({
  getOficinas: jest.fn().mockResolvedValue([]),
  buscarOficinas: jest.fn().mockResolvedValue([]),
}));
jest.mock('../services/edificioService', () => ({
  getEdificios: jest.fn().mockResolvedValue([]),
}));
jest.mock('../services/gastoComunService');

// AÑADE ESTE MOCK para la librería de gráficos
jest.mock('react-chartjs-2', () => ({
  Pie: () => null,
  Bar: () => null,
}));


describe('Prueba de Integración de Navegación en App', () => {

  test('debería navegar a la página de Gasto Común al hacer clic en el enlace', async () => {
    render(<App />);

    // 1. Buscar el enlace en el Sidebar
    const enlaceGastoComun = screen.getByRole('link', { name: /gasto comun/i });

    // 2. Simular clic
    fireEvent.click(enlaceGastoComun);

    // 3. Verificar que el título de la página de Gasto Común es visible
    expect(await screen.findByRole('heading', { name: /calcular gasto común/i })).toBeInTheDocument();
  });

  test('debería navegar a la página de Administración al hacer clic en el enlace', async () => {
    render(<App />);

    // 1. Buscar el enlace
    const enlaceAdmin = screen.getByRole('link', { name: /administracion/i });
    
    // 2. Simular clic
    fireEvent.click(enlaceAdmin);

    // 3. Verificar que el título de la página de Administración es visible
    expect(await screen.findByRole('heading', { name: /buscar oficina/i })).toBeInTheDocument();
  });
});
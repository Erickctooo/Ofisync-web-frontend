import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GastoComun from '../GastoComun';
import * as gastoComunService from '../../../services/gastoComunService';
import * as edificioService from '../../../services/edificioService';

// Mockeamos los servicios
jest.mock('../../../services/gastoComunService');
jest.mock('../../../services/edificioService');

describe('Prueba de Integración para GastoComun', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
  });

  test('debería llamar a la API de cálculo al llenar y enviar el formulario', async () => {
    const edificiosMock = [{ id: 1, nombre: 'Edificio Central' }];
    const respuestaApiMock = { mensaje: 'Gasto calculado', gasto_por_m2: '500.00' };

    // Mocks iniciales
    edificioService.getEdificios.mockResolvedValue(edificiosMock);
    gastoComunService.calcularGastoComunApi.mockResolvedValue(respuestaApiMock);

    render(
      <MemoryRouter>
        <GastoComun />
      </MemoryRouter>
    );

    // Esperar a que cargue el select de edificios
    await screen.findByText('Edificio Central');

    // 1. Simular selección y llenado de datos
    fireEvent.change(screen.getByLabelText('Edificio:'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Mes:'), { target: { value: 'Diciembre 2025' } });
    fireEvent.change(screen.getByLabelText('Total de gastos ($):'), { target: { value: '250000' } });
    
    // 2. Simular clic en el botón
    fireEvent.click(screen.getByRole('button', { name: /calcular/i }));

    // 3. Verificar que se llamó a la API con los datos correctos
    await waitFor(() => {
      expect(gastoComunService.calcularGastoComunApi).toHaveBeenCalledWith({
        edificio_id: 1,
        mes: 'Diciembre 2025',
        total: 250000,
        descripcion: '',
      });
    });
  });
});
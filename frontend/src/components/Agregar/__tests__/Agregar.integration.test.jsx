import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Agregar from '../Agregar';
import * as edificioService from '../../../../services/edificioService';

// Mockeamos los servicios siendo explícitos con las funciones que usan los componentes hijos
jest.mock('../../../../services/edificioService', () => ({
  agregarEdificioApi: jest.fn(),
  getEdificios: jest.fn().mockResolvedValue([]), // <--- ¡LA CLAVE ESTÁ AQUÍ!
}));

jest.mock('../../../../services/pisoService', () => ({
    getPisos: jest.fn().mockResolvedValue([]),
    getPisosPorEdificio: jest.fn().mockResolvedValue([]),
}));
jest.mock('../../../../services/personaService', () => ({
    getPersonas: jest.fn().mockResolvedValue([]),
}));
jest.mock('../../../../services/oficinasService');


describe('Prueba de Integración para el componente Agregar', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
  });

  test('debería llamar al servicio agregarEdificioApi al llenar y enviar el formulario de edificio', async () => {
    edificioService.agregarEdificioApi.mockResolvedValue({ nombre: 'Edificio de Prueba' });

    render(
      <MemoryRouter>
        <Agregar />
      </MemoryRouter>
    );

    // 1. Simular que el usuario llena los campos
    fireEvent.change(screen.getByLabelText('Nombre Edificio:'), { target: { value: 'Edificio de Prueba' } });
    fireEvent.change(screen.getByLabelText('Pisos Totales:'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('Área bruta por piso (m²):'), { target: { value: '500' } });
    fireEvent.change(screen.getByLabelText('Área común (%):'), { target: { value: '20' } });

    // 2. Simular clic en el botón
    const botonesAgregar = screen.getAllByRole('button', { name: /agregar/i });
    fireEvent.click(botonesAgregar[0]);

    // 3. Verificar que se llamó al servicio con los datos correctos
    await waitFor(() => {
      expect(edificioService.agregarEdificioApi).toHaveBeenCalledWith({
        nombre: 'Edificio de Prueba',
        pisos_totales: '10',
        area_bruta_por_piso: '500',
        area_comun_pct: '20',
      });
    });

    // 4. Verificar que se mostró la alerta de éxito
    await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Edificio Edificio de Prueba agregado correctamente');
    });
  });
});
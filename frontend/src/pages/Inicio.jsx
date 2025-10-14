import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import "./Inicio.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const dashboard = () => {
  const pieData = {
    labels: ['Electricidad', 'Agua', 'Mantención', 'Otros'],
    datasets: [
      {
        data: [300000, 200000, 150000, 600000],
        backgroundColor: ['#184866', '#1f77b4', '#2ca02c', '#ff7f0e'],
      },
    ],
  };

  const barData = {
    labels: ['Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre'],
    datasets: [
      {
        label: 'Gastos ($)',
        data: [900000, 1100000, 1050000, 1200000, 1250000],
        backgroundColor: '#184866',
      },
    ],
  };

  return (
    <main className="container">
      <title>Inicio</title>
      {/* Tarjetas resumen */}
      <section className="cards">
        <div className="card">
          <h3>Total Gastos</h3>
          <p>$ 1.250.000</p>
        </div>
        <div className="card">
          <h3>Departamentos</h3>
          <p>25</p>
        </div>
        <div className="card">
          <h3>Pagos Pendientes</h3>
          <p>8</p>
        </div>
        <div className="card">
          <h3>% Pagado</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: "70%" }}>70%</div>
          </div>
        </div>
      </section>

      {/* Gráficos */}
      <section className="charts">
        <div className="chart-box">
          <h2>Distribución de Gastos</h2>
          <Pie data={pieData} />
        </div>
        <div className="chart-box">
          <h2>Gastos por Mes</h2>
          <Bar data={barData} />
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="quick-actions">
        <h2>Accesos Rápidos</h2>
        <div className="actions">
          <button>➕ Registrar Gasto</button>
          <button>🏠 Ver Departamentos</button>
          <button>📑 Generar Reporte</button>
          <button>💳 Revisar Pagos</button>
        </div>
      </section>

      {/* Tablas */}
      <section className="tables">
        <div className="table-section">
          <h2>Gastos Recientes</h2>
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Electricidad</td>
                <td>$ 300.000</td>
                <td>01-09-2025</td>
              </tr>
              <tr>
                <td>Agua</td>
                <td>$ 200.000</td>
                <td>02-09-2025</td>
              </tr>
              <tr>
                <td>Mantención Ascensor</td>
                <td>$ 150.000</td>
                <td>05-09-2025</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-section">
          <h2>Departamentos Morosos</h2>
          <table>
            <thead>
              <tr>
                <th>N° Depto</th>
                <th>Dueño</th>
                <th>Monto Pendiente</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>102</td>
                <td>María González</td>
                <td>$ 50.000</td>
              </tr>
              <tr>
                <td>104</td>
                <td>Ana López</td>
                <td>$ 75.000</td>
              </tr>
              <tr>
                <td>110</td>
                <td>Pedro Torres</td>
                <td>$ 100.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Notificaciones */}
      <section className="notifications">
        <h2>Avisos</h2>
        <ul>
          <li>📌 Reunión de copropietarios: 30-09-2025</li>
          <li>⚠️ Depto 110 con 2 meses de atraso</li>
          <li>✅ Pago recibido de Depto 201</li>
        </ul>
      </section>
    </main>
  );
};

export default dashboard;

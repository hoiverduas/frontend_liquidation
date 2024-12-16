import Header from "../components/Header";
import './Estadisticas.css';

const Estadisticas = () => {
    return (
        <section>
            <Header />

            <h1> Estadísticas de Liquidaciones Anuales </h1>

            <div className="stats-container">
                <div className="stat-bar">
                    <label>Enero</label>
                    <div className="progress">
                        <div className="progress-bar" style={{ width: '80%' }}>80%</div>
                    </div>
                </div>
                <div className="stat-bar">
                    <label>Febrero</label>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: '60%' }}>60%</div>
                    </div>
                </div>
                <div className="stat-bar">
                    <label>Marzo</label>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: '75%' }}>75%</div>
                    </div>
                </div>
                <div className="stat-bar">
                    <label>Abril</label>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: '90%' }}>90%</div>
                    </div>
                </div>
                <div className="stat-bar">
                    <label>Mayo</label>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: '85%' }}>85%</div>
                    </div>
                </div>
                <div className="stat-bar">
                    <label>Junio</label>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: '70%' }}>70%</div>
                    </div>
                </div>
                <div className="stat-bar">
                    <label>Julio</label>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: '95%' }}>95%</div>
                    </div>
                </div>
                <div className="stat-bar">
                    <label>Agosto</label>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: '60%' }}>60%</div>
                    </div>
                </div>
                <div className="stat-bar">
                    <label>Septiembre</label>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: '80%' }}>80%</div>
                    </div>
                </div>
                <div className="stat-bar">
                    <label>Octubre</label>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: '90%' }}>90%</div>
                    </div>
                </div>
                <div className="stat-bar">
                    <label>Noviembre</label>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: '65%' }}>65%</div>
                    </div>
                </div>
                <div className="stat-bar">
                    <label>Diciembre</label>
                    <div className="progress">
                    <div className="progress-bar" style={{ width: '85%' }}>85%</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Estadisticas;
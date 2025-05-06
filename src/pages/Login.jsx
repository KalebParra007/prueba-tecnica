import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { generateToken } from '../helpers/fuction';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    code: ''
  });

  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://apiprueba-5688.onrender.com/Admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
          code: user.code
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      // Guardamos el token y los datos del usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data));
      navigate('/userhome'); // Agregado slash al inicio
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://apiprueba-5688.onrender.com/Admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      // Generamos el token usando nuestra función
      const token = generateToken();
      
      // Guardamos el token y los datos del usuario
      localStorage.setItem('Token', token); // Cambiado a 'Token' con mayúscula
      localStorage.setItem('userData', JSON.stringify(data));
      navigate('/userhome');
    } catch (error) {
      setError('Error en el registro: ' + error.message);
    }
  };

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      
      {showLogin ? (
        <form onSubmit={handleLogin}>
          <div className='login-container'>
            <h1>Login</h1>
            <label>
              Username:
              <section>
                <input 
                  className='input-form' 
                  type="text" 
                  name="username" 
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              </section>
            </label>
            <label>
              Password:
              <section>
                <input 
                  className='input-form' 
                  type="password" 
                  name="password" 
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </section>
            </label>
            <label>
              Código empleado:
              <section>
                <input 
                  className='input-form' 
                  type="text" 
                  name="code" 
                  value={user.code}
                  onChange={handleChange}
                  required
                />
              </section>
            </label>
            <button className='button' type="submit" onChange={handleLogin}>Login</button>
            <p className="form-link-login" onClick={() => setShowLogin(false)} style={{ cursor: 'pointer' }}>
              ¿No tienes cuenta?
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <div className='register-container'>
            <h1>Registro</h1>
            <label>
              Nombre:
              <section>
                <input 
                  className='input-form' 
                  type="text" 
                  name="name" 
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </section>
            </label>
            <label>
              Username:
              <section>
                <input 
                  className='input-form' 
                  type="text" 
                  name="username" 
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              </section>
            </label>
            <label>
              Correo:
              <section>
                <input 
                  className='input-form' 
                  type="email" 
                  name="email" 
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </section>
            </label>
            <label>
              Código empleado:
              <section>
                <input 
                  className='input-form' 
                  type="text" 
                  name="code" 
                  value={user.code}
                  onChange={handleChange}
                  required
                />
              </section>
            </label>
            <label>
              Password:
              <section>
                <input 
                  className='input-form' 
                  type="password" 
                  name="password" 
                  value={user.password}
                  onChange={handleChange}
                  required
                />
              </section>
            </label>
            <button className='button' type="submit">Registrar</button>
            <p className="form-link-login" onClick={() => {
                setShowLogin(false);
                setError('');
            }} style={{ cursor: 'pointer' }}>
              ¿Ya tienes cuenta?
            </p>
          </div>
        </form>
      )}
    </>
  );
}

export default Login;
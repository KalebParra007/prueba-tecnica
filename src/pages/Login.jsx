import { useState } from 'react';
import './Login.css';
import { Navigate } from 'react-router-dom';

function Login() {

  const [user, setUser] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    code: ''
  });

  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
    {showLogin ? (
      <form>
      <div className='login-container'>
      <h1>Login</h1>
        <label>
          Username:
          <section>
          <input className='input-form' type="text" name="username" />
          </section>
        </label>
        <label>
          Password:
          <section>
          <input className='input-form' type="password" name="password" />
          </section>
        </label>
        <label>
          Codigo empleado:
          <section>
          <input className='input-form' type="text" name="code" />
          </section>
        </label>
        <button className='button' type="submit">Login</button>
        <p className="form-link-login" onClick={() => setShowLogin(false)} style={{ cursor: 'pointer' }}>
            ¿No tienes cuenta?{" "}
          </p>
          </div>
      </form>
    ): (
    
      <form>
      <div className='register-container'>
      <h1>Registro</h1>
        <label>
          Nombre:        
          <section>
          <input className='input-form' type="text" name="name" />
          </section>
        </label>
        <label>
          Username:       
          <section>
          <input className='input-form' type="text" name="username" />
          </section>
        </label>
        <label>
          Correo:        
          <section>
          <input className='input-form' type="email" name="email" />
          </section>
        </label>
        <label>
          Codigo empleado:
          <section>
          <input className='input-form' type="text" name="Code" />
          </section>
        </label>
        <label>
          Password:      
          <section>
          <input className='input-form' type="password" name="password" />
          </section>
        </label>
        <button className='button' type="submit">Registrar</button>
        <p className="form-link-login" onClick={() => setShowLogin(true)} style={{ cursor: 'pointer' }}>
            ¿Ya tienes cuenta?{" "}
          </p>
          </div>
      </form>
    )}
    </>
  );
}

export default Login;
import { Route, Routes } from 'react-router-dom';
import '../src/scss/style.scss';
import { Login } from './component/Authorization/Login';
import { Register } from './component/Authorization/Register';
import { AdminPanel } from './component/Page/AdminPanel';
import { Main } from './component/Page/Main';
import { RequireAuth } from './component/Authorization/RequireAuth';
import { Missing404 } from './component/Page/Missing404';
import { PersonalAccount } from './component/Main/PersonalAccount/PersonalAccount';
import { Layout } from './component/Page/Layout';
import { Cart } from './component/Main/Cart/Cart';
import { AddTrack } from './component/AdminPanel/AddTrack/AddTrack';
import { TrackManagement } from './component/AdminPanel/TrackManagement/TrackManagement';

import { AuthProvider } from './context/AuthProvider';

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <Routes>
          {/* public routes */}
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path='personalAccount' element={<PersonalAccount />} />
              <Route path='cart' element={<Cart />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path='admin' element={<AdminPanel />} />
              <Route path='addTrack' element={<AddTrack />} />
              <Route path='trackManagement' element={<TrackManagement />} />
            </Route>
            {/* catch all */}
            <Route path='*' element={<Missing404 />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

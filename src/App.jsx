import { CircularProgress, CssBaseline, Stack } from "@mui/material";
import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { themeSettings } from "./theme";

import "./App.css";
import BookPage from "./pages/Books";


const AuthPage = lazy(() => import('./pages/Auth/index'));
const HomePage = lazy(() => import('./pages/Home/index'));


const LoadingScreen = () => {
  return (
    <Stack alignItems="center" mt={4}>
      <CircularProgress />
    </Stack>
  )
}


function App() {

  // const mode = useSelector((state) => state.mode);
  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path='/' element={!isAuth ? <HomePage /> : <AuthPage />} />
            <Route path='/books' element={<BookPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {/* </ThemeProvider > */}
    </>
  )
}

export default App;

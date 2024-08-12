import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider  } from '@mui/material/styles';

import './../scss/Pages.scss'

const Pages = ({page, setPage, footer}) => {
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);

    /* Al cargar el componente capturamos el ancho con window.innerWidth
    usamos addeventlistener para capturar el cambio al ocurrir el resize 
    usamos removeEventlistener para limpiar al quitar el componente
    */
    useEffect(() => {
        const handleResize = () => {
            setWidthScreen(window.innerWidth)
        };

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        };
    }, []);

    const theme = createTheme({
        palette: {
            aqua: {
                main: 'rgb(55, 181, 182)',
                light: '#ccc',
                dark: 'rgb(2, 131, 145)',
                contrastText: '#fff'
              },
        },
      });

    const handleChange = (e, value) => {
        setPage(value)
    }
    return (
        <ThemeProvider theme={theme}>
            <div className={`${footer ? 'pages pages-border' : 'pages'}`}>
                <Pagination 
                    siblingCount={widthScreen < 768 ? 0 : 2}
                    count={50} 
                    page={page} 
                    color='aqua' 
                    shape='rounded' 
                    size='large' 
                    showFirstButton={widthScreen < 560 ? false : true}
                    showLastButton={widthScreen < 560 ? false : true}
                    onChange={handleChange} />
            </div>
        </ThemeProvider>
    );
}
 
export default Pages;
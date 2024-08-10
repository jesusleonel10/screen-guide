import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider  } from '@mui/material/styles';

import './../scss/Pages.scss'

const Pages = ({page, setPage, footer}) => {
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
                    // siblingCount={0}
                    count={50} 
                    page={page} 
                    color='aqua' 
                    shape='rounded' 
                    size='large' 
                    showFirstButton
                    showLastButton
                    onChange={handleChange} />
            </div>
        </ThemeProvider>
    );
}
 
export default Pages;
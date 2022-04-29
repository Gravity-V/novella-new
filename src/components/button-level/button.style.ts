import { createTheme } from "@mui/material/styles";

// export const StylesDisabled = (_theme: any) => ({
//     button: {
//       "&:disabled": {
//         backgroundColor: 'rgba(100, 30, 50, 0.25)'
//       }
//     }
// });

export const getTheme = (correct: boolean, clic: boolean) => {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            "&.Mui-disabled": {
              color:clic? (correct ? 'green' : 'red'):'',
              backgroundColor: 'rgba(100, 100, 100, 0.25)'
            }
          }
        }
      }
    }
  });

  return theme
}


export const Styles = {
  Text: {
    fontSize: 16
  },
  TextComment: {
    fontSize: 22
  },
  Multi: {
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  Sex: {
    fontSize: 24,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    margin: 11
  },
  Name: {
    width: '40%',
  },
  ProgressBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Standart: {
    margin: '7px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    color: '#ffffff'
  }
}
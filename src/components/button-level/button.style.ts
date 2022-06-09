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
              color: clic ? (correct ? 'green' : 'red') : '',
              backgroundColor: 'rgba(100, 100, 100, 0.25)'
            }
          }
        }
      }
    }
  });
  return theme
}

export const getTheme2 = (correct: boolean) => {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            "&.Mui-disabled": {
              visibility: correct ? "hidden" : "visible"
            }
          }
        }
      }
    }
  });
  return theme
}

export const getTheme3 = () => {
  const theme = createTheme({
    components: {
      MuiIcon: {
        styleOverrides: {
          root: {
            minWidth: '20px',
            color: 'Black'
          }
        }
      },
    },
  });
  return theme
}

export const getTheme4 = () => {
  const theme = createTheme({
    components: {
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            root: {
              "&.Mui-disabled": {
                color: 'white'
              }
            }
          }
        }
      },
    },
  });
  return theme
}

export const Styles = {
  Text: {
    fontSize: 16
  },
  TextComment: {
    fontSize: 20
  },
  Multi: {
    fontSize: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'rgba(255, 255, 255, 1)',
    marginLeft: 7,
    marginRight: 7,
    paddingRight: '10px',
    paddingLeft: '10px',
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  Sex: {
    fontSize: 24,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    marginLeft: 11,
    marginRight: 11,
    marginTop: 1,
    marginBottom: 11
  },
  Name: {
    width: '100%',
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
    color: '#ffffff',
    '&:hover': {
      backgroundColor: 'rgba(25,118,210,0.6)'
    }
  },
  OrderButton: {
    // marginTop: '4%', 
    marginLeft: '40%',
    marginRight: '40%'
  },
  CommentMulty: {
    display: 'flex',
    fontSize: 20,
    alignItems: 'center',
    gap: '10px',
  },
  First: {
    fontSize: '40px',
  },
  Multy2: {
    '&:disabled': {
      color: 'white'
    }
  }
}
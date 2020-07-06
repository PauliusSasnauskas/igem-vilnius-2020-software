import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import './App.css';

function App() {

  const [inputValue, setInputValue] = React.useState("");
  const [errorValue, setErrorValue] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [results, setResults] = React.useState(["", "", "", "", ""]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setErrorValue(false);
  };
  
  function search(){
    if (inputValue === undefined || inputValue.length === 0){
      setErrorValue(true);
      return;
    }
    setLoading(true);
    // TODO: search with inputValue
    // console.log(inputValue);
    setTimeout(()=>{
      setResults(["5’GGATAGCCCAGAGAAATTTGGA3’", "5’CAT CTT GTA CCG TTG GAA CTT TAA T3’", "GCCTCATTTGATT(A)20-biotin", "thiol-(A)20TTTCAGATG", "biotin-(A)20CATCTGAAA"]);
      setLoading(false);
    }, 2000);
  }

  return (<>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          iGEM Vilnius 2020
        </Typography>
      </Toolbar>
    </AppBar>
    
    <Container maxWidth="md" style={{marginTop: 32}}>
      <div style={{display: "flex", flexDirection: "row"}}>
        <TextField
          error={errorValue}
          value={inputValue}
          required
          size="small"
          label="Protein ID"
          variant="outlined"
          helperText={errorValue ? "Incorrect entry." : undefined}
          onChange={handleInputChange}
          style={{flexGrow: 2}} />
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          style={{height: 40, marginLeft: 16}}
          onClick={search}
        >
          Search
        </Button>
      </div>

      <Paper style={{marginTop: 32}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="left">Sequence</TableCell>
            </TableRow>
            <TableRow><TableCell colSpan={2} style={{padding: 0, height: 4}}><Fade
              rowSpan={2}
              in={loading}
              style={{
                transitionDelay: loading ? '800ms' : '0ms',
              }}
              unmountOnExit>
              <LinearProgress />
            </Fade></TableCell></TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>HDA Forward Primer</TableCell>
              <TableCell>{results[0]}</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>HDA reverse primer</TableCell>
              <TableCell>{results[1]}</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>Capture Probe</TableCell>
              <TableCell>{results[2]}</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>Detector Probe</TableCell>
              <TableCell>{results[3]}</TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>Control Probe</TableCell>
              <TableCell>{results[4]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Container>
  </>);
}

export default App;

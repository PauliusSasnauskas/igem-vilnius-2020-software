import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import IconAdd from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import IconInfo from '@material-ui/icons/Info';
import IconRemove from '@material-ui/icons/RemoveCircleOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './ProbeSolverMain.css';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#131F43",
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
    button: {
      fontWeight: "bold",
    },
  },
});

const TITLE_NAME = "ProbeSolver";

export default function ProbeSolverMain() {
  const [loading, setLoading] = React.useState(false);
  const [errorValue, setErrorValue] = React.useState("");
  const [inputStrains, setInputStrains] = React.useState([""]);
  const [classicMode, setClassicMode] = React.useState(true);
  const [taxids, setTaxids] = React.useState([]);
  const [results, setResults] = React.useState(["", "", "", "", ""]);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogClickOpen = () => { setDialogOpen(true); };
  const handleDialogClose = () => { setDialogOpen(false); };

  function anyEmpty(array){
    for (let item of array){
      if (item === undefined || item.length === 0){
        return true;
      }
    }
    return false;
  }

  function allFull(array){
    return !anyEmpty(array);
  }
  
  function search(){
    if (inputStrains === undefined || inputStrains.length === 0 || anyEmpty(inputStrains) ||
        anyEmpty(taxids)){
      setErrorValue("Please fill out empty fields");
      return;
    }
    setLoading(true);
    // TODO: search with inputValue
    // console.log(inputValue);
    let fakeResult = ["5’GGATAGCCCAGAGAAATTTGGA3’", "5’CAT CTT GTA CCG TTG GAA CTT TAA T3’", "GCCTCATTTGATT(A)20-biotin", "thiol-(A)20TTTCAGATG", "biotin-(A)20CATCTGAAA"];
    setTimeout(()=>{
      setResults(fakeResult);
      setLoading(false);
    }, 2000);
  }

  const handleClickAddMoreStrainIds = (index) => () => {
    setErrorValue("");
    if (inputStrains.length-1 === index){
      if (inputStrains.length >= 3) {
        setErrorValue("Cannot add more than 3 strain IDs");
      }else{
        setInputStrains([...inputStrains, ""]);
      }
    }else{
      let newInputStrains = [...inputStrains];
      newInputStrains.splice(index, 1);
      setInputStrains(newInputStrains);
    }
  };

  const handleClickAddMoreTaxids = (index) => () => {
    setErrorValue("");
    if (taxids.length-1 === index){
      setTaxids([...taxids, ""]);
    }else{
      let newTaxids = [...taxids];
      newTaxids.splice(index, 1);
      setTaxids(newTaxids);
    }
  }

  const handleInputChange = (index) => (event) => {
    setErrorValue("");
    const newInputStrains = [...inputStrains];
    newInputStrains[index] = event.target.value;
    setInputStrains(newInputStrains);
  };

  const handleTaxidChange = (index) => (event) => {
    setErrorValue("");
    const newTaxids = [...taxids];
    newTaxids[index] = event.target.value;
    setTaxids(newTaxids);
  };

  const handleChangeClassicMode = (event) => {
    setErrorValue("");
    setClassicMode(event.target.value);
    if (event.target.value){
      setTaxids([]);
    }else{
      setTaxids([""]);
    }
  };

  return (<ThemeProvider theme={customTheme}>
    <CssBaseline />
    <Container maxWidth="md" style={{marginTop: 32, marginBottom: 32}}>
      <Paper style={{marginBottom: 36, padding: 48, display: "flex", alignItems: "stretch", backgroundColor: "#131F43", color: "white"}}>
        <IconButton aria-label="information" style={{visibility: "hidden"}}>
          <IconInfo fontSize="inherit" />
        </IconButton>
        
        <Typography
          variant="h4"
          component="h1"
          style={{display: "inline-flex", alignItems: "center", justifyContent: "center", flexGrow: 1, minWidth: "10em"}}
        >
          <img alt="DNA icon" src="dna.svg" style={{maxHeight: "1em", maxWidth: "1em", marginRight: "0.3em"}} />{TITLE_NAME}
        </Typography>
        <IconButton style={{color: "white"}} aria-label="information" onClick={handleDialogClickOpen}>
          <IconInfo fontSize="inherit" />
        </IconButton>
      </Paper>
      <Paper style={{padding: 16, display: "flex", flexDirection: "column"}}>
        {errorValue.length > 0 ? <span class="error">{errorValue}</span> : undefined}
        <div style={{display: "flex", flexDirection: "row"}}>
          <div style={{display: "flex", flexDirection: "column", flexGrow: 1, marginRight: 6}}>
            {inputStrains.map((value, index)=>(
              <FormControl variant="outlined" key={index} style={{marginBottom: 12}}>
                <InputLabel htmlFor={"straininput" + index}>Strain ID</InputLabel>
                <OutlinedInput
                  value={value}
                  required
                  size="small"
                  variant="outlined"
                  onChange={handleInputChange(index)}
                  labelWidth={65}
                  inputProps={{ id: "straininput" + index }}
                  endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="add additional strain ID"
                      onClick={handleClickAddMoreStrainIds(index)}
                      edge="end"
                    >
                      { inputStrains.length-1 === index ? <IconAdd /> : <IconRemove /> }
                    </IconButton>
                  </InputAdornment>
                }/>
              </FormControl>
            ))}
          </div>

          <div style={{display: "flex", flexDirection: "column", flexGrow: 1, marginLeft: 6, minWidth: "calc(50% - 12px)"}}>

          <FormControl variant="outlined">
            <InputLabel htmlFor="modeselect">Mode</InputLabel>
            <Select
              value={classicMode}
              defaultValue={true}
              style={{marginBottom: 12}}
              onChange={handleChangeClassicMode}
              labelWidth={43}
              inputProps={{
                name: 'age',
                id: 'modeselect',
              }}
            >
              <MenuItem value={true}>Classic</MenuItem>
              <MenuItem value={false}>Input organism tax IDs</MenuItem>
            </Select>
          </FormControl>

            {classicMode ? undefined : taxids.map((value, index)=>(
              <FormControl variant="outlined" key={index} style={{marginBottom: 12}}>
                <InputLabel htmlFor={"taxidinput" + index}>Tax ID</InputLabel>
                <OutlinedInput
                  value={value}
                  required
                  size="small"
                  variant="outlined"
                  onChange={handleTaxidChange(index)}
                  labelWidth={48}
                  inputProps={{ id: "taxidinput" + index }}
                  endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="add additional strain ID"
                      onClick={handleClickAddMoreTaxids(index)}
                      edge="end"
                    >
                      { taxids.length-1 === index ? <IconAdd /> : <IconRemove /> }
                    </IconButton>
                  </InputAdornment>
                }/>
              </FormControl>
            ))}
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          style={{height: 40}}
          onClick={search}
        >
          Search
        </Button>
      </Paper>
      <div style={{marginTop: 16, minHeight: 4, borderRadius: 5}}><Fade
        rowSpan={2}
        in={loading}
        style={{
          transitionDelay: loading ? '800ms' : '0ms',
        }}
        unmountOnExit>
        <LinearProgress />
      </Fade></div>
      {allFull(results) ? <Paper style={{marginTop: 16}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="left">Sequence</TableCell>
            </TableRow>
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
      </Paper> : undefined}
    </Container>
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={dialogOpen}
      onClose={handleDialogClose}
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title">What is <img alt="DNA icon" src="dna-b.svg" style={{maxHeight: "1em", maxWidth: "1em", position: "relative", bottom: -1.5, margin: "0 0.25em", fill: "black"}} />{TITLE_NAME}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          It is a special software developed for the iGEM Vilnius-Lithuania 2020 team project used to identify and receive probe sequences...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </ThemeProvider>);
};

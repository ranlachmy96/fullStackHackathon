import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import LinearProgress from '@mui/material/LinearProgress';
import { GetAllWeatherUpdates, deleteWeatherUpdate, UpdateWeather } from '../../API/WeatherUpdate.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain, faSun, faCloudSun } from '@fortawesome/free-solid-svg-icons';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from '@mui/material';
function createData(_id, time, temperature, humidity, location, status) {
  return { _id, time, temperature, humidity, location, status };
}

export default function CustomPaginationActionsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedRowData, setEditedRowData] = useState(null);

  const statusIcons = {
    'rainy': <FontAwesomeIcon icon={faCloudSunRain} />,
    'sunny': <FontAwesomeIcon icon={faSun} />,
    'cloudy': <FontAwesomeIcon icon={faCloudSun} />,
  };

  const fetchData = async () =>  {
    setLoading(true); // Set loading to true when fetching data
    try {
      const allWeathersPromise = GetAllWeatherUpdates();
      if (allWeathersPromise) {
        const allWeathers = await allWeathersPromise;
        const allWeathersData = allWeathers.map(weather => {
          return createData(weather._id, new Date(weather.date).toLocaleString(), weather.temperature, weather.humidity, weather.location, weather.status);
        });
        if (allWeathersData.length > 0) {
          setRows(allWeathersData);
          setLoading(false);
        }
        console.log('allWeathers', allWeathers);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  const handleDeleteSelectedRows = () => {
    selected.forEach(async _id => {
      await deleteWeatherUpdate(_id);
    });
    const newRows = rows.filter(row => !selected.includes(row._id));
    setRows(newRows);
    setSelected([]);
  };

  const handleEditSelectedRows = () => {
    // Find the first selected row for editing
    const selectedRow = rows.find(row => selected.includes(row._id));
    if (selectedRow) {
      setEditedRowData(selectedRow);
      setOpenEditDialog(true);
    }
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleEditDialogSave = async () => {
    try {
      await UpdateWeather(editedRowData);
      console.log('Row updated successfully:', editedRowData);
      setOpenEditDialog(false);
      fetchData();
    } catch (error) {
      console.error('Error updating row:', error);
      // Handle error appropriately
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  return (
      <div>
        <TableContainer component={Paper}>
          {loading && (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
          )}
          <Toolbar>
            {selected.length > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
                  {selected.length} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6">
                  Weather Updates
                </Typography>
            )}
            {selected.length > 0 ? (
                <div style={{display:'flex',flexDirection:'row'}}>
                  <Tooltip title="Delete">
                    <IconButton onClick={handleDeleteSelectedRows}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={handleEditSelectedRows}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </div>
            ) : (
                <Tooltip title="Filter list">
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
            )}
          </Toolbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                      indeterminate={selected.length > 0 && selected.length < rows.length}
                      checked={selected.length === rows.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const newSelected = rows.map(row => row._id);
                          setSelected(newSelected);
                        } else {
                          setSelected([]);
                        }
                      }}
                  />
                </TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Temperature</TableCell>
                <TableCell>Humidity</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Forecast</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const isItemSelected = isSelected(row._id);
                return (
                    <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        key={row._id}
                        selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': row._id }}
                        />
                      </TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.temperature}</TableCell>
                      <TableCell>{row.humidity}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{statusIcons[row.status]}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
          <DialogTitle>Edit Row</DialogTitle>
          <DialogContent>
            <TextField
                margin="dense"
                id="datetime-local"
                label="Date and Time"
                type="datetime-local"
                fullWidth
                value={editedRowData ? formatDate(editedRowData.time) : ''}
                onChange={(e) => setEditedRowData({ ...editedRowData, time: e.target.value })}
            />
            <TextField
                autoFocus
                margin="dense"
                id="temperature"
                label="Temperature"
                type="number"
                fullWidth
                value={editedRowData ? editedRowData.temperature : ''}
                onChange={(e) => setEditedRowData({ ...editedRowData, temperature: e.target.value })}
            />
            <TextField
                margin="dense"
                id="humidity"
                label="Humidity"
                type="number"
                fullWidth
                value={editedRowData ? editedRowData.humidity : ''}
                onChange={(e) => setEditedRowData({ ...editedRowData, humidity: e.target.value })}
            />
            <TextField
                margin="dense"
                id="location"
                label="Location"
                fullWidth
                value={editedRowData ? editedRowData.location : ''}
                onChange={(e) => setEditedRowData({ ...editedRowData, location: e.target.value })}
            />
            <FormControl component="fieldset" style={{ marginTop: 16 }}>
              <FormLabel component="legend">Forecast</FormLabel>
              <RadioGroup
                  row
                  aria-label="status"
                  name="status"
                  value={editedRowData ? editedRowData.status : ''}
                  onChange={(e) => setEditedRowData({ ...editedRowData, status: e.target.value })}
              >
                <FormControlLabel value="sunny" control={<Radio />} label="Sunny" />
                <FormControlLabel value="rainy" control={<Radio />} label="Rainy" />
                <FormControlLabel value="cloudy" control={<Radio />} label="Cloudy" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}>Cancel</Button>
            <Button onClick={handleEditDialogSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}

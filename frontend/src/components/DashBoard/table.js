import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { GetAllWeatherUpdates, deleteWeatherUpdate } from '../../API/WeatherUpdate.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain, faSun, faCloudSun } from '@fortawesome/free-solid-svg-icons';


function createData(_id, time, temperature, humidity, location, mood) {
  return { _id, time, temperature, humidity, location, mood};
}

export default function CustomPaginationActionsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);

  const statusIcons = {
    'rainy': <FontAwesomeIcon icon={faCloudSunRain} />,
    'sunny': <FontAwesomeIcon icon={faSun} />,
    'cloudy': <FontAwesomeIcon icon={faCloudSun} />,
  };

  useEffect(() => {
    async function fetchData() {
      const allWeathersPromise = GetAllWeatherUpdates();
      if (allWeathersPromise) {
        const allWeathers = await allWeathersPromise;
        const allWeathersData = allWeathers.map(weather => {
          return createData(weather._id, weather.date, weather.temperature, weather.humidity, weather.location, weather.status);
        });
        if (allWeathersData.length > 0) {
          setRows(allWeathersData);
        }
        console.log('allWeathers', allWeathers);

      }
    }
    fetchData();
  }, []);


  const handleDeleteSelectedRows = () => {
    selected.forEach(async _id => {
      await deleteWeatherUpdate(_id);
    });
    const newRows = rows.filter(row => !selected.includes(row._id));
    setRows(newRows);
    setSelected([]);
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
    <TableContainer component={Paper}>
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
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteSelectedRows}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
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
            <TableCell>Time</TableCell>
            <TableCell>Temperature</TableCell>
            <TableCell>Humidity</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Mood</TableCell>
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
                <TableCell>{statusIcons[row.mood]}</TableCell>
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
  );
}

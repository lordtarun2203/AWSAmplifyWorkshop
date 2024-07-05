import React, { useState } from 'react';
import '../App.css';
import { Button, Grid, Paper, CircularProgress } from '@material-ui/core';
import getLabelsFromImage from '../api/predictions'; // Ensure the correct path is used

const PredictionsCard = ({ addAction }) => {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    console.log('File selected:', file);

    if (file.size > 5000000) {
      alert('Image is too large!');
      return;
    }

    const fileType = file.name.split('.').pop().toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(fileType)) {
      alert('File type incorrect!');
      return;
    }

    setFileName(file.name);
    setLoading(true);

    try {
      console.log('Uploading file:', file.name);
      const detectedLabels = await getLabelsFromImage(file);
      console.log('Detected labels:', detectedLabels);
      setLabels(detectedLabels);
    } catch (error) {
      console.error('Error identifying labels:', error);
      alert('Error identifying labels. Please check the console for more details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid item xs={12}>
      <Paper className="card">
        <Grid item xs={12} style={{ paddingBottom: '10px' }}>
          <b>Use AI Predictions to Add New Items</b>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Button>
          <span style={{ paddingLeft: '10px' }}>{fileName ? fileName : null}</span>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '10px' }}>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            labels.map((label, index) => (
              <Button key={index} onClick={() => addAction(label)}>
                {label}
              </Button>
            ))
          )}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default PredictionsCard;

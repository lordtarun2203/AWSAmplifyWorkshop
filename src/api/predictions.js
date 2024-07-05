import { Predictions } from 'aws-amplify';

// Function to get labels from an image file
const getLabelsFromImage = async (file) => {
  try {
    console.log('Starting identification process...');
    console.log('File details:', file);

    const response = await Predictions.identify({
      labels: {
        source: {
          file,
        },
        type: 'LABELS',
        providerName: 'identifyLabels' // Specify the provider name
      },
    });

    console.log('Prediction response:', response);

    const { labels } = response;
    if (labels) {
      labels.forEach((label) => {
        const { name, boundingBoxes } = label;
        console.log(`Label: ${name}, BoundingBoxes: ${boundingBoxes}`);
      });

      return labels.map((label) => label.name); // Return the names of the labels
    } else {
      console.log('No labels found in the response.');
      return [];
    }
  } catch (err) {
    console.log('Error identifying labels:', err);
    throw err;
  }
};

export default getLabelsFromImage;

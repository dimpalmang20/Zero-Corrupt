const express = require('express');
const router = express.Router();

// Handle clicking a sector
router.get('/:sector', (req, res) => {
  const sector = req.params.sector;
  res.send(`<h1>Form for sector: ${sector}</h1><form>...<input type="submit" /></form>`);
});

module.exports = router;

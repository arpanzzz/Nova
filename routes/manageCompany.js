const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const { sql, pool, poolConnect } = require('../db');

// POST: Add Company
router.post('/add-company', verifyToken, isAdmin, [
  body('CompCode').isLength({ min: 0, max: 8 }).withMessage('CompCode must be 8 characters'),
  body('CompName').isString().isLength({ max: 100 }).optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { CompCode, CompName } = req.body;

  try {
    await poolConnect;
    const request = pool.request();
    request.input('CompCode', sql.Char(8), CompCode);
    request.input('CompName', sql.NVarChar(100), CompName || null);

    await request.query(`
      INSERT INTO [dbo].[Company] ([CompCode], [CompName])
      VALUES (@CompCode, @CompName)
    `);

    res.status(200).json({ message: 'Company added successfully' });
  } catch (err) {
    console.error('Error inserting company:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET: Get Company by CompCode
router.get('/company/:CompCode', verifyToken, isAdmin, async (req, res) => {
  const { CompCode } = req.params;

  try {
    await poolConnect;
    const request = pool.request();
    request.input('CompCode', sql.Char(8), CompCode);

    const result = await request.query(`
      SELECT * FROM [dbo].[Company] WHERE CompCode = @CompCode
    `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching company:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT: Update Company
router.put('/update-company/:CompCode', verifyToken, isAdmin, [
  body('CompName').isString().isLength({ max: 100 }).optional()
], async (req, res) => {
  const { CompCode } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { CompName } = req.body;

  try {
    await poolConnect;
    const request = pool.request();
    request.input('CompCode', sql.Char(8), CompCode);
    request.input('CompName', sql.NVarChar(100), CompName || null);

    await request.query(`
      UPDATE [dbo].[Company]
      SET CompName = @CompName
      WHERE CompCode = @CompCode
    `);

    res.status(200).json({ message: 'Company updated successfully' });
  } catch (err) {
    console.error('Error updating company:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE: Delete Company
router.delete('/delete-company/:CompCode', verifyToken, isAdmin, async (req, res) => {
  const { CompCode } = req.params;

  try {
    await poolConnect;
    const request = pool.request();
    request.input('CompCode', sql.Char(8), CompCode);

    const result = await request.query(`
      DELETE FROM [dbo].[Company]
      WHERE CompCode = @CompCode
    `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Company not found or already deleted' });
    }

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    console.error('Error deleting company:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

import express from 'express';
const router = express.Router();
import Certificate from '../models/Certificate.js';

router.post('/verify-certificate', async (req, res) => {
  const { certificateNumber } = req.body;
  console.log('Incoming request body:', req.body); 

  try {
    const certificate = await Certificate.findOne({ certificateNumber });
    console.log('Certificate found:', certificate); 

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    res.json({
      success: true,
      data: {
        name: certificate.name,
        domain: certificate.domain,
        certificateNumber: certificate.certificateNumber
      }
    });
  } catch (error) {
    console.error('Error verifying certificate:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


export default router;

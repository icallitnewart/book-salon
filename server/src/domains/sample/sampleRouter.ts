import express from 'express';
import { SampleController } from './sampleController';
import { asyncMiddleware } from '../../middlewares';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Samples
 *   description: Sample management
 */

/**
 * @swagger
 * /samples:
 *   post:
 *     summary: Create a new sample
 *     tags: [Samples]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SampleInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sample'
 */
router.post('/', asyncMiddleware(SampleController.createSample));

/**
 * @swagger
 * /samples/{id}:
 *   get:
 *     summary: Get a sample by ID
 *     tags: [Samples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sample'
 *       404:
 *         description: Sample not found
 */
router.get('/:id', asyncMiddleware(SampleController.getSampleById));

/**
 * @swagger
 * /samples/email/{email}:
 *   get:
 *     summary: Get a sample by email
 *     tags: [Samples]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sample'
 *       404:
 *         description: Sample not found
 */
router.get('/email/:email', asyncMiddleware(SampleController.getSampleByEmail));

/**
 * @swagger
 * /samples/{id}:
 *   put:
 *     summary: Update a sample
 *     tags: [Samples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SampleInput'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sample'
 *       404:
 *         description: Sample not found
 */
router.put('/:id', asyncMiddleware(SampleController.updateSample));

/**
 * @swagger
 * /samples/{id}:
 *   delete:
 *     summary: Delete a sample
 *     tags: [Samples]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sample'
 *       404:
 *         description: Sample not found
 */
router.delete('/:id', asyncMiddleware(SampleController.deleteSample));

export default router;

import { Request, Response } from 'express';
import { SampleService } from './sampleService';
import { ISample } from './sampleModel';
import { HttpError } from '../../utils/HttpError';

export class SampleController {
	static async createSample(req: Request, res: Response) {
		const sampleData: ISample = req.body;
		const sample = await SampleService.createSample(sampleData);

		res.status(201).json(sample);
	}

	static async getSampleById(req: Request, res: Response) {
		const sampleId = req.params.id;
		const sample = await SampleService.getSampleById(sampleId);

		if (!sample) {
			throw new HttpError('Sample not found', 404);
		}

		res.json(sample);
	}

	static async getSampleByEmail(req: Request, res: Response) {
		const { email } = req.params;
		const sample = await SampleService.getSampleByEmail(email);

		if (!sample) {
			throw new HttpError('Sample not found', 404);
		}

		res.json(sample);
	}

	static async updateSample(req: Request, res: Response) {
		const sampleId = req.params.id;
		const updateData: Partial<ISample> = req.body;
		const updatedSample = await SampleService.updateSample(
			sampleId,
			updateData,
		);

		if (!updatedSample) {
			throw new HttpError('Sample not found', 404);
		}

		res.json(updatedSample);
	}

	static async deleteSample(req: Request, res: Response) {
		const sampleId = req.params.id;
		const deletedSample = await SampleService.deleteSample(sampleId);

		if (!deletedSample) {
			throw new HttpError('Sample not found', 404);
		}

		res.json(deletedSample);
	}
}

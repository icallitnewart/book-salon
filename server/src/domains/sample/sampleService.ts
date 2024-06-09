import { ISample } from './sampleModel';
import { SampleDAO } from './sampleDAO';

export class SampleService {
	static async createSample(sampleData: ISample): Promise<ISample> {
		return SampleDAO.create(sampleData);
	}

	static async getSampleById(sampleId: string): Promise<ISample | null> {
		return SampleDAO.findById(sampleId);
	}

	static async getSampleByEmail(email: string): Promise<ISample | null> {
		return SampleDAO.findByEmail(email);
	}

	static async updateSample(
		sampleId: string,
		updateData: Partial<ISample>,
	): Promise<ISample | null> {
		return SampleDAO.update(sampleId, updateData);
	}

	static async deleteSample(sampleId: string): Promise<ISample | null> {
		return SampleDAO.delete(sampleId);
	}
}

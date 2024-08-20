import { Sample, ISample } from './sampleModel';

export class SampleDAO {
	static async create(sampleData: ISample): Promise<ISample> {
		return Sample.create(sampleData);
	}

	static async findById(sampleId: string): Promise<ISample | null> {
		return Sample.findById(sampleId).exec();
	}

	static async findByEmail(email: string): Promise<ISample | null> {
		return Sample.findOne({ email }).exec();
	}

	static async update(
		sampleId: string,
		updateData: Partial<ISample>,
	): Promise<ISample | null> {
		return Sample.findByIdAndUpdate(sampleId, updateData, { new: true }).exec();
	}

	static async delete(sampleId: string): Promise<ISample | null> {
		return Sample.findByIdAndDelete(sampleId).exec();
	}
}

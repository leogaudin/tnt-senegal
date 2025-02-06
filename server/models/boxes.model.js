import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// MUST MATCH boxFields VARIABLE IN client/src/service/specific.js
const boxFields = {
	project: { type: String, required: true },
	academicInspection: { type: String, required: false },
	educationAndTrainingInspection: { type: String, required: false },
	commune: { type: String, required: true },
	school: { type: String, required: true },
	administrativeCode: { type: String, required: false },
	directorName: { type: String, required: false },
	directorPhone: { type: String, required: false },
};

const Box = new Schema(
	{
		id: { type: String, required: true },
		...boxFields,
		adminId: { type: String, required: true },
		createdAt: { type: Date, required: true },
		scans: { type: Array, required: false },
		schoolLatitude: { type: Number, required: true},
		schoolLongitude: { type: Number, required: true},
		statusChanges: { type: Object, required: false },
		progress: { type: String, required: false, default: 'noScans' },
		lastScan: { type: Object, required: false },
	}
)

export default mongoose.model('boxes', Box);

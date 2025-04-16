// Here are all the country-specific configurations, to facilitate the process of adapting the application to a new country.

// TnT + name of the country + flag
export const name = 'TnT Senegal 🇸🇳';

export const colors = {
	lightest: '#B1C4B7',
	light: '#76B88C',
	main: '#00853F',
	dark: '#005E2F',
	darkest: '#0F271B',
};

// The corresponding API URL
export const API_URL =
						process.env.NODE_ENV === 'development'
						?
						'http://localhost:3000/api'
						:
						'https://tnt-senegal-api.vercel.app/api'


// Fields that should be: displayed as information, or the full representation of the object
// Used in:
// - PDFExport.jsx
// - UploadBoxes.jsx
// - csv.js
// MUST MATCH boxFields VARIABLE IN server/models/boxes.model.js
export const boxFields = {
	project: { type: String, required: true },
	academicInspection: { type: String, required: false },
	educationAndTrainingInspection: { type: String, required: false },
	commune: { type: String, required: true },
	school: { type: String, required: true },
	administrativeCode: { type: String, required: false },
	directorName: { type: String, required: false },
	directorPhone: { type: String, required: false },
};

// Fields that characterize a school in the GPS update list
// Used in:
// - UpdateGPS.jsx
// - csv.js
export const gpsUpdateFields = [
	'administrativeCode',
]

// Fields that characterize a school in the Delivery report
// Used in:
// - Report.jsx
export const reportFields = [
	'school',
	'educationAndTrainingInspection',
	'academicInspection',
]

// Keys that should not be available to the user (e.g. when filtering)
// Used in:
// - BoxFiltering.jsx
// - BoxModal.jsx
export const excludedKeys = [
	'_id',
	'__v',
	'id',
	'adminId',
	'scans',
	'schoolLatitude',
	'schoolLongitude',
	'statusChanges',
	'progress',
	'content',
	'lastScan',
	'packingListId',
];

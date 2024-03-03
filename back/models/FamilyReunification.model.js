/** *************************************************************
 * Family Reunification Modal
 * - Defines the schema for the family reunification data
 * - Uses Mongoose for schema creation and modeling
 * - Exports the modal for use in database operations
 ************************************************************** */
const { Schema, model } = require('mongoose');

const familyReunificationSchema = new Schema({
  _id: { type: Number },
  parents: [{ type: String }],
  children: [{ type: String }],
  active: { type: Boolean },
  reunion_date: { type: String, format: Date },
  reunion_location: { type: String },
}, { collection: 'reunificationCase' });

module.exports = model('familyReunification', familyReunificationSchema);

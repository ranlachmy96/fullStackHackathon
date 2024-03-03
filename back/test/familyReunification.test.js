// const {
//   describe,
//   expect,
//   test,
//   beforeEach,
//   it,
// } = require('@jest/globals');
// const request = require('supertest');
// const app = require('../index');
// require('dotenv').config();
// const familyReunificationRepository = require('../repositories/familyReunification.repository');
//
// jest.mock('../repositories/familyReunification.repository');
// // get all cases
// describe('GET /familyReunification', () => {
//   beforeEach(() => jest.clearAllMocks());
//   // Success 200
//   it('should return all reunification cases', async () => {
//     const mockFamilyReunification = [
//       {
//         _id: 1,
//         parents: ['Alice Brown', 'Bob Brown'],
//         children: ['Emma Brown', 'Noah Brown'],
//         active: true,
//         reunion_date: '2024-02-01',
//         reunion_location: 'City Park',
//         __v: 0,
//       },
//     ];
//     // familyReunificationRepository.find.mockResolvedValue(
//     //   mockFamilyReunification,
//     // );
//     familyReunificationRepository.find.mockResolvedValue(
//       mockFamilyReunification,
//     );
//     const res = await request(app).get('/familyReunification/');
//     console.log('this is my test', res.body);
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toEqual(mockFamilyReunification);
//   });
// });
